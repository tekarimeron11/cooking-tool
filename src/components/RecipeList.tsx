import type { Recipe } from '../types'

type Props = {
  recipes: Recipe[]
  selectedId: string | null
  onSelect: (id: string) => void
  onCreate: () => void
  onEdit: () => void
  onRun: () => void
  onDelete: (id: string) => void
}

export default function RecipeList({
  recipes,
  selectedId,
  onSelect,
  onCreate,
  onEdit,
  onRun,
  onDelete,
}: Props) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>レシピ一覧</h2>
          <p className="subtle">作成・選択して編集/実行へ進みます。</p>
        </div>
        <button className="btn primary" onClick={onCreate}>
          新規作成
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="empty">
          <p>まだレシピがありません。</p>
          <button className="btn primary" onClick={onCreate}>
            レシピを作成
          </button>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              className={`recipe-card ${selectedId === recipe.id ? 'selected' : ''}`}
              onClick={() => onSelect(recipe.id)}
            >
              <div className="recipe-card-body">
                <span className="recipe-title">{recipe.title}</span>
                <span className="recipe-meta">{recipe.steps.length} ステップ</span>
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
