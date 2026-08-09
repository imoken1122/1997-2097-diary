import fs from "node:fs";
import path from "node:path";
import type { NoteSummary } from "@/app/fieldnote-home";

const notesDirectory = path.join(process.cwd(), "content", "notes");

export function loadNotes(): NoteSummary[] {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory)
    .filter((filename) => filename.endsWith(".md") && !filename.startsWith("_"))
    .map((filename) => parseNote(filename))
    .filter((note): note is NoteSummary => note !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((note, index) => ({ ...note, index: String(index + 1).padStart(2, "0") }));
}

function parseNote(filename: string): NoteSummary | null {
  const source = fs.readFileSync(path.join(notesDirectory, filename), "utf8");
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return null;

  const fields = parseFrontmatter(match[1]);
  if (!fields.title || fields.published === "false") return null;

  const body = match[2].trim();
  const excerpt = fields.excerpt || body.split(/\n\s*\n/)[0] || "";
  const date = fields.date || "";

  return {
    slug: filename.replace(/\.md$/, ""),
    date,
    year: date.slice(0, 4),
    title: fields.title,
    excerpt,
    tags: parseTags(fields.tags),
    place: fields.place || "",
    object: fields.object || "",
    tone: fields.tone || "tone-night",
    index: "",
  };
}

function parseFrontmatter(source: string): Record<string, string> {
  return Object.fromEntries(
    source
      .split("\n")
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map(([, key, value]) => [key, value.trim().replace(/^['"]|['"]$/g, "")]),
  );
}

function parseTags(value = ""): string[] {
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}
