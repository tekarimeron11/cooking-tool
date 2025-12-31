import type { Recipe } from '../types'

type Props = {
  draft: Recipe
  onTitleChange: (title: string) => void
  onStepTitleChange: (stepId: string, title: string) => void
  onStepNoteChange: (stepId: string, note: string) => void
  onAddStep: () => void
  onDeleteStep: (stepId: string) => void
  onSave: () => void
  onBack: () => void
}

export default function RecipeEditor({
  draft,
  onTitleChange,
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
          className="input"
          value={draft.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="例）野菜たっぷりミネストローネ"
        />
      </label>

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
