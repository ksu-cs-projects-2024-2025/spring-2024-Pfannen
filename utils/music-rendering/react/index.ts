import { Measure } from "@/components/providers/music/types";
import { Measurements } from "@/objects/measurement/measurements";
import { RelativeClickableBeatCanvas } from "@/objects/music-rendering/beat-canvas/relative-clickable-beat-canvas";
import { RelativeDrawingCanvas } from "@/objects/music-rendering/drawing-canvas/react-drawing-canvas/relative-drawing-canvas";
import { MeasureRenderer } from "@/objects/music-rendering/measure-renderer";
import { BeatCanvasDel, MeasureSectionToggle } from "@/types/music-rendering";
import { BeatCanvasPropDelegates } from "@/types/music-rendering/canvas/beat-canvas/clickable-beat-canvas";
import { MusicDimensionData } from "@/types/music-rendering/music-layout";

export const getRelativeBeatCanvas = (
  aspectRatio: number,
  measurements: Measurements,
  delegates?: BeatCanvasPropDelegates,
  drawAboveBelow?: boolean
) => {
  const converter = (xValue: number) => xValue / aspectRatio;
  const drawingCanvas = new RelativeDrawingCanvas(converter);
  return new RelativeClickableBeatCanvas(
    converter,
    drawingCanvas,
    measurements,
    delegates,
    {
      note: {
        noteBodyAspectRatio: converter(1.5),
        dotAnnotationAspectRatio: converter(1),
      },
    }, //1.5 is the original ratio
    drawAboveBelow
  );
};

export const drawMeasures = (
  measures: Measure[],
  dimensions: MusicDimensionData,
  measurements: Measurements,
  getCanvasForPage: BeatCanvasDel,
  sectionToggleList?: MeasureSectionToggle
) => {
  const renderer = new MeasureRenderer(
    measures,
    dimensions,
    getCanvasForPage,
    measurements,
    sectionToggleList
  );
  renderer.render();
  //   return beatCanvas.createCanvas({
  //     style: { position: "relative", width: "100%", height: "100%" },
  //   });
};
