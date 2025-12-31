import { useEffect, useMemo, useReducer } from 'react'
import type { Recipe, Step } from './types'
import { loadRecipes, saveRecipes } from './storage'
import RecipeList from './components/RecipeList'
import RecipeEditor from './components/RecipeEditor'
import RecipeRunner from './components/RecipeRunner'

type View = 'list' | 'edit' | 'run'

type State = {
  view: View
  recipes: Recipe[]
  selectedId: string | null
  draft: Recipe | null
  runIndex: number
}

type Action =
  | { type: 'select'; id: string }
  | { type: 'create' }
  | { type: 'edit' }
  | { type: 'update_title'; title: string }
  | { type: 'update_step_title'; stepId: string; title: string }
  | { type: 'update_step_note'; stepId: string; note: string }
  | { type: 'add_step' }
  | { type: 'delete_step'; stepId: string }
  | { type: 'save_draft' }
  | { type: 'delete_recipe'; id: string }
  | { type: 'run' }
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

const cloneRecipe = (recipe: Recipe): Recipe => ({
  ...recipe,
  steps: recipe.steps.map((step) => ({ ...step })),
})

const initialState = (): State => {
  const recipes = loadRecipes()
  return {
    view: 'list',
    recipes,
    selectedId: recipes[0]?.id ?? null,
    draft: null,
    runIndex: 0,
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'select':
      return { ...state, selectedId: action.id }
    case 'create': {
      const draft: Recipe = {
        id: uid(),
        title: '新しいレシピ',
        steps: [createEmptyStep()],
      }
      return { ...state, view: 'edit', draft, selectedId: draft.id }
    }
    case 'edit': {
      if (!state.selectedId) return state
      const recipe = state.recipes.find((item) => item.id === state.selectedId)
      if (!recipe) return state
      return { ...state, view: 'edit', draft: cloneRecipe(recipe) }
    }
    case 'update_title':
      if (!state.draft) return state
      return {
        ...state,
        draft: { ...state.draft, title: action.title },
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
    case 'save_draft': {
      if (!state.draft) return state
      const exists = state.recipes.some((item) => item.id === state.draft!.id)
      const nextRecipes = exists
        ? state.recipes.map((item) =>
            item.id === state.draft!.id ? state.draft! : item,
          )
        : [...state.recipes, state.draft!]
      return {
        ...state,
        recipes: nextRecipes,
        selectedId: state.draft.id,
        draft: null,
        view: 'list',
      }
    }
    case 'delete_recipe': {
      const nextRecipes = state.recipes.filter((item) => item.id !== action.id)
      const nextSelected =
        state.selectedId === action.id ? nextRecipes[0]?.id ?? null : state.selectedId
      return {
        ...state,
        recipes: nextRecipes,
        selectedId: nextSelected,
        view: 'list',
        draft: null,
        runIndex: 0,
      }
    }
    case 'run':
      if (!state.selectedId) return state
      return { ...state, view: 'run', runIndex: 0 }
    case 'run_prev':
      return { ...state, runIndex: Math.max(0, state.runIndex - 1) }
    case 'run_next': {
      const recipe = state.recipes.find((item) => item.id === state.selectedId)
      const maxIndex = recipe ? recipe.steps.length - 1 : 0
      return { ...state, runIndex: Math.min(maxIndex, state.runIndex + 1) }
    }
    case 'back_to_list':
      return { ...state, view: 'list', draft: null, runIndex: 0 }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  useEffect(() => {
    saveRecipes(state.recipes)
  }, [state.recipes])

  const selectedRecipe = useMemo(
    () => state.recipes.find((item) => item.id === state.selectedId) ?? null,
    [state.recipes, state.selectedId],
  )

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Recipe Flow</p>
          <h1>料理ステップ保存 + 実行モード</h1>
        </div>
        <span className="status-pill">MVP</span>
      </header>

      {state.view === 'list' && (
        <RecipeList
          recipes={state.recipes}
          selectedId={state.selectedId}
          onSelect={(id) => dispatch({ type: 'select', id })}
          onCreate={() => dispatch({ type: 'create' })}
          onEdit={() => dispatch({ type: 'edit' })}
          onRun={() => dispatch({ type: 'run' })}
          onDelete={(id) => dispatch({ type: 'delete_recipe', id })}
        />
      )}

      {state.view === 'edit' && state.draft && (
        <RecipeEditor
          draft={state.draft}
          onTitleChange={(title) => dispatch({ type: 'update_title', title })}
          onStepTitleChange={(stepId, title) =>
            dispatch({ type: 'update_step_title', stepId, title })
          }
          onStepNoteChange={(stepId, note) =>
            dispatch({ type: 'update_step_note', stepId, note })
          }
          onAddStep={() => dispatch({ type: 'add_step' })}
          onDeleteStep={(stepId) => dispatch({ type: 'delete_step', stepId })}
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
