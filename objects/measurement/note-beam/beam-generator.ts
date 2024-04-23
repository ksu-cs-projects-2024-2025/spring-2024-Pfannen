import { TrigHelpers } from "@/utils/trig";
import { BeamNote } from "./note-beam-calculator";
import { Coordinate } from "@/types";

type AddBeamDataDel = (
  angle: number,
  length: number,
  noteIndex: number
) => void;

export class BeamGenerator {
  private notes: BeamNote[];
  private beamAngle: number;
  private addBeamData: AddBeamDataDel;
  private currentBeams: Coordinate[] = [];
  constructor(
    notes: BeamNote[],
    beamAngle: number,
    addBeamData: AddBeamDataDel
  ) {
    this.notes = notes;
    this.beamAngle = beamAngle;
    this.addBeamData = addBeamData;
  }

  private addBeams(noteIndex: number, beamCount: number) {
    for (let i = 0; i < beamCount; i++) {
      this.currentBeams.push(this.notes[noteIndex]);
    }
  }

  private commitBeams(noteIndex: number, beamCount = this.currentBeams.length) {
    const { x, y } = this.notes[noteIndex];
    for (let i = 0; i < beamCount; i++) {
      const startCoordinate = this.currentBeams.pop()!;
      const beamLength = TrigHelpers.calculatePointHypotenuse(
        startCoordinate,
        { x, y },
        this.beamAngle
      );
      this.addBeamData(this.beamAngle, beamLength, noteIndex);
    }
  }

  public getExtraBeams() {
    let currentBeamCount = this.notes[0].beamCount;
    this.notes.forEach((note, i) => {
      const beamCount = note.beamCount;
      const beamDifference = beamCount - currentBeamCount;
      if (beamDifference > 0) {
        this.addBeams(i, beamDifference);
      } else if (beamDifference < 0) {
        this.commitBeams(i - 1, beamDifference * -1);
      }
    });
    this.commitBeams(this.notes.length - 1); //Commit the rest of the beams (if any)
  }
}