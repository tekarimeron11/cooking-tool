export type Step = {
  id: string
  title: string
  note?: string
}

export type IngredientLine = {
  id: string
  name: string
  amountText?: string
}

export type Category = {
  id: string
  name: string
}

export type Recipe = {
  id: string
  title: string
  categoryId: string
  imageUrl?: string
  sourceUrl?: string
  ingredients: IngredientLine[]
  steps: Step[]
  isFavorite?: boolean
  lastRunAt?: number
}
