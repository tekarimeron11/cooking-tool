import type { Recipe } from '../types'

type Props = {
  recipe: Recipe
  index: number
  onPrev: () => void
  onNext: () => void
  onBack: () => void
}

export default function RecipeRunner({ recipe, index, onPrev, onNext, onBack }: Props) {
  const step = recipe.steps[index]
  const isFirst = index === 0
  const isLast = index === recipe.steps.length - 1

  return (
    <div className="panel run">
      <div className="panel-header run-header">
        <div>
          <h2>{recipe.title}</h2>
          <p className="subtle">
            ステップ {index + 1}/{recipe.steps.length}
          </p>
        </div>
        <button className="btn ghost" onClick={onBack}>
          一覧へ戻る
        </button>
      </div>

      <div className="run-card">
        <p className="run-step-label">現在のステップ</p>
        <h3>{step?.title || 'ステップタイトルを入力してください'}</h3>
        {step?.note && <p className="run-note">{step.note}</p>}
      </div>

      <div className="actions-row run-actions">
        <button className="btn ghost" onClick={onPrev} disabled={isFirst}>
          戻る
        </button>
        <button className="btn primary" onClick={onNext} disabled={isLast}>
          {isLast ? '完了' : '次へ'}
        </button>
      </div>
    </div>
  )
}
