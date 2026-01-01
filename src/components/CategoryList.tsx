import { useState } from 'react'
import type { Category } from '../types'

type CategoryInfo = Category & { recipeCount: number }

type Props = {
  categories: CategoryInfo[]
  selectedId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
}

export default function CategoryList({
  categories,
  selectedId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}: Props) {
  const [name, setName] = useState('')
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const categoryImages: Record<string, string> = {
    お気に入り:
      'https://images.unsplash.com/photo-1560107138-db0b048ded90?auto=format&fit=crop&w=1200&q=80',
    お肉:
      'https://images.unsplash.com/photo-1546563730-63db5650a965?auto=format&fit=crop&w=1200&q=80',
    魚介:
      'https://images.unsplash.com/photo-1562009956-c5093f408a88?auto=format&fit=crop&w=1200&q=80',
    卵: 'https://cdn.pixabay.com/photo/2016/10/11/09/23/breakfast-1730921_1280.jpg',
    サラダ:
      'https://images.unsplash.com/photo-1742189570330-1950a68150e5?auto=format&fit=crop&w=1200&q=80',
    スープ:
      'https://images.unsplash.com/photo-1717815963777-0b0cdba0f8c4?auto=format&fit=crop&w=1200&q=80',
    ご飯物:
      'https://images.unsplash.com/photo-1659248085491-0cf89a8c89ee?auto=format&fit=crop&w=1200&q=80',
    麺: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=1200&q=80',
    お弁当: 'https://cdn.pixabay.com/photo/2022/02/11/07/03/bento-7006657_1280.jpg',
    パン:
      'https://images.unsplash.com/photo-1646406535566-5e35a8ca31c0?auto=format&fit=crop&w=1200&q=80',
    お菓子:
      'https://images.unsplash.com/photo-1668723906373-38cab52455d2?auto=format&fit=crop&w=1200&q=80',
    その他:
      'https://cdn.pixabay.com/photo/2021/01/01/21/56/cooking-5880136_1280.jpg',
  }

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
          <div key={category.id} className="category-item">
            <button
              type="button"
              className={`category-card ${selectedId === category.id ? 'selected' : ''}`}
              onClick={() => onSelect(category.id)}
            >
              <div className="category-card-media">
                <img
                  src={categoryImages[category.name] ?? categoryImages['その他']}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <div className="category-card-body">
                <span className="category-title">{category.name}</span>
                <span className="category-meta">{category.recipeCount} レシピ</span>
              </div>
              <div className="category-card-actions">
                {category.name !== 'お気に入り' && (
                  <button
                    type="button"
                    className="icon-btn small"
                    onClick={(event) => {
                      event.stopPropagation()
                      setMenuOpenId((prev) => (prev === category.id ? null : category.id))
                    }}
                    aria-label="カテゴリメニュー"
                  >
                    ⋯
                  </button>
                )}
              </div>
              {selectedId === category.id && <span className="badge">選択中</span>}
            </button>
            {menuOpenId === category.id && (
              <div className="category-menu">
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() => {
                    setMenuOpenId(null)
                    const nextName = window.prompt('新しいカテゴリ名を入力してください', category.name)
                    const trimmed = nextName?.trim()
                    if (trimmed && trimmed !== category.name) {
                      onRename(category.id, trimmed)
                    }
                  }}
                >
                  名前変更
                </button>
                <button
                  type="button"
                  className="btn danger small"
                  onClick={() => {
                    setMenuOpenId(null)
                    const ok = window.confirm('このカテゴリを削除しますか？')
                    if (ok) onDelete(category.id)
                  }}
                >
                  削除
                </button>
              </div>
            )}
          </div>
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
