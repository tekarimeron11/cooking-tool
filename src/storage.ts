import type { Category, IngredientLine, Recipe, Step } from './types'

const STORAGE_KEY = 'recipe-mvp.v1'

const safeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`

const sampleCategories = (): Category[] => [
  { id: 'cat-favorites', name: 'お気に入り' },
  { id: 'cat-meat', name: 'お肉' },
  { id: 'cat-seafood', name: '魚介' },
  { id: 'cat-eggs', name: '卵' },
  { id: 'cat-salad', name: 'サラダ' },
  { id: 'cat-soup', name: 'スープ' },
  { id: 'cat-rice', name: 'ご飯物' },
  { id: 'cat-noodles', name: '麺' },
  { id: 'cat-bento', name: 'お弁当' },
  { id: 'cat-bread', name: 'パン' },
  { id: 'cat-sweets', name: 'お菓子' },
  { id: 'cat-others', name: 'その他' },
]

const buildRecipe = (
  id: string,
  title: string,
  categoryId: string,
  imageUrl: string,
  ingredients: IngredientLine[],
  steps: Step[],
  isFavorite = false,
): Recipe => ({
  id,
  title,
  categoryId,
  imageUrl,
  ingredients,
  steps,
  isFavorite,
})

const sampleRecipes = (categories: Category[]): Recipe[] => {
  const byName = (name: string) =>
    categories.find((category) => category.name === name)?.id ?? categories[0]?.id ?? safeId()

  return [
    buildRecipe(
      'sample-meat-1',
      'ジューシー唐揚げ',
      byName('お肉'),
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '鶏もも肉', amountText: '300g' },
        { id: 'i2', name: '醤油', amountText: '大さじ2' },
        { id: 'i3', name: 'にんにく', amountText: '1片' },
      ],
      [
        { id: 's1', title: '鶏肉に下味をつける' },
        { id: 's2', title: '片栗粉をまぶして揚げる' },
      ],
      true,
    ),
    buildRecipe(
      'sample-meat-2',
      'ポークジンジャー',
      byName('お肉'),
      'https://images.unsplash.com/photo-1604908554169-6e7a3c3d3f52?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '豚ロース', amountText: '2枚' },
        { id: 'i2', name: '生姜', amountText: '1片' },
      ],
      [
        { id: 's1', title: '豚肉を焼く' },
        { id: 's2', title: '生姜だれを絡める' },
      ],
    ),
    buildRecipe(
      'sample-sea-1',
      'サーモンのムニエル',
      byName('魚介'),
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'サーモン', amountText: '2切れ' },
        { id: 'i2', name: 'バター', amountText: '10g' },
      ],
      [
        { id: 's1', title: '塩胡椒で下味をつける' },
        { id: 's2', title: 'バターで焼く' },
      ],
    ),
    buildRecipe(
      'sample-sea-2',
      'えびのガーリックソテー',
      byName('魚介'),
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'えび', amountText: '12尾' },
        { id: 'i2', name: 'にんにく', amountText: '1片' },
      ],
      [
        { id: 's1', title: 'えびの背わたを取る' },
        { id: 's2', title: 'にんにくで炒める' },
      ],
    ),
    buildRecipe(
      'sample-egg-1',
      'ふわとろオムライス',
      byName('卵'),
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: 'ご飯', amountText: '茶碗1杯' },
        { id: 'i3', name: 'ケチャップ', amountText: '大さじ2' },
      ],
      [
        { id: 's1', title: 'チキンライスを作る' },
        { id: 's2', title: '卵で包む' },
      ],
    ),
    buildRecipe(
      'sample-egg-2',
      '半熟卵サンド',
      byName('卵'),
      'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: '食パン', amountText: '2枚' },
      ],
      [
        { id: 's1', title: '卵を茹でて潰す' },
        { id: 's2', title: 'パンに挟む' },
      ],
    ),
    buildRecipe(
      'sample-salad-1',
      'シーザーサラダ',
      byName('サラダ'),
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'レタス', amountText: '3枚' },
        { id: 'i2', name: 'クルトン', amountText: '適量' },
      ],
      [
        { id: 's1', title: '野菜を切る' },
        { id: 's2', title: 'ドレッシングで和える' },
      ],
    ),
    buildRecipe(
      'sample-salad-2',
      'ツナコーンサラダ',
      byName('サラダ'),
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'ツナ', amountText: '1缶' },
        { id: 'i2', name: 'コーン', amountText: '適量' },
      ],
      [
        { id: 's1', title: '材料を混ぜる' },
        { id: 's2', title: '塩胡椒で味付け' },
      ],
    ),
    buildRecipe(
      'sample-soup-1',
      'ミネストローネ',
      byName('スープ'),
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'トマト缶', amountText: '1/2缶' },
        { id: 'i2', name: '野菜', amountText: '適量' },
      ],
      [
        { id: 's1', title: '野菜を炒める' },
        { id: 's2', title: '煮込む' },
      ],
    ),
    buildRecipe(
      'sample-soup-2',
      'コーンポタージュ',
      byName('スープ'),
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'コーン', amountText: '200g' },
        { id: 'i2', name: '牛乳', amountText: '200ml' },
      ],
      [
        { id: 's1', title: 'コーンを煮る' },
        { id: 's2', title: 'ミキサーにかける' },
      ],
    ),
    buildRecipe(
      'sample-rice-1',
      '親子丼',
      byName('ご飯物'),
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '鶏もも肉', amountText: '120g' },
        { id: 'i2', name: '卵', amountText: '2個' },
      ],
      [
        { id: 's1', title: '鶏肉と玉ねぎを煮る' },
        { id: 's2', title: '卵でとじる' },
      ],
    ),
    buildRecipe(
      'sample-rice-2',
      'ガーリックライス',
      byName('ご飯物'),
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'ご飯', amountText: '2杯' },
        { id: 'i2', name: 'にんにく', amountText: '1片' },
      ],
      [
        { id: 's1', title: 'にんにくを炒める' },
        { id: 's2', title: 'ご飯を加える' },
      ],
    ),
    buildRecipe(
      'sample-noodles-1',
      '醤油ラーメン',
      byName('麺'),
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '中華麺', amountText: '1玉' },
        { id: 'i2', name: 'スープ', amountText: '300ml' },
      ],
      [
        { id: 's1', title: '麺を茹でる' },
        { id: 's2', title: 'スープに合わせる' },
      ],
    ),
    buildRecipe(
      'sample-noodles-2',
      '明太子パスタ',
      byName('麺'),
      'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8b1f?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'パスタ', amountText: '100g' },
        { id: 'i2', name: '明太子', amountText: '1腹' },
      ],
      [
        { id: 's1', title: 'パスタを茹でる' },
        { id: 's2', title: '明太子ソースで和える' },
      ],
    ),
    buildRecipe(
      'sample-bento-1',
      '彩りお弁当',
      byName('お弁当'),
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'ご飯', amountText: '1人前' },
        { id: 'i2', name: 'おかず', amountText: '数種類' },
      ],
      [
        { id: 's1', title: 'おかずを作る' },
        { id: 's2', title: '詰める' },
      ],
    ),
    buildRecipe(
      'sample-bento-2',
      'のり弁',
      byName('お弁当'),
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'ご飯', amountText: '1人前' },
        { id: 'i2', name: 'のり', amountText: '1枚' },
      ],
      [
        { id: 's1', title: 'ご飯にのりをのせる' },
        { id: 's2', title: 'おかずを添える' },
      ],
    ),
    buildRecipe(
      'sample-bread-1',
      'ガーリックトースト',
      byName('パン'),
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '食パン', amountText: '1枚' },
        { id: 'i2', name: 'バター', amountText: '10g' },
      ],
      [
        { id: 's1', title: 'バターを塗る' },
        { id: 's2', title: 'トーストする' },
      ],
    ),
    buildRecipe(
      'sample-bread-2',
      'ベーグルサンド',
      byName('パン'),
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'ベーグル', amountText: '1個' },
        { id: 'i2', name: 'クリームチーズ', amountText: '適量' },
      ],
      [
        { id: 's1', title: '具材を挟む' },
        { id: 's2', title: 'カットして盛る' },
      ],
    ),
    buildRecipe(
      'sample-sweets-1',
      'チョコブラウニー',
      byName('お菓子'),
      'https://images.unsplash.com/photo-1541781286675-42b85d8e5a5a?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'チョコ', amountText: '100g' },
        { id: 'i2', name: '卵', amountText: '1個' },
      ],
      [
        { id: 's1', title: '材料を混ぜる' },
        { id: 's2', title: '焼く' },
      ],
    ),
    buildRecipe(
      'sample-sweets-2',
      'プリン',
      byName('お菓子'),
      'https://images.unsplash.com/photo-1505253216365-8c88a62c4c0b?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: '牛乳', amountText: '200ml' },
      ],
      [
        { id: 's1', title: '卵液を作る' },
        { id: 's2', title: '蒸し焼きにする' },
      ],
    ),
    buildRecipe(
      'sample-others-1',
      '簡単おつまみ',
      byName('その他'),
      'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'チーズ', amountText: '適量' },
        { id: 'i2', name: 'ナッツ', amountText: '適量' },
      ],
      [
        { id: 's1', title: '盛り付ける' },
        { id: 's2', title: 'ハーブを添える' },
      ],
    ),
    buildRecipe(
      'sample-others-2',
      'ミックスプレート',
      byName('その他'),
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
      [
        { id: 'i1', name: 'お好みの材料', amountText: '適量' },
        { id: 'i2', name: 'ソース', amountText: '適量' },
      ],
      [
        { id: 's1', title: '材料を焼く' },
        { id: 's2', title: '盛り付ける' },
      ],
    ),
  ]
}

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
    recipes: sampleRecipes(categories),
  }
}

export const getInitialData = (): AppData => withFallbackData()

export const normalizeAppData = (data: unknown): AppData => {
  if (!data || typeof data !== 'object') return withFallbackData()

  if (Array.isArray(data)) {
    const categories = [{ id: safeId(), name: '未分類' }]
    const recipes = normalizeRecipes(data, categories)
    return {
      categories,
      recipes: recipes.length > 0 ? recipes : sampleRecipes(categories),
    }
  }

  const raw = data as { categories?: unknown; recipes?: unknown }
  const categories = normalizeCategories(raw.categories)
  const ensuredCategories =
    categories.length > 0 ? categories : [{ id: safeId(), name: '未分類' }]
  const recipes = normalizeRecipes(raw.recipes, ensuredCategories)
  return {
    categories: ensuredCategories,
    recipes: recipes.length > 0 ? recipes : sampleRecipes(ensuredCategories),
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
