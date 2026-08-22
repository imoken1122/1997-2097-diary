---
title: 'J. C. R. Licklider — “Man-Computer Symbiosis” (1960)'
date: "2026-08-22"
place: ""
object: "HCI・知性増強"
tags: ["hci", "symbiosis", "time-sharing", "memory"]
excerpt: "人間と計算機の役割分担を、リアルタイム協働の設計原理として提示したLickliderの構想を読む。"
tone: "tone-night"
published: true
---

# J. C. R. Licklider — “Man-Computer Symbiosis” (1960)

### Takeaway

人間が目標設定・仮説形成・評価を担い、計算機が検索・計算・変換・シミュレーションを担う協働関係を提案した。個別アルゴリズムではなく、人間と計算機の認知的な役割分担を研究課題として定義した点に核心がある。

### 1. どんなもの？

既に定式化された問題を解くだけでなく、問題を定式化する思考とリアルタイム判断に計算機を参加させる研究構想。人間は目標、動機、仮説、モデル、評価基準を担当し、計算機はモデル化、データ照合、シミュレーション、グラフ作成、統計評価を担当する（§2、§4、pp.5–7）。

### 2. 先行研究と比べてどこがすごい？

人間の腕や眼を延長する “mechanically extended man” や、完全自動化できなかった部分だけを人間が担当する半自動システムとは異なり、異質な能力を持つ人間と計算機が相互補完する第三の設計原理を提示した（§1.2、pp.4–5）。

### 3. 技術や手法のキモはどこ？

- **Time-sharing:** 高価な大型計算機を複数人で共有し、リアルタイム対話を可能にする
- **Memory:** 大容量・永続記憶、published/read-only memory
- **Retrieval:** 名前だけでなくパターンでも検索するtrie型構造
- **Language:** 詳細な手順指定から目標指向の命令へ
- **I/O:** desk-surface display、wall display、手書き、音声認識・合成

共生にはCPU性能だけでなく、資源共有、知識構造、言語、低遅延I/Oを一体で設計する必要がある（§5.1–5.5、pp.7–10）。

### 4. どうやって有効だと検証した？

共生システム全体の実装や評価はない。主な動機は著者一人を対象にした非公式なtime-and-motion分析で、思考時間の約85%が情報探索、計算、作図、データ変換などの準備に使われたと報告した（§3.1、pp.5–6）。これは問題設定の根拠であり、共生システムの有効性の証明ではない。

### 5. 議論はある？

- 85%という数値は著者一人の自己観察で、外部妥当性が低い
- 対象タスク、比較条件、正確さ、判断品質などの評価指標が未定義
- 人間言語と計算機言語の不一致が大きな障害
- 当時の記憶装置、表示、入力手段は未成熟
- 一般利用者、アクセシビリティ、誤判断時の責任や権限配分は十分扱われない

### 6. 次に読むべき論文は？

1. Vannevar Bush, “As We May Think” (1945) — 連想的検索と個人知識装置の前史
2. Corbató et al., “An Experimental Time-Sharing System” (1962) — time-sharingをCTSSとして実装
3. Douglas Engelbart, *Augmenting Human Intellect* (1962) — 人間・道具・言語・方法を含むシステムへ
4. Licklider & Taylor, “The Computer as a Communication Device” (1968) — 個人との共生をネットワーク共同作業へ拡張

### Sources

- [Columbia公開全文](https://www.columbia.edu/~jrh29/licklider/man-computer_symbiosis.html)
- [公開スキャンPDF](https://worrydream.com/refs/Licklider_1960_-_Man-Computer_Symbiosis.pdf)
- [IEEE DOI](https://doi.org/10.1109/THFE2.1960.4503259)

**原典図版候補：なし。** 本文に図番号付きの写真・概念図はない。
