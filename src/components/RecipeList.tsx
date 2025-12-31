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
}: Props) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredRecipes = useMemo(() => {
    if (!normalizedQuery) return recipes
    return recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(normalizedQuery)
      const ingredientMatch = recipe.ingredients.some((item) =>
        item.name.toLowerCase().includes(normalizedQuery),
      )
      return titleMatch || ingredientMatch
    })
  }, [recipes, normalizedQuery])

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
            <button
              key={recipe.id}
              type="button"
              className={`recipe-card ${selectedId === recipe.id ? 'selected' : ''}`}
              onClick={() => onSelect(recipe.id)}
            >
              <div className="recipe-card-media">
                {recipe.imageUrl ? (
                  <img src={recipe.imageUrl} alt={recipe.title} />
                ) : (
                  <div className="recipe-placeholder">No Image</div>
                )}
              </div>
              <div className="recipe-card-body">
                <span className="recipe-title">{recipe.title}</span>
                <span className="recipe-meta">
                  {recipe.ingredients.length} 材料 / {recipe.steps.length} ステップ
                </span>
              </div>
              {selectedId === recipe.id && <span className="badge">選択中</span>}
            </button>
          ))}
        </div>
      )}

      <div className="actions-row">
        <button className="btn ghost" onClick={onEdit} disabled={!selectedId}>
          編集
        </button>
        <button className="btn accent" onClick={onRun} disabled={!selectedId}>
          実行
        </button>
        <button
          className="btn danger"
          onClick={() => selectedId && onDelete(selectedId)}
          disabled={!selectedId}
        >
          削除
        </button>
      </div>
    </div>
  )
}
