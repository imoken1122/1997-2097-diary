---
title: 'Ivan Sutherland — “Sketchpad” (1963)'
date: "2026-08-22"
place: ""
object: "HCI・知性増強"
tags: ["hci", "sketchpad", "cad", "graphics"]
excerpt: "Sketchpadが図形を制約と階層構造を持つデータとして扱った仕組みと限界を整理する。"
tone: "tone-night"
published: true
---

# Ivan Sutherland — “Sketchpad: A Man-Machine Graphical Communication System” (1963)

### Takeaway

Sketchpadの本質は、画面上に線を描けたことではなく、図を「制約・接続関係・階層構造を持ち、操作と計算ができるデータ」として表現したことにある。対話型CG、CAD、制約ベース設計、視覚的プログラミングの原型を示した。

### 1. どんなもの？

MIT Lincoln LaboratoryのTX-2上で動作する対話型グラフィックスシステム。利用者はCRT画面へライトペンで線分や円弧を描き、図形を指して移動・削除・複製する。図形だけでなく、接続関係、幾何制約、再利用可能な記号も扱った（Abstract、Chapter I、原論文pp.8–23）。

### 2. 先行研究と比べてどこがすごい？

ディスプレイやライトペン自体は既に存在したが、Sketchpadは点・線・部品間のトポロジー、幾何制約、master–instance、階層、定義変更の伝播を永続的に保存した。図形を表示・入力する装置から、図の意味と関係を操作するシステムへ進んだ点が重要である（Chapter II、pp.24–33）。

### 3. 技術や手法のキモはどこ？

- **Pseudo pen location:** ペン位置を最も近い線、円、端点、交点へ補正
- **Ring structure:** 点、線、制約、参照関係を双方向にたどれるデータ構造
- **Master–instance:** 共通定義を参照する再利用可能な部品と階層
- **Constraint solving:** 誤差関数、局所線形化、最小二乗、relaxation、one-pass法

設計思想は「正確に入力する」ではなく、「粗く描き、条件を与え、システムが整形する」である（Chapters III–VIII、pp.34–119）。

### 4. どうやって有効だと検証した？

TX-2上の実装、操作デモ、応用例で検証した。

- 約900個の六角形を約30分で生成。製図部門の見積もりは約2日
- 三節リンク機構を約5分で構築
- 6ベイのトラス橋を10分未満で作図し、荷重変更後の再計算は約30秒
- 約40トランジスタの回路図は10時間でも完成せず、手描きの方がよいと判断

成功例だけでなく失敗例も示したが、統制されたユーザー実験や統計的比較ではない（Chapter IX、pp.120–138）。

### 5. 議論はある？

- 2次元に限定され、扱える曲線は主に線分と円弧
- 複雑な制約系ではrelaxationが遅い
- one-pass法を使えない問題がある
- ライトペン追跡が計算時間の約10%を消費
- 複雑な図では表示速度とちらつきが問題
- 部品ライブラリを事前作成するコストが大きい
- TX-2、作者の熟練、事前作成済み部品への依存が強い

### 6. 次に読むべき論文は？

1. H. H. Loomis Jr., “Graphical Manipulation Techniques Using the Lincoln TX-2 Computer” (1960) — Sketchpad直前の技術
2. Timothy E. Johnson, “Sketchpad III” (1964) — 3次元化の直接的後続
3. Lawrence G. Roberts, “Machine Perception of Three-Dimensional Solids” (1963) — 3次元構造認識への展開
4. David C. Smith, “Pygmalion” (1975) — 視覚的プログラミングへの展開

### Sources

- [Cambridge公開版全文PDF](https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-574.pdf)
- [ACM DOI](https://doi.org/10.1145/1461551.1461591)
- [TX-2資料一覧](https://tx-2.github.io/documentation/)

**原典図版候補：Figure 1.5 “Illustrative Example / Hexagonal pattern construction”（原論文p.15、公開PDF pp.22–23付近）。** ライトペン操作、制約、再利用、階層構造を一図で説明できる。
