export function extractHtmlSection(html: string, startMarker: string, endMarker: string, occurrence = 1) {
  let searchFrom = 0;
  let startIndex = -1;

  for (let index = 0; index < occurrence; index += 1) {
    startIndex = html.indexOf(startMarker, searchFrom);
    if (startIndex < 0) {
      return "";
    }
    searchFrom = startIndex + startMarker.length;
  }

  const endIndex = html.indexOf(endMarker, searchFrom);

  if (endIndex < 0) {
    return html.slice(startIndex);
  }

  return html.slice(startIndex, endIndex + endMarker.length);
}
