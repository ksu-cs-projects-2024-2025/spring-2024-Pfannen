import { MeasureSectionWidthHandlers } from "@/types/music-rendering/canvas/beat-canvas/drawers/measure-section";
import { getKeySignatureWidth } from "./key-signature/widths";
import { MeasureSection } from "@/types/music";
import { getClefWidth } from "./clef/widths";

const repeatAspectRatio = 0.25;

const padding = 1.15;

export const getTimeSignatureWidth = (bodyHeight: number) => bodyHeight / 2;

const sectionWidthHandlers: MeasureSectionWidthHandlers = {
  clef: ({ bodyHeight }, clef) => getClefWidth(clef, bodyHeight) * padding,
  timeSignature: ({ bodyHeight }) =>
    getTimeSignatureWidth(bodyHeight) * padding,
  keySignature: (args, keySignature) =>
    getKeySignatureWidth(keySignature, args.componentHeights.space),
  repeat: ({ bodyHeight }) => bodyHeight * repeatAspectRatio,
  note: () => 1,
};

export const getSectionWidthHandler = (section: MeasureSection) => {
  return sectionWidthHandlers[section];
};
