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
