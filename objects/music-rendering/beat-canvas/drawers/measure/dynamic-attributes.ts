import { DynamicMeasureAttributes } from "@/types/music";
import {
  DynamicAttributeDel,
  DynamicAttributeDelegates,
} from "@/types/music-rendering/canvas/beat-canvas/drawers/measure/dynamic-attributes";
import {
  getDynamicSonataString,
  getNoteSonataString,
} from "@/utils/fonts/sonata";
import { beatNoteToNoteType } from "@/utils/music";

const dynamicFontSize = 16;
const metronomeFontSize = 14;

const paddingFraction = 0.15;

const drawDynamic: DynamicAttributeDel<"dynamic"> =
  (dynamic) =>
  ({ drawCanvas, measureYValues, bodyHeight, noteStartX }) => {
    const text = getDynamicSonataString(dynamic);
    const padding = bodyHeight * paddingFraction;
    const y = measureYValues.bottom - padding;
    drawCanvas.drawText({
      text,
      x: noteStartX,
      y,
      fontFamily: "Sonata",
      fontSize: dynamicFontSize,
      position: "topCenter",
    });
  };

const drawMetronome: DynamicAttributeDel<"metronome"> =
  (metronome) =>
  ({ drawCanvas, measureYValues, bodyHeight, noteStartX }) => {
    const note = beatNoteToNoteType(metronome.beatNote);
    const text = `${getNoteSonataString(note)} ${metronome.beatsPerMinute}`;
    const padding = bodyHeight * paddingFraction;
    const y = measureYValues.top + padding;
    drawCanvas.drawText({
      text,
      x: noteStartX,
      y,
      fontFamily: "Sonata",
      fontSize: metronomeFontSize,
      position: "bottomCenter",
    });
  };

const dynamicAttributeDelegates: DynamicAttributeDelegates = {
  metronome: drawMetronome,
  dynamic: drawDynamic,
};

export const getDynamicAttributeDrawer = <
  T extends keyof DynamicMeasureAttributes
>(
  attribute: T,
  data: DynamicMeasureAttributes[T]
) => {
  return dynamicAttributeDelegates[attribute](data);
};