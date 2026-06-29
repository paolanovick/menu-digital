const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const md = fs.readFileSync(path.join(__dirname, "MANUAL_CLIENTE.md"), "utf8");
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Manual de Uso - Menú Digital</title>
<style>
  @page { size: A4; margin: 22mm 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #2d2d2d;
    line-height: 1.65;
    font-size: 11pt;
    margin: 0;
  }
  h1 {
    color: #a83132;
    font-size: 26pt;
    border-bottom: 3px solid #a83132;
    padding-bottom: 8px;
    margin-top: 28px;
    page-break-after: avoid;
  }
  h2 {
    color: #a83132;
    font-size: 18pt;
    margin-top: 36px;
    border-bottom: 1px solid #e0c4c4;
    padding-bottom: 4px;
    page-break-after: avoid;
    page-break-before: auto;
  }
  h2:first-of-type { page-break-before: avoid; }
  h3 {
    color: #5b1a1b;
    font-size: 13pt;
    margin-top: 20px;
    page-break-after: avoid;
  }
  h4 {
    color: #5b1a1b;
    font-size: 11pt;
    margin-top: 14px;
    page-break-after: avoid;
  }
  p { margin: 8px 0; }
  ul, ol { margin: 8px 0 8px 0; padding-left: 24px; }
  li { margin: 4px 0; }
  strong { color: #1f1f1f; }
  code {
    background: #f4f0eb;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 9.5pt;
    color: #a83132;
  }
  pre {
    background: #f4f0eb;
    border-left: 4px solid #a83132;
    padding: 12px 16px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  pre code {
    background: transparent;
    padding: 0;
    color: #2d2d2d;
  }
  blockquote {
    border-left: 4px solid #d4a574;
    background: #fff8ef;
    padding: 10px 16px;
    margin: 12px 0;
    color: #5b3a1a;
    border-radius: 0 6px 6px 0;
    page-break-inside: avoid;
  }
  blockquote p { margin: 4px 0; }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 14px 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }
  th {
    background: #a83132;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
  }
  td {
    padding: 7px 10px;
    border-bottom: 1px solid #e8e8e8;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #faf7f2; }
  a { color: #a83132; text-decoration: none; }
  a:hover { text-decoration: underline; }
  hr {
    border: none;
    border-top: 1px solid #e0c4c4;
    margin: 28px 0;
  }
  /* Índice */
  h2:first-of-type + ol,
  h1 + ol {
    background: #faf7f2;
    padding: 18px 18px 18px 42px;
    border-radius: 8px;
    border-left: 4px solid #a83132;
  }
  /* Evitar cortes feos */
  table, pre, blockquote { page-break-inside: avoid; }
  h1, h2, h3, h4 { page-break-after: avoid; }
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "manual.html"), html, "utf8");
console.log("HTML generado: manual.html");
