import fs from "node:fs";
import path from "node:path";

export function readStaticPageBody(fileName: string) {
  const filePath = path.join(process.cwd(), fileName);
  const html = fs.readFileSync(filePath, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);

  if (!bodyMatch) {
    return html;
  }

  return bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, "");
}
