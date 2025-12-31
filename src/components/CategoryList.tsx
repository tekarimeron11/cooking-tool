import { useState } from 'react'
import type { Category } from '../types'

type CategoryInfo = Category & { recipeCount: number }

type Props = {
  categories: CategoryInfo[]
  selectedId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
}

export default function CategoryList({ categories, selectedId, onSelect, onCreate }: Props) {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onCreate(trimmed)
    setName('')
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>カテゴリ一覧</h2>
          <p className="subtle">フォルダを選ぶと、そのカテゴリのレシピ一覧へ移動します。</p>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`category-card ${selectedId === category.id ? 'selected' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            <div>
              <span className="category-title">{category.name}</span>
              <span className="category-meta">{category.recipeCount} レシピ</span>
            </div>
            {selectedId === category.id && <span className="badge">選択中</span>}
          </button>
        ))}
      </div>

      <div className="divider" />

      <div className="category-create">
        <input
          className="input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="新しいカテゴリ名"
        />
        <button className="btn primary" onClick={handleSubmit}>
          追加
        </button>
      </div>
    </div>
  )
}
