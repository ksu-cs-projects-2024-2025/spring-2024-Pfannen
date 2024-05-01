import { PDFDocument, PDFFont, StandardFonts } from "pdf-lib";
import { PDFLibDrawingCanvas } from ".";
import { CanvasManager } from "@/types/music-rendering/canvas/manager/canvas-manager";
import { Measurements } from "@/objects/measurement/measurements";
import {
  DrawingCanvasFontFamily,
  IDrawingCanvas,
  PDFFonts,
} from "@/types/music-rendering/canvas/drawing-canvas";
import { IScoreDrawerGetter } from "@/types/music-rendering/canvas/manager/score-manager";
import { IScoreDrawer } from "@/types/music-rendering/canvas/score-drawer";
import { ScoreDrawer } from "../../score-drawer";

export class PDFLibCanvasManager extends CanvasManager {
  protected pdfDoc?: PDFDocument;
  private fonts?: PDFFonts;
  constructor(private pageSize: [number, number], measurements: Measurements) {
    super(measurements);
  }

  createDrawingCanvas(): IDrawingCanvas {
    this.checkPDFDoc();
    const newPage = this.pdfDoc!.addPage(this.pageSize);
    return new PDFLibDrawingCanvas(newPage, this.fonts);
  }

  private checkPDFDoc() {
    if (!this.pdfDoc) {
      throw new Error("PDFLibDrawingCanvasManager: Canvas not initialized");
    }
  }

  private async embedFonts(fonts?: DrawingCanvasFontFamily[]) {
    if (!fonts) return;
    const promises = fonts.map((font) => {
      const pdfLibFont = pdfLibFontFamilies[font];
      return this.pdfDoc!.embedFont(pdfLibFont);
    });
    return Promise.all(promises);
  }

  private createPDFFonts(
    fonts?: DrawingCanvasFontFamily[],
    refs?: PDFFont[]
  ): PDFFonts {
    const record = {} as PDFFonts;
    fonts?.forEach((font, i) => {
      record[font] = refs![i];
    });
    return record;
  }

  public async initializeCanvas(fonts?: DrawingCanvasFontFamily[]) {
    this.pdfDoc = await PDFDocument.create();
    const refs = await this.embedFonts(fonts);
    this.fonts = this.createPDFFonts(fonts, refs);
  }

  public getPDF() {
    return this.pdfDoc;
  }
}

export class PDFLibScoreDrawererManager
  extends PDFLibCanvasManager
  implements IScoreDrawerGetter
{
  getScoreDrawerForPage(pageNumber: number): IScoreDrawer {
    const beatCanvas = this.getCanvasForPage(pageNumber);
    const drawingCanvas = this.getDrawingCanvasPage(pageNumber);
    return new ScoreDrawer(drawingCanvas, beatCanvas);
  }
}

const pdfLibFontFamilies: Record<DrawingCanvasFontFamily, StandardFonts> = {
  "Times New Roman": StandardFonts.TimesRoman,
};
