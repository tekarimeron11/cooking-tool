import { useEffect, useState } from 'react'
import type { Recipe } from '../types'

type Props = {
  recipe: Recipe
  index: number
  onPrev: () => void
  onNext: () => void
  onBack: () => void
}

export default function RecipeRunner({ recipe, index, onPrev, onNext, onBack }: Props) {
  const isIngredientsScreen = index === 0
  const stepIndex = index - 1
  const step = stepIndex >= 0 ? recipe.steps[stepIndex] : undefined
  const isFirst = index === 0
  const isLast = index === recipe.steps.length
  const hasIngredients = recipe.ingredients.length > 0
  const showIngredients = isIngredientsScreen
  const [ingredientsOpen, setIngredientsOpen] = useState(true)
  const [nextPulse, setNextPulse] = useState(false)

  useEffect(() => {
    if (!nextPulse) return
    const timer = window.setTimeout(() => setNextPulse(false), 450)
    return () => window.clearTimeout(timer)
  }, [nextPulse])

  const triggerNextPulse = () => {
    setNextPulse(false)
    requestAnimationFrame(() => setNextPulse(true))
  }

  return (
    <div className="panel run">
      <div className="panel-header run-header">
        <div>
          <h2>{recipe.title}</h2>
          <p className="subtle">
            {isIngredientsScreen
              ? `材料（${hasIngredients ? recipe.ingredients.length : 0}件）`
              : `ステップ ${stepIndex + 1}/${recipe.steps.length}`}
          </p>
          {recipe.sourceUrl && (
            <p className="subtle">
              出典:{' '}
              <a
                className="source-link"
                href={recipe.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                リンク
              </a>
            </p>
          )}
        </div>
        <button className="btn ghost" onClick={onBack}>
          一覧へ戻る
        </button>
      </div>

      {showIngredients && (
        <section className="run-ingredients">
          <div className="run-ingredients-header">
            <h3>材料</h3>
            <div className="run-ingredients-actions">
              <span className="subtle">{hasIngredients ? recipe.ingredients.length : 0} 件</span>
              <button
                type="button"
                className="btn ghost small"
                onClick={() => setIngredientsOpen((prev) => !prev)}
              >
                {ingredientsOpen ? '隠す' : '表示'}
              </button>
            </div>
          </div>
          {ingredientsOpen && (
            <>
              {hasIngredients ? (
                <div className="ingredients-grid">
                  {recipe.ingredients.map((item) => (
                    <div key={item.id} className="ingredient-row">
                      <span className="ingredient-name">{item.name || '（未入力）'}</span>
                      {item.amountText && (
                        <span className="ingredient-amount">{item.amountText}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="subtle">材料がまだ登録されていません。</p>
              )}
            </>
          )}
        </section>
      )}

      {!isIngredientsScreen && (
        <div className="run-card">
          <p className="run-step-label">現在のステップ</p>
          <h3>{step?.title || 'ステップタイトルを入力してください'}</h3>
          {step?.note && <p className="run-note">{step.note}</p>}
        </div>
      )}

      <div className="actions-row run-actions">
        <button className="btn ghost" onClick={onPrev} disabled={isFirst}>
          戻る
        </button>
        <button
          className={`btn primary run-next-btn ${nextPulse ? 'pulse' : ''}`}
          onClick={() => {
            triggerNextPulse()
            onNext()
          }}
          disabled={isLast}
        >
          {isLast ? '完了' : '次へ'}
        </button>
      </div>
    </div>
  )
}
