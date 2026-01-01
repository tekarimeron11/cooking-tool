import type { Category, Recipe } from '../types'

type Props = {
  draft: Recipe
  categories: Category[]
  onTitleChange: (title: string) => void
  onCategoryChange: (categoryId: string) => void
  onIngredientNameChange: (ingredientId: string, name: string) => void
  onIngredientAmountChange: (ingredientId: string, amountText: string) => void
  onAddIngredient: () => void
  onDeleteIngredient: (ingredientId: string) => void
  onStepTitleChange: (stepId: string, title: string) => void
  onStepNoteChange: (stepId: string, note: string) => void
  onAddStep: () => void
  onDeleteStep: (stepId: string) => void
  onSave: () => void
  onBack: () => void
}

export default function RecipeEditor({
  draft,
  categories,
  onTitleChange,
  onCategoryChange,
  onIngredientNameChange,
  onIngredientAmountChange,
  onAddIngredient,
  onDeleteIngredient,
  onStepTitleChange,
  onStepNoteChange,
  onAddStep,
  onDeleteStep,
  onSave,
  onBack,
}: Props) {

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>レシピ編集</h2>
          <p className="subtle">タイトルとステップを入力してください。</p>
        </div>
        <button className="btn ghost" onClick={onBack}>
          一覧へ戻る
        </button>
      </div>

      <label className="field">
        <span>レシピタイトル</span>
        <input
          className="input recipe-title-input"
          value={draft.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="例）野菜たっぷりミネストローネ"
        />
      </label>

      <label className="field">
        <span>カテゴリ</span>
        <select
          className="input"
          value={draft.categoryId}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories
            .filter((category) => category.name !== 'お気に入り')
            .map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="steps-header">
        <h3>材料</h3>
        <button className="btn accent" onClick={onAddIngredient}>
          材料追加
        </button>
      </div>

      <div className="ingredients-list">
        {draft.ingredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient-card">
            <input
              className="input"
              value={ingredient.name}
              onChange={(event) => onIngredientNameChange(ingredient.id, event.target.value)}
              placeholder="材料名"
            />
            <input
              className="input"
              value={ingredient.amountText ?? ''}
              onChange={(event) =>
                onIngredientAmountChange(ingredient.id, event.target.value)
              }
              placeholder="数量（任意）"
            />
            <button
              className="btn danger small"
              onClick={() => onDeleteIngredient(ingredient.id)}
            >
              削除
            </button>
          </div>
        ))}
      </div>

      <div className="steps-header">
        <h3>ステップ</h3>
        <button className="btn accent" onClick={onAddStep}>
          ステップ追加
        </button>
      </div>

      <div className="steps-list">
        {draft.steps.map((step, index) => (
          <div key={step.id} className="step-card">
            <div className="step-badge">{index + 1}</div>
            <div className="step-fields">
              <input
                className="input"
                value={step.title}
                onChange={(event) => onStepTitleChange(step.id, event.target.value)}
                placeholder="ステップのタイトル"
              />
              <textarea
                className="input textarea"
                value={step.note ?? ''}
                onChange={(event) => onStepNoteChange(step.id, event.target.value)}
                placeholder="メモ（任意）"
                rows={3}
              />
            </div>
            <button className="btn danger small" onClick={() => onDeleteStep(step.id)}>
              削除
            </button>
          </div>
        ))}
      </div>

      <div className="actions-row">
        <button className="btn primary" onClick={onSave}>
          保存して一覧へ
        </button>
      </div>
    </div>
  )
}
