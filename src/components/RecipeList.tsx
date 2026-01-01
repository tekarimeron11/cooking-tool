import { useMemo, useState } from 'react'
import type { Recipe } from '../types'

type Props = {
  recipes: Recipe[]
  selectedId: string | null
  categoryName: string
  onCreate: () => void
  onEdit: (id: string) => void
  onRun: (id: string) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export default function RecipeList({
  recipes,
  selectedId,
  categoryName,
  onCreate,
  onEdit,
  onRun,
  onDelete,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState<'default' | 'recent'>('recent')
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
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
            {categoryName === '全レシピ'
              ? '全レシピを表示中。レシピを押すと実行します。'
              : `カテゴリ「${categoryName}」のレシピを表示中。レシピを押すと実行します。`}
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
                onClick={() => {
                  setMenuOpenId(null)
                  onRun(recipe.id)
                }}
              >
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
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={(event) => {
                      event.stopPropagation()
                      setMenuOpenId((prev) => (prev === recipe.id ? null : recipe.id))
                    }}
                    aria-label="メニュー"
                  >
                    ⋯
                  </button>
                </div>
              </button>
              {menuOpenId === recipe.id && (
                <div className="recipe-menu">
                  <button
                    type="button"
                    className="btn ghost small"
                    onClick={() => {
                      setMenuOpenId(null)
                      onEdit(recipe.id)
                    }}
                  >
                    編集
                  </button>
                  <button
                    type="button"
                    className="btn danger small"
                    onClick={() => {
                      setMenuOpenId(null)
                      onDelete(recipe.id)
                    }}
                  >
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
