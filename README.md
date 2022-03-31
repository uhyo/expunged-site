# 検閲されたウェブサイトを作る

## Getting Started

1. `.env.sample`を`.env`にコピーする
2. `npm run watch:normal`, `npm run watch:secret`, `npm run watch:worker` を並列に実行する。
3. http://localhost:8787/ を開くと検閲された文書が見られる。
4. http://localhost:8787/?token=eyJhbGciOiJIUzI1NiJ9.eyJjbGVhcmFuY2UiOjEsImlhdCI6MTY0ODczMDAxMH0.mcaVIDnwQa17R6syzc7MU-zOLyiWbGByZ7n2bsmkAg0 にアクセスすると検閲が解除される。

## Deployment

Cloudflare Pages にサイトをデプロイする。
Pages の設定画面だと環境変数に改行を含められないので、`SEPARATOR=,`も設定して`TEXTn`環境変数は`,`区切りにするといい。

次に Cloudflare Workers をデプロイする。 `wrangler.toml` をいい感じに書き換えて `npx wrangler puslish`する。さらに以下のコメントで `SECRET` 環境変数の値も入れる。

```
npx wrangler secret put SECRET
```
