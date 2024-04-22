import {
  RestDrawer,
  RestDrawers,
  SVGRest,
} from "@/types/music-rendering/canvas/beat-canvas/drawers/measure-rests";
import { getRestPath } from "./svg-paths";
import { NoteType } from "@/components/providers/music/types";

const drawWholeRest: RestDrawer = ({
  drawCanvas,
  restCenter,
  measureComponentHeights,
}) => {
  const width = measureComponentHeights.space * 2;
  const height = measureComponentHeights.space / 2;
  const x = restCenter.x - width / 2;
  const y = restCenter.y + height / 2 + measureComponentHeights.line / 2;

  drawCanvas.drawRectangle({ corner: { x, y }, height, width });
};

const drawHalfRest: RestDrawer = ({
  drawCanvas,
  restCenter,
  measureComponentHeights,
}) => {
  const width = measureComponentHeights.space * 2;
  const height = measureComponentHeights.space / 2;
  const x = restCenter.x - width / 2;
  const y = restCenter.y;
  drawCanvas.drawRectangle({ corner: { x, y }, height, width });
};

const drawSVGRest =
  (type: SVGRest): RestDrawer =>
  ({ drawCanvas, restCenter, measureComponentHeights }) => {
    const path = getRestPath(type);
    const height = measureComponentHeights.space * 3;
    drawCanvas.drawSVG({
      path,
      center: restCenter,
      height,
    });
  };

export const restDrawers: Partial<RestDrawers> = {
  whole: drawWholeRest,
  half: drawHalfRest,
  quarter: drawSVGRest("quarter"),
  eighth: drawSVGRest("eighth"),
  sixteenth: drawSVGRest("sixteenth"),
  thirtysecond: drawSVGRest("thirtysecond"),
};

export const getRestDrawer = (type: NoteType) => {
  return restDrawers[type];
};
