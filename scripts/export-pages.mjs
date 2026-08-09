import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = process.env.EXPORT_ORIGIN ?? "http://127.0.0.1:4173";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/1997-2097-diary";
const outputDir = path.resolve(process.env.PAGES_OUTPUT ?? "dist/client");

async function fetchPage(route) {
  const url = `${origin}${basePath}${route}`;
  let lastError;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.text();
      if (response.status !== 404) throw new Error(`Failed to export ${url}: ${response.status}`);
      lastError = new Error(`Failed to export ${url}: 404`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw lastError;
}

const rootHtml = await fetchPage("/");
if (!rootHtml.includes("1997–2097 — Public Field Note")) {
  throw new Error("The production server did not return the field note site.");
}
await writeFile(path.join(outputDir, "index.html"), rootHtml);

const files = await readdir(path.join(process.cwd(), "content", "notes"));
const publishedSlugs = [];
for (const filename of files) {
  if (!filename.endsWith(".md") || filename.startsWith("_")) continue;
  const source = await readFile(path.join(process.cwd(), "content", "notes", filename), "utf8");
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/i)?.[1];
  if (!frontmatter || !/^title:\s*.+$/im.test(frontmatter)) continue;
  if (/^published:\s*false\s*$/im.test(frontmatter)) continue;
  publishedSlugs.push(filename.replace(/\.md$/, ""));
}

for (const slug of publishedSlugs) {
  const html = await fetchPage(`/notes/${slug}/`);
  const pageDir = path.join(outputDir, "notes", slug);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, "index.html"), html);
}

// Public assets are emitted at the artifact root, while basePath URLs resolve
// under /1997-2097-diary on GitHub Pages. Mirror them into that URL prefix.
const prefixedAssetDir = path.join(outputDir, basePath.replace(/^\//, ""));
await mkdir(prefixedAssetDir, { recursive: true });
for (const filename of ["favicon.svg", "night-field.png", "og.png", "file.svg", "globe.svg", "window.svg"]) {
  await cp(path.join(outputDir, filename), path.join(prefixedAssetDir, filename), { force: true });
}

console.log(`Exported / and ${publishedSlugs.length} note page(s) to ${outputDir}`);
