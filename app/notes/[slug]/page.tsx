import { notFound } from "next/navigation";
import Link from "next/link";
import { loadNote, loadNotes } from "@/lib/notes";
import Markdown from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadNotes().map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = loadNote(slug);
  if (!note) notFound();

  return (
    <main className="fieldnote-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="1997–2097 home">
          <span className="wordmark-mark" aria-hidden="true">∿</span>
          <span>1997–2097</span>
        </Link>
        <div className="header-meta"><span>PUBLIC FIELD NOTE</span><span className="header-dot" aria-hidden="true" /><span>NOTE</span></div>
        <Link className="about-link" href="/">archive <span aria-hidden="true">↗</span></Link>
      </header>
      <article className="note-page">
        <header className="note-page-header">
          <div className="section-label">{note.date} / {note.place || "—"}</div>
          <h1 className="note-page-title">{note.title}</h1>
          <div className="note-page-meta"><span>{note.object || "—"}</span><span>{note.tags.join(" / ") || "—"}</span></div>
        </header>
        <div className="note-page-body">
          <Markdown source={note.body} />
        </div>
        <Link className="note-page-back" href="/">← 記録の連なりへ</Link>
      </article>
    </main>
  );
}
