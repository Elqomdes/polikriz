import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";

export async function exportPNG(node: HTMLElement, fileName: string, scale = 2) {
  const dataUrl = await toPng(node, { pixelRatio: scale, backgroundColor: "#ffffff" });
  triggerDownload(dataUrl, ensureExt(fileName, "png"));
}

export async function exportSVG(node: HTMLElement, fileName: string) {
  const dataUrl = await toSvg(node, { backgroundColor: "#ffffff" });
  triggerDownload(dataUrl, ensureExt(fileName, "svg"));
}

export async function exportPDF(node: HTMLElement, fileName: string, scale = 2) {
  const dataUrl = await toPng(node, { pixelRatio: scale, backgroundColor: "#ffffff" });
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  const pdf = new jsPDF({ orientation: img.width > img.height ? "l" : "p", unit: "pt", format: [img.width, img.height] });
  pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
  pdf.save(ensureExt(fileName, "pdf"));
}

export function exportCSV(rows: Array<Record<string, unknown>>, fileName: string) {
  if (!rows.length) {
    triggerDownload("data:text/csv;charset=utf-8,", ensureExt(fileName, "csv"));
    return;
  }
  const headers = Object.keys(rows[0]);
  const body = rows.map((r) => headers.map((h) => escapeCsv(r[h])).join(","));
  const csv = [headers.join(","), ...body].join("\n");
  const url = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  triggerDownload(url, ensureExt(fileName, "csv"));
}

function triggerDownload(dataUrl: string, fileName: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function ensureExt(name: string, ext: string) {
  return name.toLowerCase().endsWith(`.${ext}`) ? name : `${name}.${ext}`;
}

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}


