export function addTextToPDF(
  doc: any,
  text: any,
  x: any,
  y: any,
  maxWidth: any
) {
  // Split the text into lines
  const lines = doc.splitTextToSize(text, maxWidth);

  // Add lines to the document
  doc.text(lines, x, y);
}
