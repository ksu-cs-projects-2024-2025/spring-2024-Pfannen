import { IDrawingCanvas } from "../../drawing-canvas";
import { UnitConverter } from "@/types";
import { MeasureSection, MeasureSectionMetadata } from "@/types/music";
import { MeasureComponentValues } from "@/types/music-rendering";
import { CoordinateSection } from "@/types/music-rendering/measure-manager/measure-outline";

export type MeasureSectionDrawerArgs<T extends MeasureSection> = {
  drawCanvas: IDrawingCanvas;
  bodyHeight: number;
  componentHeights: MeasureComponentValues;
  section: CoordinateSection<T>;
  data: MeasureSectionMetadata[T];
  yPosToAbsolute: UnitConverter<number, number>;
};

export type MeasureSectionDrawer<T extends MeasureSection> = (
  args: MeasureSectionDrawerArgs<T>
) => void;

export type MeasureSectionDrawers = {
  [K in MeasureSection]: MeasureSectionDrawer<K>;
};

export type MeasureSectionWidthArgs = {
  bodyHeight: number;
  componentHeights: MeasureComponentValues;
};

export type MeasureSectionWidthHandlers = {
  [K in MeasureSection]: (
    args: MeasureSectionWidthArgs,
    data: MeasureSectionMetadata[K]
  ) => number;
};

export type InitialMeasureSection<T extends MeasureSection> = {
  key: MeasureSection;
  displayByDefault: boolean;
  data: MeasureSectionMetadata[T];
};

export type InitialMeasureSectionArray =
  InitialMeasureSection<MeasureSection>[];