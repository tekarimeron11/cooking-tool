import { useMemo, useState } from 'react'
import type { Recipe } from '../types'

type Props = {
  recipes: Recipe[]
  selectedId: string | null
  categoryName: string
  onSelect: (id: string) => void
  onCreate: () => void
  onEdit: () => void
  onRun: () => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export default function RecipeList({
  recipes,
  selectedId,
  categoryName,
  onSelect,
  onCreate,
  onEdit,
  onRun,
  onDelete,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState<'default' | 'recent'>('recent')

  const iconForRecipe = (title: string) => {
    const normalized = title.toLowerCase()
    if (normalized.includes('カレー') || normalized.includes('curry')) return '🍛'
    if (normalized.includes('パスタ') || normalized.includes('pasta')) return '🍝'
    if (normalized.includes('サラダ') || normalized.includes('salad')) return '🥗'
    if (normalized.includes('スープ') || normalized.includes('soup')) return '🥣'
    if (normalized.includes('パン') || normalized.includes('bread')) return '🥖'
    if (normalized.includes('デザート') || normalized.includes('ケーキ')) return '🍰'
    if (normalized.includes('肉') || normalized.includes('steak')) return '🥩'
    if (normalized.includes('魚') || normalized.includes('fish')) return '🐟'
    if (normalized.includes('ご飯') || normalized.includes('rice')) return '🍚'
    return '🍳'
  }

  const normalizedQuery = query.trim().toLowerCase()
  const filteredRecipes = useMemo(() => {
    const base = normalizedQuery
      ? recipes.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(normalizedQuery)
        const ingredientMatch = recipe.ingredients.some((item) =>
          item.name.toLowerCase().includes(normalizedQuery),
        )
        return titleMatch || ingredientMatch
      })
      : recipes

    if (sortMode === 'recent') {
      return [...base].sort((a, b) => (b.lastRunAt ?? 0) - (a.lastRunAt ?? 0))
    }
    return base
  }, [recipes, normalizedQuery, sortMode])

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>レシピ一覧</h2>
          <p className="subtle">
            {categoryName} のレシピを表示中。作成・選択して編集/実行へ進みます。
          </p>
        </div>
        <button className="btn primary" onClick={onCreate}>
          新規作成
        </button>
      </div>

      <div className="panel-toolbar">
        <input
          className="input search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="レシピを検索（タイトル）"
        />
        <div className="segmented">
          <button
            type="button"
            className={`segmented-btn ${sortMode === 'default' ? 'active' : ''}`}
            onClick={() => setSortMode('default')}
          >
            追加順
          </button>
          <button
            type="button"
            className={`segmented-btn ${sortMode === 'recent' ? 'active' : ''}`}
            onClick={() => setSortMode('recent')}
          >
            最近使った順
          </button>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty">
          <p>{recipes.length === 0 ? 'まだレシピがありません。' : '一致するレシピがありません。'}</p>
          <button className="btn primary" onClick={onCreate}>
            レシピを作成
          </button>
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <button
                type="button"
                className={`recipe-card ${selectedId === recipe.id ? 'selected' : ''}`}
                onClick={() => onSelect(recipe.id)}
              >
                <div className="recipe-card-media">
                  <div className="recipe-icon" aria-hidden="true">
                    {iconForRecipe(recipe.title)}
                  </div>
                </div>
                <div className="recipe-card-body">
                  <span className="recipe-title">{recipe.title}</span>
                  <span className="recipe-meta">
                    {recipe.ingredients.length} 材料 / {recipe.steps.length} ステップ
                  </span>
                </div>
                <div className="recipe-card-actions">
                  <button
                    type="button"
                    className={`icon-btn ${recipe.isFavorite ? 'active' : ''}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      onToggleFavorite(recipe.id)
                    }}
                    aria-label="お気に入り"
                  >
                    {recipe.isFavorite ? '★' : '☆'}
                  </button>
                  {selectedId === recipe.id && <span className="badge">選択中</span>}
                </div>
              </button>
              {selectedId === recipe.id && (
                <div className="actions-row recipe-inline-actions">
                  <button className="btn accent" onClick={onRun}>
                    実行
                  </button>
                  <button className="btn ghost" onClick={onEdit}>
                    編集
                  </button>
                  <button className="btn danger" onClick={() => onDelete(selectedId)}>
                    削除
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
