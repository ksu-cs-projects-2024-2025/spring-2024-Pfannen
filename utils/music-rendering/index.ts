import { Measure } from "@/components/providers/music/types";
import { BeatCanvas } from "@/objects/music-rendering/beat-canvas";
import { ReactDrawingCanvas } from "@/objects/music-rendering/drawing-canvas/react-drawing-canvas";
import { MeasureRenderer } from "@/objects/music-rendering/measure-renderer";
import { Music } from "@/objects/music/readonly-music";
import { IBeatCanvas } from "@/types/music-rendering/canvas";

export const renderMeasures = (
  measures: Measure[],
  getBeatCanvasForPage: (pageNum: number) => IBeatCanvas
) => {
  const music = new Music();
  music.setMeasures(measures);
  const renderer = new MeasureRenderer(music, 6, getBeatCanvasForPage);
  renderer.render();
};

export const drawMockMeasures = (
  getBeatCanvasForPage: (pageNum: number) => IBeatCanvas
) => {
  renderMeasures(createMockMeasures(), getBeatCanvasForPage);
};

export const getHTMLCanvas = () => {
  const drawingCanvas = new ReactDrawingCanvas("px");
  const beatCanvas = new BeatCanvas(drawingCanvas);
  drawMockMeasures(() => beatCanvas);
  return drawingCanvas.createCanvas({
    style: { position: "relative", width: "595.28px", height: "841.89px" },
  });
};

const createMockMeasures = () => {
  const measures: Measure[] = [];
  const measureCount = 10;
  for (let i = 0; i < measureCount; i++) {
    measures.push({
      notes: [
        { x: 0, y: -1, type: "eighth" },
        { x: 0.5, y: 1, type: "eighth" },
        { x: 1, y: 10, type: "quarter" },
        { x: 2, y: -1, type: "eighth" },
        { x: 2.5, y: -1, type: "eighth" },
        { x: 3, y: -1, type: "eighth" },
        { x: 3.5, y: -1, type: "eighth" },
      ],
    });
  }
  return measures;
};