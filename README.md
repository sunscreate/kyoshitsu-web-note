# 教室のウェブ手帖

小規模な教室のホームページ開設を支援する、静的な費用計算ツールと解説サイト。
Node.js 22でビルド・テスト可能。外部パッケージは不要。

```sh
npm run build
npm test
npm run preview
```

出力は `dist/`。Cloudflare Pagesの無料静的配信を使用予定。Functions・有料サービス・独自ドメインは使わない。
`content/settings.json` の `origin` と `public` は実際の公開先・公開状態に合わせる。
記事は `content/guides.mjs`、計算式は `assets/cost.mjs`、広告素材の運用は `ads/README.md` を参照。
計算初期値は仮の数値で、サービスの実価格ではない。

フィードバック：このリポジトリのIssues。個人情報・認証情報を投稿しないこと。
運営用データは `operations/` に保存し、Gitには含めない。
