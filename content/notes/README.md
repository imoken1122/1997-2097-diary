# 記事の追加

`_template.md` をコピーして、同じフォルダに `YYYY-MM-DD-slug.md` を作る。

1. frontmatter の `title` と `date` を入れる
2. `place`、`object`、`tags`、`excerpt` を必要に応じて入れる
3. `published: true` にする
4. `---` の下に本文を書く

保存すると、トップの時系列に自動で追加される。`published: false` の下書きは表示されない。

タイトルをクリックすると、`/notes/slug` の本文ページが開く。
