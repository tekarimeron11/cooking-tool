import type { Recipe } from './types'

const STORAGE_KEY = 'recipe-mvp.v1'

const sampleRecipes = (): Recipe[] => [
  {
    id: 'sample-omurice',
    title: 'ふわとろオムライス',
    steps: [
      { id: 's1', title: '玉ねぎと鶏肉を1cm角に切る' },
      { id: 's2', title: 'フライパンで具材を炒める', note: '弱火で焦がさない' },
      { id: 's3', title: 'ご飯とケチャップを加えて炒める' },
      { id: 's4', title: '卵をふんわり焼いてご飯にのせる' },
      { id: 's5', title: '仕上げにケチャップをかける' },
    ],
  },
]

const safeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`

const normalizeRecipes = (data: unknown): Recipe[] => {
  if (!Array.isArray(data)) return sampleRecipes()
  const normalized = data
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const recipe = item as Recipe
      if (!Array.isArray(recipe.steps)) return null
      const steps = recipe.steps.map((step) => ({
        id: typeof step.id === 'string' ? step.id : safeId(),
        title: typeof step.title === 'string' ? step.title : '',
        note: typeof step.note === 'string' ? step.note : '',
      }))
      return {
        id: typeof recipe.id === 'string' ? recipe.id : safeId(),
        title: typeof recipe.title === 'string' ? recipe.title : '無題レシピ',
        steps: steps.length > 0 ? steps : [{ id: safeId(), title: '' }],
      }
    })
    .filter(Boolean) as Recipe[]
  return normalized.length > 0 ? normalized : sampleRecipes()
}

export const loadRecipes = (): Recipe[] => {
  if (typeof window === 'undefined') return sampleRecipes()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleRecipes()
    return normalizeRecipes(JSON.parse(raw))
  } catch {
    return sampleRecipes()
  }
}

export const saveRecipes = (recipes: Recipe[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}
