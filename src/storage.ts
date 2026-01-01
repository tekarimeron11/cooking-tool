import type { Category, IngredientLine, Recipe, Step } from './types'

const STORAGE_KEY = 'recipe-mvp.v1'

const safeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`

const sampleCategories = (): Category[] => [
  { id: 'cat-western', name: '洋食' },
  { id: 'cat-japanese', name: '和食' },
]

const sampleRecipes = (categoryId: string): Recipe[] => [
  {
    id: 'sample-omurice',
    title: 'ふわとろオムライス',
    categoryId,
    imageUrl:
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1200&auto=format&fit=crop',
    ingredients: [
      { id: 'i1', name: '卵', amountText: '2個' },
      { id: 'i2', name: 'ご飯', amountText: '茶碗1杯' },
      { id: 'i3', name: '玉ねぎ', amountText: '1/4個' },
      { id: 'i4', name: '鶏もも肉', amountText: '80g' },
      { id: 'i5', name: 'ケチャップ', amountText: '大さじ2' },
    ],
    steps: [
      { id: 's1', title: '玉ねぎと鶏肉を1cm角に切る' },
      { id: 's2', title: 'フライパンで具材を炒める', note: '弱火で焦がさない' },
      { id: 's3', title: 'ご飯とケチャップを加えて炒める' },
      { id: 's4', title: '卵をふんわり焼いてご飯にのせる' },
      { id: 's5', title: '仕上げにケチャップをかける' },
    ],
  },
]

const normalizeSteps = (data: unknown): Step[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((step) => ({
      id: typeof step?.id === 'string' ? step.id : safeId(),
      title: typeof step?.title === 'string' ? step.title : '',
      note: typeof step?.note === 'string' ? step.note : '',
    }))
    .filter((step) => step.title !== '' || step.note !== '')
}

const normalizeIngredients = (data: unknown): IngredientLine[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((item) => ({
      id: typeof item?.id === 'string' ? item.id : safeId(),
      name: typeof item?.name === 'string' ? item.name : '',
      amountText: typeof item?.amountText === 'string' ? item.amountText : '',
    }))
    .filter((item) => item.name.trim() !== '' || item.amountText?.trim() !== '')
}

const normalizeCategories = (data: unknown): Category[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((item) => ({
      id: typeof item?.id === 'string' ? item.id : safeId(),
      name: typeof item?.name === 'string' ? item.name : '',
    }))
    .filter((item) => item.name.trim() !== '')
}

const normalizeRecipes = (data: unknown, categories: Category[]): Recipe[] => {
  if (!Array.isArray(data)) return []
  const fallbackCategoryId = categories[0]?.id ?? safeId()
  return data
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const recipe = item as Partial<Recipe>
      const steps = normalizeSteps(recipe.steps)
      const ingredients = normalizeIngredients(recipe.ingredients)
      const rawCategoryId =
        typeof recipe.categoryId === 'string' ? recipe.categoryId : fallbackCategoryId
      const categoryId = categories.some((cat) => cat.id === rawCategoryId)
        ? rawCategoryId
        : fallbackCategoryId
      return {
        id: typeof recipe.id === 'string' ? recipe.id : safeId(),
        title: typeof recipe.title === 'string' ? recipe.title : '無題レシピ',
        categoryId,
        imageUrl: typeof recipe.imageUrl === 'string' ? recipe.imageUrl : '',
        ingredients,
        steps: steps.length > 0 ? steps : [{ id: safeId(), title: '' }],
        isFavorite: typeof recipe.isFavorite === 'boolean' ? recipe.isFavorite : false,
        lastRunAt: typeof recipe.lastRunAt === 'number' ? recipe.lastRunAt : undefined,
      }
    })
    .filter(Boolean) as Recipe[]
}

export type AppData = {
  categories: Category[]
  recipes: Recipe[]
}

const withFallbackData = (): AppData => {
  const categories = sampleCategories()
  return {
    categories,
    recipes: sampleRecipes(categories[0].id),
  }
}

export const normalizeAppData = (data: unknown): AppData => {
  if (!data || typeof data !== 'object') return withFallbackData()

  if (Array.isArray(data)) {
    const categories = [{ id: safeId(), name: '未分類' }]
    const recipes = normalizeRecipes(data, categories)
    return {
      categories,
      recipes: recipes.length > 0 ? recipes : sampleRecipes(categories[0].id),
    }
  }

  const raw = data as { categories?: unknown; recipes?: unknown }
  const categories = normalizeCategories(raw.categories)
  const ensuredCategories =
    categories.length > 0 ? categories : [{ id: safeId(), name: '未分類' }]
  const recipes = normalizeRecipes(raw.recipes, ensuredCategories)
  return {
    categories: ensuredCategories,
    recipes: recipes.length > 0 ? recipes : sampleRecipes(ensuredCategories[0].id),
  }
}

export const loadAppData = (): AppData => {
  if (typeof window === 'undefined') return withFallbackData()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return withFallbackData()
    return normalizeAppData(JSON.parse(raw))
  } catch {
    return withFallbackData()
  }
}

export const saveAppData = (data: AppData) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
