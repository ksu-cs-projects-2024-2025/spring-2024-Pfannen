import { NoteType } from "./types";

const noteTypeToFourFourValue: { [type in NoteType]: number } = {
  whole: 1,
  half: 2,
  quarter: 4,
  eighth: 8,
  sixteenth: 16,
  thirtysecond: 32,
  sixtyfourth: 64,
};

export const getNoteDuration = (
  noteType: NoteType,
  beatNote: number,
  dotted = false
) => {
  let duration = +(beatNote / noteTypeToFourFourValue[noteType]);
  if (dotted) duration += duration / 2;
  return duration;

  /* return +(beatNote / noteTypeToFourFourValue[noteType]).toFixed(
		3
	) as SegmentBeat; //toFixed 3 works except for dotted-thirtysecond (rounds it to .188 for 4/4 but needs to be .1875) */
};

export const getNotesPerMeasure = (
  noteType: NoteType,
  beatNote: number,
  dotted = false
) => {
  const duration = getNoteDuration(noteType, beatNote, dotted);
  console.log({ beatNote, duration }, beatNote / duration);
  return beatNote / duration;
};
