import { KeySignature, Measure, Note } from "../../types";
import { getNoteDuration } from "../../utils";

export type MeasureModifier<T> = (args: T) => (measures: Measure[]) => void;

export const addNote: MeasureModifier<{ note: Note; measureIndex: number }> =
  ({ note, measureIndex }) =>
  (measures) => {
    const measure = measures[measureIndex];
    const keySignature = {
      beatNote: 4,
      beatsPerMeasure: 4,
    };
    const noteIndex = findPositionIndex(note.x, measure.notes);
    if (!isValidPlacement(note, measure, keySignature, noteIndex)) {
      console.error("Invalid note placement");
      return;
    }
    measure.notes.splice(noteIndex, 0, note);
  };

const isValidPlacement = (
  note: Note,
  measure: Measure,
  keySignature: KeySignature,
  noteIndex?: number
) => {
  const noteDuration = getNoteDuration(note.type, keySignature.beatNote);
  if (measure.notes.length === 0) {
    return note.x + noteDuration <= keySignature.beatNote;
  }
  const { notes } = measure;
  if (noteIndex === undefined) {
    noteIndex = findPositionIndex(note.x, notes);
  }
  const foundNote = notes[noteIndex];
  const prevNote = notes[noteIndex - 1];
  const lowerBound = prevNote
    ? prevNote.x + getNoteDuration(prevNote.type, keySignature.beatNote)
    : 0;
  const upperBound = foundNote ? foundNote.x : keySignature.beatsPerMeasure;
  return lowerBound <= note.x && note.x + noteDuration <= upperBound;
};

const findPositionIndex = (xPos: number, notes: Note[]) => {
  let start = 0;
  let end = notes.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    const midXPos = notes[mid].x;
    if (midXPos === xPos) return mid;
    if (xPos < midXPos) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }
  return end;
};