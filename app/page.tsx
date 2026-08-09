"use client";

import { useMemo, useState } from "react";

type Axis = "TIME" | "PLACE" | "SEQUENCE" | "OBJECT";

type Note = {
  date: string;
  year: string;
  title: string;
  excerpt: string;
  tags: string[];
  place: string;
  object: string;
  tone: string;
  index: string;
};

const axes: Axis[] = ["TIME", "PLACE", "SEQUENCE", "OBJECT"];

const notes: Note[] = [
  {
    date: "2026.08.09",
    year: "2026",
    title: "借景と時間",
    excerpt:
      "窓の向こうにあるものを、風景ではなく時間の厚みとして見る。見えているのは今ではなく、積もった今だ。",
    tags: ["観察", "思想"],
    place: "自室 / 東京",
    object: "窓・光",
    tone: "tone-sand",
    index: "01",
  },
  {
    date: "2026.08.15",
    year: "2026",
    title: "アリは世界をどう切っているか",
    excerpt:
      "一匹のアリが選ぶ経路は、こちらが地図と呼ぶものよりずっと局所的で、ずっと正確だった。",
    tags: ["昆虫", "実験"],
    place: "善福寺公園 / 東京",
    object: "アリ・経路",
    tone: "tone-moss",
    index: "02",
  },
  {
    date: "2026.09.03",
    year: "2026",
    title: "商品属性と世界の離散化",
    excerpt:
      "商品を分類するたび、世界は少しだけ扱いやすくなり、同じだけこぼれ落ちる。属性は名前ではなく境界線だ。",
    tags: ["AI", "記述"],
    place: "研究室 / オンライン",
    object: "商品・分類",
    tone: "tone-ink",
    index: "03",
  },
  {
    date: "2027.04.18",
    year: "2027",
    title: "大阪城の都市生態",
    excerpt:
      "石垣は動かない。でも、その周囲だけが毎年少しずつ別の生態系になる。都市は固定物のふりをした季節だ。",
    tags: ["都市", "写真"],
    place: "大阪城公園 / 大阪",
    object: "石垣・鳥",
    tone: "tone-stone",
    index: "04",
  },
  {
    date: "2034.11.02",
    year: "2034",
    title: "まだ名前のない道具について",
    excerpt:
      "使い方を決める前の道具は、用途ではなく可能性のかたちをしている。記録はその余白を守るためにある。",
    tags: ["道具", "未来"],
    place: "未定義の場所",
    object: "道具・手",
    tone: "tone-copper",
    index: "05",
  },
];

const axisLabels: Record<Axis, string> = {
  TIME: "時間から読む",
  PLACE: "場所から読む",
  SEQUENCE: "連なりから読む",
  OBJECT: "対象から読む",
};

export default function Home() {
  const [activeAxis, setActiveAxis] = useState<Axis>("TIME");
  const [showAll, setShowAll] = useState(false);

  const visibleNotes = useMemo(() => {
    if (showAll) return notes;
    return notes.slice(0, 4);
  }, [showAll]);

  return (
    <main className="fieldnote-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="1997–2097 home">
          <span className="wordmark-mark" aria-hidden="true">∿</span>
          <span>1997–2097</span>
        </a>
        <div className="header-meta">
          <span>PUBLIC FIELD NOTE</span>
          <span className="header-dot" aria-hidden="true" />
          <span>VOL. 01 / 2026—</span>
        </div>
        <a className="about-link" href="#about">about <span aria-hidden="true">↗</span></a>
      </header>

      <section className="intro" id="top">
        <div className="intro-kicker">A record of looking closely</div>
        <h1>
          まだ名前のないものを、<br />
          <em>時間の中に置いておく。</em>
        </h1>
        <div className="intro-bottom">
          <p>
            技術、観察、写真、思想、昆虫、都市、AI、実験。<br />
            ばらばらに見えるものを、ひとつの時系列として記録する。
          </p>
          <div className="intro-coordinate" aria-label="current coordinate">
            <span>NOW</span>
            <strong>2026.08.09</strong>
            <span>35°41′N / 139°41′E</span>
          </div>
        </div>
      </section>

      <section className="axis-panel" aria-labelledby="axis-title">
        <div className="section-label" id="axis-title">READ THE ARCHIVE</div>
        <div className="axis-tabs" role="tablist" aria-label="Archive views">
          {axes.map((axis) => (
            <button
              key={axis}
              className={`axis-tab ${activeAxis === axis ? "is-active" : ""}`}
              onClick={() => setActiveAxis(axis)}
              role="tab"
              aria-selected={activeAxis === axis}
            >
              <span>{axis}</span>
              <small>{axisLabels[axis]}</small>
            </button>
          ))}
        </div>
        <div className="axis-caption">
          <span className="axis-caption-index">0{axes.indexOf(activeAxis) + 1}</span>
          <p>{axisLabels[activeAxis]}。記録は、ひとつの入口から始めてもいい。</p>
          <span className="axis-caption-line" aria-hidden="true" />
        </div>
      </section>

      <section className="featured-note" aria-labelledby="featured-title">
        <div className="featured-visual tone-night" aria-label="abstract photograph of a window at night">
          <span className="visual-coordinate">35°41′N<br />139°41′E</span>
          <span className="visual-scratch scratch-one" />
          <span className="visual-scratch scratch-two" />
          <span className="visual-caption">FIG. 001 — WINDOW / 23:14</span>
        </div>
        <div className="featured-copy">
          <div className="note-meta"><span>NOTE 001</span><span>2026.08.09</span></div>
          <h2 id="featured-title">借景と時間</h2>
          <p>
            窓の向こうにあるものを、風景ではなく時間の厚みとして見る。見えているのは今ではなく、積もった今だ。
          </p>
          <div className="note-details">
            <span>自室 / 東京</span>
            <span>観察・思想</span>
          </div>
          <a className="read-link" href="#archive">読む <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="archive" id="archive" aria-labelledby="archive-title">
        <div className="archive-heading">
          <div>
            <div className="section-label">SEQUENCE / ALL NOTES</div>
            <h2 id="archive-title">記録の連なり</h2>
          </div>
          <div className="archive-count">{String(notes.length).padStart(2, "0")} records</div>
        </div>

        <div className="timeline" aria-label="field note timeline">
          {visibleNotes.map((note) => (
            <article className="note-row" key={note.index}>
              <div className="note-date"><span>{note.year}</span><time>{note.date.slice(5)}</time></div>
              <div className={`note-thumb ${note.tone}`} aria-hidden="true"><span>{note.index}</span></div>
              <div className="note-body">
                <div className="note-tags">{note.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <h3>{note.title}</h3>
                <p>{note.excerpt}</p>
              </div>
              <div className="note-place"><span>{note.place}</span><span>{note.object}</span></div>
              <span className="note-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <button className="load-more" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "記録をたたむ" : "すべての記録を見る"} <span aria-hidden="true">{showAll ? "↥" : "↘"}</span>
        </button>
      </section>

      <section className="about" id="about">
        <div className="about-mark" aria-hidden="true">1997<br />—<br />2097</div>
        <div>
          <div className="section-label">ABOUT THIS ARCHIVE</div>
          <p className="about-lede">これは、完成した自分を見せる場所ではなく、変わっていく途中を残す場所。</p>
          <p className="about-copy">一日ひとつでも、一年にひとつでも。観察したもの、つくったもの、考えたことを、時間の流れに戻しておく。Gitの履歴が、昨日とは違う自分を律儀に覚えている。</p>
        </div>
        <div className="about-foot">更新は不定期<br />次の記録を待つ</div>
      </section>

      <footer className="site-footer">
        <span>1997–2097 / PUBLIC FIELD NOTE</span>
        <span>made to be continued</span>
        <a href="#top">↑ top</a>
      </footer>
    </main>
  );
}
