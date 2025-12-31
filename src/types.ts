export type Step = {
  id: string
  title: string
  note?: string
}

export type Recipe = {
  id: string
  title: string
  steps: Step[]
}
