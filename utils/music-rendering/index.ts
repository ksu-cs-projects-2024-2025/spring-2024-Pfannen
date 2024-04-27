"use client";

import { Measure } from "@/components/providers/music/types";
import { ABOVE_BELOW_CT, BODY_CT } from "@/objects/measurement/constants";
import { Measurements } from "@/objects/measurement/measurements";
import { MeasureRenderer } from "@/objects/music-rendering/measure-renderer";
import { MusicLayout } from "@/objects/music-rendering/music-layout";
import { PageDimensionParams } from "@/objects/music-rendering/music-layout/page-dimension-params";
import { DeepPartial, UnitConverter } from "@/types";
import { BeatCanvasDrawOptions } from "@/types/music-rendering/canvas/beat-canvas";
import { CanvasManager } from "@/types/music-rendering/canvas/canvas-manager";

export const renderMeasures = (measures: Measure[], manager: CanvasManager) => {
  const pageParams = PageDimensionParams.genericSheetMusic();
  const dimensions = MusicLayout.getDimensions(pageParams);
  const measurements = new Measurements(
    ABOVE_BELOW_CT,
    BODY_CT,
    3,
    dimensions.measureDimensions
  );
  const renderer = new MeasureRenderer(
    measures,
    dimensions,
    manager,
    measurements
  );
  renderer.render();
};

export const createXValueConverter = (
  aspectRatio: number
): UnitConverter<number, number> => {
  return (xValue: number) => xValue / aspectRatio;
};

export const createYValueConverter = (
  aspectRatio: number
): UnitConverter<number, number> => {
  return (yValue: number) => aspectRatio / yValue;
};

export const getRelativeCanvasDrawOptions = (
  aspectRatio: number
): DeepPartial<BeatCanvasDrawOptions> => {
  const xConverter = createXValueConverter(aspectRatio);
  return {
    note: {
      noteBodyAspectRatio: xConverter(1.5),
      dotAnnotationAspectRatio: xConverter(1),
      stemWidthBodyFraction: xConverter(0.15),
    },
    measure: {
      endBarWidthLineFraction: xConverter(1.25),
    },
  };
};
