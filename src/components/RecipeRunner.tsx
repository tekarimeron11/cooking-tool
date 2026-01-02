import { useEffect, useMemo, useState } from 'react'
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
  const [nextPulse, setNextPulse] = useState(false)
  const [finishPulse, setFinishPulse] = useState(false)
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: `confetti-${index}`,
        left: `${5 + (index * 90) / 17}%`,
        delay: `${(index % 6) * 0.06}s`,
        duration: `${0.7 + (index % 5) * 0.1}s`,
      })),
    [],
  )

  useEffect(() => {
    if (!nextPulse) return
    const timer = window.setTimeout(() => setNextPulse(false), 450)
    return () => window.clearTimeout(timer)
  }, [nextPulse])

  useEffect(() => {
    if (!finishPulse) return
    const timer = window.setTimeout(() => setFinishPulse(false), 900)
    return () => window.clearTimeout(timer)
  }, [finishPulse])

  const triggerNextPulse = () => {
    setNextPulse(false)
    requestAnimationFrame(() => setNextPulse(true))
  }

  const triggerFinishPulse = () => {
    setFinishPulse(false)
    requestAnimationFrame(() => setFinishPulse(true))
  }

  return (
    <div className="panel run">
      {finishPulse && (
        <div className="run-complete-overlay" aria-hidden="true">
          <div className="run-complete-badge">完成！</div>
          <div className="confetti">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  animationDuration: piece.duration,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="panel-header run-header">
        <div>
          <h2>{recipe.title}</h2>
          <p className="subtle">
            {isIngredientsScreen
              ? `材料（${hasIngredients ? recipe.ingredients.length : 0}件）`
              : `ステップ ${stepIndex + 1}/${recipe.steps.length}`}
          </p>
        </div>
      </div>

      {showIngredients && (
        <section className="run-ingredients">
          <div className="run-ingredients-header">
            <h3>材料</h3>
            <div className="run-ingredients-actions">
              <span className="subtle">{hasIngredients ? recipe.ingredients.length : 0} 件</span>
            </div>
          </div>
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
        </section>
      )}

      {!isIngredientsScreen && (
        <div className="run-card">
          <p className="run-step-label">ステップ</p>
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
            if (isLast) {
              triggerFinishPulse()
              setTimeout(() => onBack(), 2000)
              return
            }
            triggerNextPulse()
            onNext()
          }}
        >
          {isLast ? '完了' : '次へ'}
        </button>
      </div>
    </div>
  )
}
