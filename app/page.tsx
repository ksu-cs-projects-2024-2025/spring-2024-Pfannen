"use client";

import Measure from "@/components/ui/measure";
import Note from "@/components/ui/measure/note";
import SplitSegment from "@/components/ui/measure/split-segment";
import { getSplitSegmentValues } from "@/components/ui/reusable/segment-split/utils";

export default function Home() {
  return (
    <>
      <Note />
      <Measure
        segmentGenerator={getSplitSegmentValues}
        notes={[{ x: 1.5, type: "eighth", y: 0 }]}
        keySignature={{ beatNote: 4, beatsPerMeasure: 4 }}
        renderSegment={(props) => (
          <SplitSegment {...props} lineHeight="10px" spaceHeight="20px" />
          // <Segment
          //   {...props}
          //   aboveBody={3}
          //   belowBody={3}
          //   lineHeight="10px"
          //   spaceHeight="20px"
          // />
        )}
        addNote={(note) => {
          console.log(note);
        }}
        removeNote={(x, y) => {
          console.log(x, y);
        }}
      />
    </>
  );
}
