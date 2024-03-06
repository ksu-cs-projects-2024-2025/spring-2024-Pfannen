import {
  Measure,
  Note,
  NoteRenderData,
  TimeSignature,
} from "@/components/providers/music/types";
import { getNoteDuration } from "@/components/providers/music/utils";
import { Rest } from "@/types/music/render-data";
import { getDecimalPortion } from "@/utils";
import { durationToRestType, isDownbeat } from "@/utils/music";

type NoteComponent = { type: "note"; note: Note; renderData: NoteRenderData };
type RestComponent = { type: "rest"; rest: Rest };

type Component = NoteComponent | RestComponent;

type MeasureRenderData = {
  components: Component[];
} & Omit<Measure, "notes">;

type IteratorCallback = (measureData: MeasureRenderData, index: number) => void;

type MusicCallbacks = {
  getMeasureTimeSignature: (measureIndex: number) => TimeSignature;
  getMeasureSubdivisionLength: (measureIndex: number) => number;
  getNoteDuration: (measureIndex: number, noteIndex: number) => number;
};

export class MusicIterator {
  static iterate(
    measures: Measure[],
    measureRenderData: NoteRenderData[][],
    callbacks: MusicCallbacks,
    cb: IteratorCallback
  ) {
    measures.forEach((measure, i) => {
      const timeSignature = callbacks.getMeasureTimeSignature(i);
      const subdivisionLength = callbacks.getMeasureSubdivisionLength(i);
      let restStart = 0;
      const components: Component[] = [];
      measure.notes.forEach((note, j) => {
        getRests(
          components,
          restStart,
          note.x,
          subdivisionLength,
          timeSignature
        );
        components.push({
          type: "note",
          note,
          renderData: measureRenderData[i][j],
        });
        restStart = note.x + callbacks.getNoteDuration(i, j);
      });
      getRests(
        components,
        restStart,
        timeSignature.beatsPerMeasure,
        subdivisionLength,
        timeSignature
      );
      cb({ attributes: measure.attributes, components }, i);
    });
  }
}

const getRests = (
  components: Component[],
  restStart: number,
  noteStart: number,
  subdivisionLength: number,
  timeSignature: TimeSignature
) => {
  const restDuration = noteStart - restStart;
  if (restDuration) {
    const restComponents = getRestsForDuration(
      restStart,
      restDuration,
      subdivisionLength,
      timeSignature
    );
    restComponents.forEach((rest) => {
      components.push({ type: "rest", rest });
    });
  }
};

//Temporary export for testing
export const getRestsForDuration = (
  x: number,
  duration: number,
  subdivisionLength: number,
  timeSignature: TimeSignature
): Rest[] => {
  if (timeSignature.beatsPerMeasure === duration) {
    return [{ x: 0, type: "whole" }];
  }
  const rests: Rest[] = [];
  if (!isDownbeat(x)) {
    const partialDuration = 1 - getDecimalPortion(x);
    const dur = Math.min(duration, partialDuration);
    const type = durationToRestType(dur, timeSignature);
    rests.push({ x, type });
    duration -= dur;
    x += dur;
  }

  const fractionalDuaration = getDecimalPortion(duration);
  duration -= fractionalDuaration;

  while (duration) {
    const dur = getMaxRestDuration(x, duration, subdivisionLength);
    const type = durationToRestType(dur, timeSignature);
    rests.push({ x, type });
    duration -= dur;
    x += dur;
  }

  if (fractionalDuaration) {
    const type = durationToRestType(fractionalDuaration, timeSignature);
    rests.push({ x, type });
  }

  return rests;
};

const getMaxRestDuration = (
  x: number,
  duration: number,
  subdivisionLength: number
) => {
  const distanceToSubdivision = subdivisionLength - (x % subdivisionLength);
  return Math.min(duration, distanceToSubdivision);
};

// type CompareFunction<T, U> = (val1: T, val2: U) => number;
//
// const sortSorted = <T, U>(
//   arr1: T[],
//   arr2: U[],
//   cmpFn: (val1: T, val2: U) => number
// ) => {
//   const sortedArray: (T | U)[] = [];
//   let i = 0;
//   let j = 0;
//   while (i < arr1.length && j < arr2.length) {
//     if (cmpFn(arr1[i], arr2[j]) <= 0) {
//       sortedArray.push(arr1[i]);
//       i++;
//     } else {
//       sortedArray.push(arr2[j]);
//       j++;
//     }
//   }
//   while (i < arr1.length) {
//     sortedArray.push(arr1[i]);
//     i++;
//   }

//   while (j < arr2.length) {
//     sortedArray.push(arr2[j]);
//     j++;
//   }
//   return sortedArray;
// };

// const measureComponentComparator: CompareFunction<Note, Rest> = (
//   note,
//   rest
// ) => {
//   return note.x - rest.x;
// };
