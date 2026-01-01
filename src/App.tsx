import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { Category, IngredientLine, Recipe, Step } from './types'
import { getInitialData, loadAppData, normalizeAppData, saveAppData } from './storage'
import CategoryList from './components/CategoryList'
import RecipeList from './components/RecipeList'
import RecipeEditor from './components/RecipeEditor'
import RecipeRunner from './components/RecipeRunner'
import { auth, db, googleProvider } from './lib/firebase'
import type { User } from 'firebase/auth'
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

type View = 'categories' | 'list' | 'category_list' | 'edit' | 'run'

type State = {
  view: View
  lastListView: 'list' | 'category_list'
  categories: Category[]
  recipes: Recipe[]
  selectedCategoryId: string | null
  selectedRecipeId: string | null
  draft: Recipe | null
  runIndex: number
}

type Action =
  | { type: 'set_data'; categories: Category[]; recipes: Recipe[] }
  | { type: 'goto_categories' }
  | { type: 'goto_list' }
  | { type: 'select_category'; id: string }
  | { type: 'open_category'; id: string }
  | { type: 'select_recipe'; id: string }
  | { type: 'create_category'; name: string }
  | { type: 'rename_category'; id: string; name: string }
  | { type: 'delete_category'; id: string }
  | { type: 'create' }
  | { type: 'edit' }
  | { type: 'edit_recipe'; id: string }
  | { type: 'update_title'; title: string }
  | { type: 'update_source_url'; sourceUrl: string }
  | { type: 'update_category'; categoryId: string }
  | { type: 'add_ingredient' }
  | { type: 'update_ingredient_name'; ingredientId: string; name: string }
  | { type: 'update_ingredient_amount'; ingredientId: string; amountText: string }
  | { type: 'delete_ingredient'; ingredientId: string }
  | { type: 'update_step_title'; stepId: string; title: string }
  | { type: 'update_step_note'; stepId: string; note: string }
  | { type: 'add_step' }
  | { type: 'delete_step'; stepId: string }
  | { type: 'bulk_import'; ingredients: IngredientLine[]; steps: Step[] }
  | { type: 'save_draft' }
  | { type: 'delete_recipe'; id: string }
  | { type: 'toggle_favorite'; id: string }
  | { type: 'run' }
  | { type: 'run_recipe'; id: string }
  | { type: 'run_prev' }
  | { type: 'run_next' }
  | { type: 'back_to_list' }

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createEmptyStep = (): Step => ({
  id: uid(),
  title: '',
  note: '',
})

const createEmptyIngredient = (): IngredientLine => ({
  id: uid(),
  name: '',
  amountText: '',
})

const cloneRecipe = (recipe: Recipe): Recipe => ({
  ...recipe,
  ingredients:
    recipe.ingredients.length > 0
      ? recipe.ingredients.map((item) => ({ ...item }))
      : [createEmptyIngredient()],
  steps: recipe.steps.map((step) => ({ ...step })),
})

const findFirstRecipeId = (recipes: Recipe[], categoryId: string | null) => {
  if (!categoryId) return recipes[0]?.id ?? null
  return recipes.find((item) => item.categoryId === categoryId)?.id ?? null
}

const initialState = (): State => {
  const data = loadAppData()
  const selectedCategoryId = data.categories[0]?.id ?? null
  return {
    view: 'categories',
    lastListView: 'list',
    categories: data.categories,
    recipes: data.recipes,
    selectedCategoryId,
    selectedRecipeId: findFirstRecipeId(data.recipes, selectedCategoryId),
    draft: null,
    runIndex: 0,
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set_data': {
      const selectedCategoryId = action.categories[0]?.id ?? null
      return {
        ...state,
        categories: action.categories,
        recipes: action.recipes,
        selectedCategoryId,
        selectedRecipeId: findFirstRecipeId(action.recipes, selectedCategoryId),
        draft: null,
        runIndex: 0,
        view: 'categories',
        lastListView: 'list',
      }
    }
    case 'goto_categories':
      return { ...state, view: 'categories' }
    case 'goto_list':
      return { ...state, view: 'list', lastListView: 'list' }
    case 'select_category': {
      const selectedRecipeId = findFirstRecipeId(state.recipes, action.id)
      return { ...state, selectedCategoryId: action.id, selectedRecipeId }
    }
    case 'open_category': {
      const selectedRecipeId = findFirstRecipeId(state.recipes, action.id)
      return {
        ...state,
        selectedCategoryId: action.id,
        selectedRecipeId,
        view: 'category_list',
        lastListView: 'category_list',
      }
    }
    case 'select_recipe':
      return { ...state, selectedRecipeId: action.id }
    case 'create_category': {
      const category: Category = { id: uid(), name: action.name }
      return {
        ...state,
        categories: [...state.categories, category],
        selectedCategoryId: category.id,
        selectedRecipeId: findFirstRecipeId(state.recipes, category.id),
        view: 'category_list',
        lastListView: 'category_list',
      }
    }
    case 'rename_category': {
      const nextCategories = state.categories.map((category) =>
        category.id === action.id ? { ...category, name: action.name } : category,
      )
      return { ...state, categories: nextCategories }
    }
    case 'delete_category': {
      const category = state.categories.find((item) => item.id === action.id)
      if (!category || category.name === 'お気に入り') return state
      const remainingCategories = state.categories.filter((item) => item.id !== action.id)
      const fallbackCategoryId =
        remainingCategories.find((item) => item.name !== 'お気に入り')?.id ??
        remainingCategories[0]?.id ??
        null
      const nextRecipes = state.recipes.map((recipe) =>
        recipe.categoryId === action.id && fallbackCategoryId
          ? { ...recipe, categoryId: fallbackCategoryId }
          : recipe,
      )
      const nextSelectedCategoryId =
        state.selectedCategoryId === action.id ? fallbackCategoryId : state.selectedCategoryId
      const nextSelectedRecipeId = nextSelectedCategoryId
        ? findFirstRecipeId(nextRecipes, nextSelectedCategoryId)
        : null
      return {
        ...state,
        categories: remainingCategories,
        recipes: nextRecipes,
        selectedCategoryId: nextSelectedCategoryId,
        selectedRecipeId: nextSelectedRecipeId,
      }
    }
    case 'create': {
      const selectedCategory = state.categories.find(
        (category) => category.id === state.selectedCategoryId,
      )
      const fallbackCategoryId =
        state.categories.find((category) => category.name !== 'お気に入り')?.id ??
        state.categories[0]?.id ??
        uid()
      const categoryId =
        selectedCategory?.name === 'お気に入り'
          ? fallbackCategoryId
          : state.selectedCategoryId ?? fallbackCategoryId
      const draft: Recipe = {
        id: uid(),
        title: '新しいレシピ',
        categoryId,
        sourceUrl: '',
        ingredients: [createEmptyIngredient()],
        steps: [createEmptyStep()],
      }
      return { ...state, view: 'edit', draft, selectedRecipeId: draft.id }
    }
    case 'edit': {
      if (!state.selectedRecipeId) return state
      const recipe = state.recipes.find((item) => item.id === state.selectedRecipeId)
      if (!recipe) return state
      return { ...state, view: 'edit', draft: cloneRecipe(recipe) }
    }
    case 'edit_recipe': {
      const recipe = state.recipes.find((item) => item.id === action.id)
      if (!recipe) return state
      return {
        ...state,
        selectedRecipeId: action.id,
        view: 'edit',
        draft: cloneRecipe(recipe),
      }
    }
    case 'update_title':
      if (!state.draft) return state
      return {
        ...state,
        draft: { ...state.draft, title: action.title },
      }
    case 'update_source_url':
      if (!state.draft) return state
      return {
        ...state,
        draft: { ...state.draft, sourceUrl: action.sourceUrl },
      }
    case 'update_category':
      if (!state.draft) return state
      return {
        ...state,
        draft: { ...state.draft, categoryId: action.categoryId },
      }
    case 'add_ingredient':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          ingredients: [...state.draft.ingredients, createEmptyIngredient()],
        },
      }
    case 'update_ingredient_name':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          ingredients: state.draft.ingredients.map((item) =>
            item.id === action.ingredientId ? { ...item, name: action.name } : item,
          ),
        },
      }
    case 'update_ingredient_amount':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          ingredients: state.draft.ingredients.map((item) =>
            item.id === action.ingredientId
              ? { ...item, amountText: action.amountText }
              : item,
          ),
        },
      }
    case 'delete_ingredient':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          ingredients:
            state.draft.ingredients.length === 1
              ? [createEmptyIngredient()]
              : state.draft.ingredients.filter((item) => item.id !== action.ingredientId),
        },
      }
    case 'update_step_title':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          steps: state.draft.steps.map((step) =>
            step.id === action.stepId ? { ...step, title: action.title } : step,
          ),
        },
      }
    case 'update_step_note':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          steps: state.draft.steps.map((step) =>
            step.id === action.stepId ? { ...step, note: action.note } : step,
          ),
        },
      }
    case 'add_step':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          steps: [...state.draft.steps, createEmptyStep()],
        },
      }
    case 'delete_step':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          steps:
            state.draft.steps.length === 1
              ? [createEmptyStep()]
              : state.draft.steps.filter((step) => step.id !== action.stepId),
        },
      }
    case 'bulk_import':
      if (!state.draft) return state
      return {
        ...state,
        draft: {
          ...state.draft,
          ingredients:
            action.ingredients.length > 0 ? action.ingredients : [createEmptyIngredient()],
          steps: action.steps.length > 0 ? action.steps : [createEmptyStep()],
        },
      }
    case 'save_draft': {
      if (!state.draft) return state
      const exists = state.recipes.some((item) => item.id === state.draft!.id)
      const nextRecipes = exists
        ? state.recipes.map((item) => (item.id === state.draft!.id ? state.draft! : item))
        : [...state.recipes, state.draft!]
      return {
        ...state,
        recipes: nextRecipes,
        selectedCategoryId: state.draft.categoryId,
        selectedRecipeId: state.draft.id,
        draft: null,
        view: state.lastListView,
      }
    }
    case 'delete_recipe': {
      const nextRecipes = state.recipes.filter((item) => item.id !== action.id)
      const nextSelectedId =
        state.selectedRecipeId === action.id
          ? findFirstRecipeId(nextRecipes, state.selectedCategoryId)
          : state.selectedRecipeId
      return {
        ...state,
        recipes: nextRecipes,
        selectedRecipeId: nextSelectedId,
        view: state.lastListView,
        draft: null,
        runIndex: 0,
      }
    }
    case 'toggle_favorite': {
      const nextRecipes = state.recipes.map((item) =>
        item.id === action.id ? { ...item, isFavorite: !item.isFavorite } : item,
      )
      return { ...state, recipes: nextRecipes }
    }
    case 'run':
      if (!state.selectedRecipeId) return state
      return {
        ...state,
        view: 'run',
        runIndex: 0,
        recipes: state.recipes.map((item) =>
          item.id === state.selectedRecipeId
            ? { ...item, lastRunAt: Date.now() }
            : item,
        ),
      }
    case 'run_recipe': {
      const recipe = state.recipes.find((item) => item.id === action.id)
      if (!recipe) return state
      return {
        ...state,
        selectedRecipeId: action.id,
        view: 'run',
        runIndex: 0,
        recipes: state.recipes.map((item) =>
          item.id === action.id ? { ...item, lastRunAt: Date.now() } : item,
        ),
      }
    }
    case 'run_prev':
      return { ...state, runIndex: Math.max(0, state.runIndex - 1) }
    case 'run_next': {
      const recipe = state.recipes.find((item) => item.id === state.selectedRecipeId)
      const maxIndex = recipe ? recipe.steps.length : 0
      return { ...state, runIndex: Math.min(maxIndex, state.runIndex + 1) }
    }
    case 'back_to_list':
      return { ...state, view: state.lastListView, draft: null, runIndex: 0 }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [remoteReady, setRemoteReady] = useState(false)
  const latestData = useRef({ categories: state.categories, recipes: state.recipes })

  useEffect(() => {
    latestData.current = { categories: state.categories, recipes: state.recipes }
  }, [state.categories, state.recipes])

  useEffect(() => {
    saveAppData({ categories: state.categories, recipes: state.recipes })
  }, [state.categories, state.recipes])

  const sanitizeForFirestore = (value: unknown): unknown => {
    if (value === undefined) return undefined
    if (Array.isArray(value)) {
      return value
        .map((item) => sanitizeForFirestore(item))
        .filter((item) => item !== undefined)
    }
    if (value && typeof value === 'object') {
      const obj: Record<string, unknown> = {}
      Object.entries(value).forEach(([key, val]) => {
        const sanitized = sanitizeForFirestore(val)
        if (sanitized !== undefined) obj[key] = sanitized
      })
      return obj
    }
    return value
  }

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      // Fall back to in-memory if persistence isn't available.
    })
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user)
      setAuthError('')
      const shouldReset = new URLSearchParams(window.location.search).get('reset') === '1'
      if (!user) {
        setRemoteReady(false)
        setAuthLoading(false)
        return
      }
      try {
        const ref = doc(db, 'users', user.uid, 'app', 'data')
        if (shouldReset) {
          const initial = getInitialData()
          const payload = sanitizeForFirestore({
            ...initial,
            updatedAt: serverTimestamp(),
          })
          await setDoc(ref, payload as Record<string, unknown>, { merge: false })
          dispatch({ type: 'set_data', categories: initial.categories, recipes: initial.recipes })
          saveAppData(initial)
          setRemoteReady(true)
          setAuthLoading(false)
          return
        }
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const data = normalizeAppData(snap.data())
          dispatch({ type: 'set_data', categories: data.categories, recipes: data.recipes })
          saveAppData(data)
        } else {
          const localData = normalizeAppData(loadAppData())
          const payload = sanitizeForFirestore({
            ...localData,
            updatedAt: serverTimestamp(),
          })
          await setDoc(ref, payload as Record<string, unknown>, { merge: false })
        }
        setRemoteReady(true)
      } catch (error: unknown) {
        const err = error as { code?: string; message?: string }
        const code = err?.code ? ` (${err.code})` : ''
        const message = err?.message ? `: ${err.message}` : ''
        setAuthError(`ログインしましたがデータ取得に失敗しました${code}${message}`)
      } finally {
        setAuthLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!authUser || !remoteReady) return
    const ref = doc(db, 'users', authUser.uid, 'app', 'data')
    const payload = sanitizeForFirestore({
      ...latestData.current,
      updatedAt: serverTimestamp(),
    })
    setDoc(ref, payload as Record<string, unknown>, { merge: true }).catch(() => {
      setAuthError('クラウド保存に失敗しました。')
    })
  }, [authUser, remoteReady, state.categories, state.recipes])

  const handleSignIn = async () => {
    setAuthError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string }
      const code = err?.code ? ` (${err.code})` : ''
      const message = err?.message ? `: ${err.message}` : ''
      setAuthError(`ログインに失敗しました${code}${message}`)
    }
  }

  const handleSignOut = async () => {
    setAuthError('')
    await signOut(auth)
  }

  const selectedCategory = useMemo(
    () => state.categories.find((item) => item.id === state.selectedCategoryId) ?? null,
    [state.categories, state.selectedCategoryId],
  )

  const recipesInCategory = useMemo(() => {
    if (selectedCategory?.name === 'お気に入り') {
      return state.recipes.filter((item) => item.isFavorite)
    }
    return state.recipes.filter((item) => item.categoryId === state.selectedCategoryId)
  }, [state.recipes, state.selectedCategoryId, selectedCategory?.name])

  const selectedRecipe = useMemo(
    () => state.recipes.find((item) => item.id === state.selectedRecipeId) ?? null,
    [state.recipes, state.selectedRecipeId],
  )

  const categoryStats = useMemo(
    () =>
      state.categories.map((category) => ({
        ...category,
        recipeCount:
          category.name === 'お気に入り'
            ? state.recipes.filter((recipe) => recipe.isFavorite).length
            : state.recipes.filter((recipe) => recipe.categoryId === category.id).length,
      })),
    [state.categories, state.recipes],
  )

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Recipe Flow</p>
          <h1>CYBER RECIPE LAB</h1>
        </div>
        <div className="auth-box">
          {authLoading ? (
            <span className="subtle">認証中...</span>
          ) : authUser ? (
            <>
              <span className="auth-name">{authUser.displayName ?? 'ログイン中'}</span>
              <button className="btn ghost small" onClick={handleSignOut}>
                ログアウト
              </button>
            </>
          ) : (
            <button className="btn primary" onClick={handleSignIn}>
              Googleでログイン
            </button>
          )}
        </div>
      </header>
      {authError && <p className="auth-error">{authError}</p>}

      <nav className="app-nav">
        <button
          className={`btn ghost ${state.view === 'categories' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'goto_categories' })}
        >
          カテゴリ
        </button>
        <button
          className={`btn ghost ${state.view === 'list' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'goto_list' })}
        >
          レシピ一覧
        </button>
      </nav>

      {state.view === 'categories' && (
        <CategoryList
          categories={categoryStats}
          selectedId={state.selectedCategoryId}
          onSelect={(id) => dispatch({ type: 'open_category', id })}
          onCreate={(name) => dispatch({ type: 'create_category', name })}
          onRename={(id, name) => dispatch({ type: 'rename_category', id, name })}
          onDelete={(id) => dispatch({ type: 'delete_category', id })}
        />
      )}

      {state.view === 'list' && (
        <RecipeList
          recipes={state.recipes}
          selectedId={state.selectedRecipeId}
          categoryName="全レシピ"
          onCreate={() => dispatch({ type: 'create' })}
          onEdit={(id) => dispatch({ type: 'edit_recipe', id })}
          onRun={(id) => dispatch({ type: 'run_recipe', id })}
          onDelete={(id) => {
            const ok = window.confirm('このレシピを削除しますか？')
            if (ok) dispatch({ type: 'delete_recipe', id })
          }}
          onToggleFavorite={(id) => dispatch({ type: 'toggle_favorite', id })}
        />
      )}

      {state.view === 'category_list' && (
        <RecipeList
          recipes={recipesInCategory}
          selectedId={state.selectedRecipeId}
          categoryName={selectedCategory?.name ?? '未分類'}
          onCreate={() => dispatch({ type: 'create' })}
          onEdit={(id) => dispatch({ type: 'edit_recipe', id })}
          onRun={(id) => dispatch({ type: 'run_recipe', id })}
          onDelete={(id) => {
            const ok = window.confirm('このレシピを削除しますか？')
            if (ok) dispatch({ type: 'delete_recipe', id })
          }}
          onToggleFavorite={(id) => dispatch({ type: 'toggle_favorite', id })}
        />
      )}

      {state.view === 'edit' && state.draft && (
        <RecipeEditor
          draft={state.draft}
          categories={state.categories}
          onTitleChange={(title) => dispatch({ type: 'update_title', title })}
          onSourceUrlChange={(sourceUrl) =>
            dispatch({ type: 'update_source_url', sourceUrl })
          }
          onCategoryChange={(categoryId) =>
            dispatch({ type: 'update_category', categoryId })
          }
          onIngredientNameChange={(ingredientId, name) =>
            dispatch({ type: 'update_ingredient_name', ingredientId, name })
          }
          onIngredientAmountChange={(ingredientId, amountText) =>
            dispatch({ type: 'update_ingredient_amount', ingredientId, amountText })
          }
          onAddIngredient={() => dispatch({ type: 'add_ingredient' })}
          onDeleteIngredient={(ingredientId) =>
            dispatch({ type: 'delete_ingredient', ingredientId })
          }
          onStepTitleChange={(stepId, title) =>
            dispatch({ type: 'update_step_title', stepId, title })
          }
          onStepNoteChange={(stepId, note) =>
            dispatch({ type: 'update_step_note', stepId, note })
          }
          onAddStep={() => dispatch({ type: 'add_step' })}
          onDeleteStep={(stepId) => dispatch({ type: 'delete_step', stepId })}
          onBulkImport={(ingredients, steps) =>
            dispatch({ type: 'bulk_import', ingredients, steps })
          }
          onSave={() => dispatch({ type: 'save_draft' })}
          onBack={() => dispatch({ type: 'back_to_list' })}
        />
      )}

      {state.view === 'run' && selectedRecipe && (
        <RecipeRunner
          recipe={selectedRecipe}
          index={state.runIndex}
          onPrev={() => dispatch({ type: 'run_prev' })}
          onNext={() => dispatch({ type: 'run_next' })}
          onBack={() => dispatch({ type: 'back_to_list' })}
        />
      )}

      {state.view === 'run' && !selectedRecipe && (
        <div className="panel empty">
          <p>実行するレシピが見つかりません。</p>
          <button className="btn primary" onClick={() => dispatch({ type: 'back_to_list' })}>
            一覧へ戻る
          </button>
        </div>
      )}
    </div>
  )
}

export default App
