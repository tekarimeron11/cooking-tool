# 料理レシピ管理 + 実行モード（MVP）

料理レシピ（材料 + 複数ステップ）を保存し、実行モードで
材料一覧 → ステップを1つずつ大きく表示するWebアプリです。

## できること
- レシピの作成 / 編集 / 削除 / 保存（材料・ステップ対応）
- カテゴリの作成 / 編集 / 削除
- お気に入り登録
- 検索・並び替え（追加順 / 通常）
- 実行モードで材料一覧 → ステップを順番に表示
- 最終ステップで「完了」演出（紙吹雪）
- localStorage 永続化

## 画面
- レシピ一覧（全件）
- カテゴリ別レシピ一覧
- レシピ編集
- 実行モード

## 技術スタック
- React + TypeScript
- Vite
- 状態管理: useReducer
- 追加ライブラリなし
- Firebase Authentication（Googleログイン）
- Firestore（ユーザーごとの同期）

## セットアップ
```powershell
npm install
npm run dev
```

## ビルド
```powershell
npm run build
npm run preview
```

## データ保存
- localStorage キー: `recipe-mvp.v1`
- 初回はサンプルデータを投入（オリジナルレシピ）
- ログイン時は Firestore と同期

## メモ
- プライベートブラウズでは localStorage が消えることがあります
- オフラインでも動作します（初回ロードと外部フォント取得は除く）
