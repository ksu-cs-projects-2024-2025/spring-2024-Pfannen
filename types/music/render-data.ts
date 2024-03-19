import {
  Measure,
  Note,
  NoteRenderData,
  NoteType,
  TimeSignature,
} from "@/components/providers/music/types";

export type Rest = { x: number; type: NoteType };

export type NoteComponent = {
  type: "note";
  note: Note;
  renderData: NoteRenderData;
};
export type RestComponent = { type: "rest"; rest: Rest };

export type MeasureComponent = NoteComponent | RestComponent;

export type MeasureRenderData = {
  components: MeasureComponent[];
} & Omit<Measure, "notes"> & { timeSignature?: TimeSignature }; //keySignature?: KeySignature,
