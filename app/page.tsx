import FieldnoteHome from "./fieldnote-home";
import { loadNotes } from "@/lib/notes";

export default function Home() {
  return <FieldnoteHome notes={loadNotes()} />;
}
