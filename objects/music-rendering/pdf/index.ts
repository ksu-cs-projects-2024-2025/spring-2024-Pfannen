import { PDFDocument, PageSizes, StandardFonts } from "pdf-lib";
import { MeasureRenderer } from "../measure-renderer";
import { Music } from "@/objects/music/readonly-music";
import { Measure, Note } from "@/components/providers/music/types";
import { PDFLibDrawingCanvasManager } from "../drawing-canvas/pdf-lib-drawing-canvas/manager";
import { PageDimensionParams } from "../music-layout/page-dimension-params";
import { MusicLayout } from "../music-layout";
import { Measurements } from "@/objects/measurement/measurements";
import { ABOVE_BELOW_CT, BODY_CT } from "@/objects/measurement/constants";

export const drawPDF = async () => {
  const pdfLibManager = new PDFLibDrawingCanvasManager(PageSizes.A4);
  await pdfLibManager.initializeCanvas();
  const music = new Music();
  const measures: Measure[] = [];
  measures.push({ notes: increasingDown });
  measures.push({ notes: increasingUp });
  measures.push({ notes: decreasingDown });
  measures.push({ notes: decreasingUp });
  measures.push({ notes: constantUp });
  measures.push({ notes: constantDown });
  measures.push({ notes: nonOrderedUp });
  measures.push({ notes: nonOrderedDown });
  measures.push({ notes: [] });
  const pageParams = PageDimensionParams.genericSheetMusic(3);
  const dimensions = MusicLayout.getDimensions(pageParams);
  const measurements = new Measurements(ABOVE_BELOW_CT, BODY_CT, 3);
  music.setMeasures(measures);
  const renderer = new MeasureRenderer(
    measures,
    dimensions,
    pdfLibManager.getBeatCanvasForPage.bind(pdfLibManager),
    measurements,
    BODY_CT
  );
  renderer.render();

  return await pdfLibManager.getPDF()!.save();

  // const pdfDoc = await PDFDocument.create();
  // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  // pdfDoc.addPage([400, 400]);
  // const page = pdfDoc.getPage(0);
  // page.drawCircle({
  //   x: 200,
  //   y: 200,
  //   size: 5,
  // });
  // page.drawText("This is test text", {
  //   x: 200,
  //   y: 200,
  //   size: 24,
  //   font: helveticaFont,
  // });

  // return pdfDoc.save();
};

export const pdfToUrl = (pdf: Uint8Array) => {
  const pdfArray: number[] = [];
  pdf.forEach((byte) => pdfArray.push(byte));
  const base64 = btoa(String.fromCharCode(...pdfArray));
  return `data:application/pdf;base64,${base64}`;
};

const increasingDown: Note[] = [
  { x: 0, y: -2, type: "sixteenth" },
  { x: 0.25, y: -1, type: "sixteenth" },
  { x: 0.5, y: 4, type: "sixteenth" },
  { x: 0.75, y: 6, type: "thirtysecond" },
  { x: 1.25, y: 3, type: "eighth" },
];

const increasingUp: Note[] = [
  { x: 0, y: -3, type: "sixteenth" },
  { x: 0.25, y: 1, type: "sixteenth" },
  { x: 0.5, y: 2, type: "sixteenth" },
  { x: 0.75, y: 3, type: "sixteenth" },
];

const decreasingDown: Note[] = [
  { x: 0, y: 5, type: "sixteenth" },
  { x: 0.25, y: 4, type: "sixteenth" },
  { x: 0.5, y: -3, type: "sixteenth" },
  { x: 0.75, y: -4, type: "sixteenth" },
];

const decreasingUp: Note[] = [
  { x: 0, y: 3, type: "sixteenth" },
  { x: 0.25, y: 2, type: "sixteenth" },
  { x: 0.5, y: -1, type: "sixteenth" },
  { x: 0.75, y: -4, type: "sixteenth" },
];

const constantUp: Note[] = [
  { x: 0, y: 3, type: "sixteenth" },
  { x: 0.25, y: 3, type: "sixteenth" },
  { x: 0.5, y: 3, type: "sixteenth" },
  { x: 0.75, y: 3, type: "sixteenth" },
];

const constantDown: Note[] = [
  { x: 0, y: 4, type: "sixteenth" },
  { x: 0.25, y: 4, type: "sixteenth" },
  { x: 0.5, y: 4, type: "sixteenth" },
  { x: 0.75, y: 4, type: "sixteenth" },
];

const nonOrderedUp: Note[] = [
  { x: 0, y: 3, type: "sixteenth" },
  { x: 0.25, y: -4, type: "sixteenth" },
  { x: 0.5, y: -1, type: "sixteenth" },
  { x: 0.75, y: 3, type: "sixteenth" },
];

const nonOrderedDown: Note[] = [
  { x: 0, y: 6, type: "sixteenth" },
  { x: 0.25, y: 9, type: "sixteenth" },
  { x: 0.5, y: 7, type: "sixteenth" },
  // { x: 0.75, y: 6, type: "sixteenth" },
];
