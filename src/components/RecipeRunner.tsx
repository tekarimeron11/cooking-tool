import { useState } from 'react'
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
  const hasIngredients = recipe.ingredients.length > 0
  const showIngredients = index === 0
  const [ingredientsOpen, setIngredientsOpen] = useState(true)

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

  return (
    <div className="panel run">
      <div className="panel-header run-header">
        <div className="run-title">
          <div className="recipe-icon large" aria-hidden="true">
            {iconForRecipe(recipe.title)}
          </div>
          <div>
            <h2>{recipe.title}</h2>
          <p className="subtle">
            ステップ {index + 1}/{recipe.steps.length}
          </p>
          </div>
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
