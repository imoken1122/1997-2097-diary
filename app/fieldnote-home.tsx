"use client";

import { useMemo, useState } from "react";

type Axis = "TIME" | "PLACE" | "SEQUENCE" | "OBJECT";

export type NoteSummary = {
  slug: string;
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

const axisLabels: Record<Axis, string> = {
  TIME: "時間から読む",
  PLACE: "場所から読む",
  SEQUENCE: "連なりから読む",
  OBJECT: "対象から読む",
};

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const aboutParagraphs = [
  "1997年に生まれた。2097年は、その100年後。",
  "別に100歳まで生きるつもりで付けたわけではない。ただ、自分の人生を100年くらいの時間軸に置いてみたら、少し見え方が変わる気がした。",
  "自分が生きているこの時代は、いったい何なんだろうと思う。",
  "インターネットが当たり前になって、AIが急速に発展して、社会も街もずいぶん変わっていく。一方で、何百年も前の建物がまだ残っていたり、夏になればセミが鳴いていたりする。",
  "その中に、たまたま自分もいる。",
  "だったら、この時代に自分は何を見るんだろう。何を面白いと思うんだろう。何を調べて、何を試すんだろう。",
  "そういうものを残しておこうと思った。",
  "AIのことを書くかもしれない。生き物のことかもしれない。街を歩いていて見つけたものかもしれないし、本を読んで考えたことかもしれない。",
  "たぶん、かなりバラバラになる。",
  "でも、それでいい気がしている。",
  "最初から意味のあるものだけを選ぼうとすると、結局何も残らない。今はどうでもよく見えることが、何年か後に別の何かとつながるかもしれないし、結局何にもならないかもしれない。",
  "それは後にならないと分からない。",
  "ただ、思いついたことだけを並べたいわけでもない。",
  "何かが気になったら、それまでに誰が同じようなことを考えてきたのかを調べたい。実際に見られるものなら見に行きたい。試せるものなら試してみたい。",
  "そうやって一つずつ辿っていけば、あとから何かの線が見えてくるかもしれない。",
  "人生をきれいな物語にすることには、あまり興味がない。",
  "そのとき何を見て、何を考えて、そこからどこへ行ったのか。",
  "そのシークエンスだけ残っていればいい。",
  "2097年に何があるのかは知らない。",
  "自分がそこにいるかどうかも分からない。",
  "とりあえず1997から始まった時間の続きを、ここに置いていく。",
];

export default function FieldnoteHome({ notes }: { notes: NoteSummary[] }) {
  const [activeAxis, setActiveAxis] = useState<Axis>("TIME");
  const visibleNotes = useMemo(() => notes, [notes]);

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
        <a className="about-link" href="#about">about ↘</a>
      </header>

      <section className="intro" id="top">
        <h1>1997–2097</h1>
        <div className="intro-bottom">
          <div className="intro-coordinate" aria-label="current coordinate">
            <span>NOW</span>
            <strong>2026.08.09</strong>
            <span>35°41′N / 139°41′E</span>
          </div>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-mark">ABOUT<br />1997–2097</div>
        <div className="about-text">
          <h2 className="about-lede" id="about-title">1997–2097</h2>
          <div className="about-copy">
            {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="about-foot">PUBLIC FIELD NOTE<br />TIME / OBSERVATION / SEQUENCE</div>
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
          <span className="axis-caption-line" aria-hidden="true" />
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
          {visibleNotes.length > 0 ? visibleNotes.map((note) => (
            <article className="note-row" key={note.index}>
              <div className="note-date"><span>{note.year}</span><time>{note.date.slice(5)}</time></div>
              <div className={`note-thumb ${note.tone}`} aria-hidden="true"><span>{note.index}</span></div>
              <div className="note-body">
                <div className="note-tags">{note.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <h3><a href={`${siteBasePath}/notes/${note.slug}/`}>{note.title}</a></h3>
                <p>{note.excerpt}</p>
              </div>
              <div className="note-place"><span>{note.place}</span><span>{note.object}</span></div>
              <span className="note-arrow" aria-hidden="true">↗</span>
            </article>
          )) : <div className="empty-state">NO RECORDS</div>}
        </div>
      </section>

      <footer className="site-footer">
        <span>1997–2097 / PUBLIC FIELD NOTE</span>
        <a href="#top">↑ top</a>
      </footer>
    </main>
  );
}
