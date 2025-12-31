import { useEffect, useState } from 'react'
import type { Category, IngredientLine, Recipe, Step } from '../types'

type Props = {
  draft: Recipe
  categories: Category[]
  onTitleChange: (title: string) => void
  onCategoryChange: (categoryId: string) => void
  onImageUrlChange: (url: string) => void
  onIngredientNameChange: (ingredientId: string, name: string) => void
  onIngredientAmountChange: (ingredientId: string, amountText: string) => void
  onAddIngredient: () => void
  onDeleteIngredient: (ingredientId: string) => void
  onStepTitleChange: (stepId: string, title: string) => void
  onStepNoteChange: (stepId: string, note: string) => void
  onAddStep: () => void
  onDeleteStep: (stepId: string) => void
  onBulkImport: (ingredients: IngredientLine[], steps: Step[]) => void
  onSave: () => void
  onBack: () => void
}

export default function RecipeEditor({
  draft,
  categories,
  onTitleChange,
  onCategoryChange,
  onImageUrlChange,
  onIngredientNameChange,
  onIngredientAmountChange,
  onAddIngredient,
  onDeleteIngredient,
  onStepTitleChange,
  onStepNoteChange,
  onAddStep,
  onDeleteStep,
  onBulkImport,
  onSave,
  onBack,
}: Props) {
  const [pasteText, setPasteText] = useState('')

  useEffect(() => {
    setPasteText('')
  }, [draft.id])

  const uid = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const parsePaste = (text: string) => {
    const lines = text.split(/\r?\n/).map((line) => line.trim())
    let section: 'ingredients' | 'steps' | null = null
    const ingredients: IngredientLine[] = []
    const steps: Step[] = []
    const nutritionPattern =
      /(エネルギー|たんぱく質|タンパク質|脂質|炭水化物|食物繊維|kcal|kJ)/i

    for (const raw of lines) {
      if (!raw) continue
      if (nutritionPattern.test(raw)) continue
      if (/^【\s*材料\s*】/.test(raw)) {
        section = 'ingredients'
        continue
      }
      if (/^【\s*(作り方|手順|ステップ)\s*】/.test(raw)) {
        section = 'steps'
        continue
      }
      if (!section) {
        if (/^\s*[\d０-９]+(?:[.\uFF0E]\d+)?/.test(raw)) {
          section = 'steps'
        } else {
          continue
        }
      }

      if (section === 'ingredients') {
        const cleaned = raw.replace(/[・･\.\u30FB\u2026\uFF0E]+/g, ' ').replace(/\s+/g, ' ')
        const parts = cleaned.split(' ').filter(Boolean)
        if (parts.length === 0) continue
        const name = parts.shift() ?? ''
        const amountText = parts.join(' ')
        ingredients.push({
          id: uid(),
          name,
          amountText: amountText || '',
        })
      } else {
        const cleaned = raw
          .replace(/^\s*[\d０-９]+(?:[.\uFF0E]\d+)?[)\uFF09\-：:]?\s*/, '')
          .replace(/^\s*[-・●]\s*/, '')
          .trim()
        if (!cleaned) continue
        steps.push({ id: uid(), title: cleaned })
      }
    }

    return { ingredients, steps }
  }

  const handleImport = () => {
    const { ingredients, steps } = parsePaste(pasteText)
    if (ingredients.length === 0 && steps.length === 0) return
    const hasExisting =
      draft.ingredients.some((item) => item.name.trim() !== '') ||
      draft.steps.some((item) => item.title.trim() !== '')
    if (hasExisting) {
      const ok = window.confirm('現在の材料・ステップを上書きします。よろしいですか？')
      if (!ok) return
    }
    onBulkImport(ingredients, steps)
    setPasteText('')
  }

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
          className="input"
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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>画像URL（任意）</span>
        <input
          className="input"
          value={draft.imageUrl ?? ''}
          onChange={(event) => onImageUrlChange(event.target.value)}
          placeholder="https://example.com/recipe.jpg"
        />
      </label>

      <label className="field">
        <span>コピペ入力</span>
        <textarea
          className="input textarea"
          value={pasteText}
          onChange={(event) => setPasteText(event.target.value)}
          rows={6}
        />
        <button className="btn accent" type="button" onClick={handleImport}>
          材料・作り方を取り込む
        </button>
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
