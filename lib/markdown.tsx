import type { ReactNode } from "react";

type MarkdownProps = {
  source: string;
};

const safeUrlPattern = /^(?:https?:|mailto:|\/|#)/i;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function isSafeUrl(value: string): boolean {
  return safeUrlPattern.test(value.trim());
}

function inline(source: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let text = "";
  let key = 0;

  const flushText = () => {
    if (text) {
      nodes.push(text);
      text = "";
    }
  };

  while (source.length > 0) {
    if (source.startsWith("\\") && "`*{}[]()#+-.!_>".includes(source[1] ?? "")) {
      text += source[1];
      source = source.slice(2);
      continue;
    }

    const image = source.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+["']([^"']*)["'])?\)/);
    if (image) {
      flushText();
      const [, alt, url, title] = image;
      if (isSafeUrl(url)) {
        // Markdown image dimensions are content-defined, so Next Image cannot be used here.
        // eslint-disable-next-line @next/next/no-img-element
        nodes.push(<img key={key++} src={url} alt={alt} title={title} />);
      } else {
        nodes.push(image[0]);
      }
      source = source.slice(image[0].length);
      continue;
    }

    const link = source.match(/^\[([^\]]+)\]\((\S+?)(?:\s+["']([^"']*)["'])?\)/);
    if (link) {
      flushText();
      const [, label, url, title] = link;
      nodes.push(
        isSafeUrl(url) ? (
          <a key={key++} href={url} title={title} rel={/^https?:/i.test(url) ? "noreferrer" : undefined}>
            {inline(label)}
          </a>
        ) : link[0],
      );
      source = source.slice(link[0].length);
      continue;
    }

    const code = source.match(/^`([^`]+)`/);
    if (code) {
      flushText();
      nodes.push(<code key={key++}>{code[1]}</code>);
      source = source.slice(code[0].length);
      continue;
    }

    const strong = source.match(/^(\*\*|__)(.+?)\1/);
    if (strong) {
      flushText();
      nodes.push(<strong key={key++}>{inline(strong[2])}</strong>);
      source = source.slice(strong[0].length);
      continue;
    }

    const strike = source.match(/^~~(.+?)~~/);
    if (strike) {
      flushText();
      nodes.push(<del key={key++}>{inline(strike[1])}</del>);
      source = source.slice(strike[0].length);
      continue;
    }

    const emphasis = source.match(/^(\*|_)([^*_\n]+?)\1/);
    if (emphasis) {
      flushText();
      nodes.push(<em key={key++}>{inline(emphasis[2])}</em>);
      source = source.slice(emphasis[0].length);
      continue;
    }

    if (source.startsWith("  \n")) {
      flushText();
      nodes.push(<br key={key++} />);
      source = source.slice(3);
      continue;
    }

    text += source[0];
    source = source.slice(1);
  }

  flushText();
  return nodes;
}

function isUnorderedItem(line: string): boolean {
  return /^ {0,3}[-+*]\s+/.test(line);
}

function isOrderedItem(line: string): boolean {
  return /^ {0,3}\d+[.)]\s+/.test(line);
}

function isBlockStart(line: string): boolean {
  return (
    /^ {0,3}#{1,6}\s+/.test(line) ||
    /^ {0,3}```/.test(line) ||
    /^ {0,3}~~~/.test(line) ||
    /^ {0,3}>/.test(line) ||
    isUnorderedItem(line) ||
    isOrderedItem(line) ||
    /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)
  );
}

function renderBlocks(source: string): ReactNode[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1;
      continue;
    }

    const compactFence = lines[index].match(/^ {0,3}(```+|~~~+)([^\s]*)\s+(.+?)\s+\1\s*$/);
    if (compactFence) {
      const [, , language, code] = compactFence;
      blocks.push(
        <pre key={key++}>
          <code className={language ? `language-${language}` : undefined}>{code}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    const fence = lines[index].match(/^ {0,3}(```+|~~~+)\s*([^\s]*)\s*$/);
    if (fence) {
      const [, marker, language] = fence;
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !new RegExp(`^ {0,3}${marker[0]}{${marker.length},}\\s*$`).test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(
        <pre key={key++}>
          <code className={language ? `language-${language}` : undefined}>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const heading = lines[index].match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length;
      const Heading = `h${level}` as HeadingTag;
      blocks.push(<Heading key={key++}>{inline(heading[2])}</Heading>);
      index += 1;
      continue;
    }

    if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(lines[index])) {
      blocks.push(<hr key={key++} />);
      index += 1;
      continue;
    }

    if (/^ {0,3}>/.test(lines[index])) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^ {0,3}>/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^ {0,3}> ?/, ""));
        index += 1;
      }
      blocks.push(<blockquote key={key++}>{renderBlocks(quoteLines.join("\n"))}</blockquote>);
      continue;
    }

    if (isUnorderedItem(lines[index]) || isOrderedItem(lines[index])) {
      const ordered = isOrderedItem(lines[index]);
      const items: ReactNode[] = [];
      while (index < lines.length && (ordered ? isOrderedItem(lines[index]) : isUnorderedItem(lines[index]))) {
        const item = lines[index].replace(ordered ? /^ {0,3}\d+[.)]\s+/ : /^ {0,3}[-+*]\s+/, "");
        items.push(<li key={items.length}>{inline(item)}</li>);
        index += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={key++}>{items}</List>);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length > 0) {
      blocks.push(<p key={key++}>{inline(paragraph.join(" "))}</p>);
    }
  }

  return blocks;
}

export default function Markdown({ source }: MarkdownProps) {
  return <>{renderBlocks(source)}</>;
}
