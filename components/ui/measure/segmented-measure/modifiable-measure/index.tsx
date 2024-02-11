import { minimalSegmentGenerator } from "@/components/ui/reusable/segment-split/utils";
import classes from "./index.module.css";
import { FunctionComponent, useState } from "react";
import SegmentedMeasure from "..";
import SplitSegment from "../../segment/split-segment";
import { useMusic } from "@/components/providers/music";
import NoteSelection from "@/components/ui/reusable/note-selection";
import { NoteType } from "@/components/providers/music/types";
import { addNote } from "@/components/providers/music/hooks/useMeasures/utils";
import { ModificationBehavior } from "../../utils";
import useSplitSegmentRegistry from "@/components/hooks/useSplitSegmentRegistry";

type ModifiableMeasureProps = {
  measureIndex: number;
  modificationBehavior: ModificationBehavior<any>;
};

const ModifiableMeasure: FunctionComponent<ModifiableMeasureProps> = ({
  measureIndex,
  modificationBehavior,
}) => {
  //To make modificationBehavior fully complete, need to take in additional props to pass into the split segment
  //{props: ..., modificationBehavior: }
  const { getMeasures, invokeMeasureModifier } = useMusic();
  const { getRegistryProps, splitSegment, joinSegment } =
    useSplitSegmentRegistry();
  const [noteSelected, setNoteSelected] = useState<NoteType | undefined>();
  const noteSelectHandler = (type: NoteType) => {
    setNoteSelected((prevState) => {
      if (type === prevState) {
        return undefined;
      }
      return type;
    });
  };
  return (
    <>
      <NoteSelection
        selectedNote={noteSelected}
        onNoteClicked={noteSelectHandler}
      />
      <div className={classes.measures}>
        {getMeasures(measureIndex, 1).map(({ notes }, i) => {
          return (
            <SegmentedMeasure
              segmentGenerator={minimalSegmentGenerator}
              notes={notes}
              timeSignature={{ beatNote: 4, beatsPerMeasure: 4 }}
              renderSegment={(props) => {
                return (
                  <SplitSegment
                    actionHandler={modificationBehavior(
                      {
                        splitSegment,
                        joinSegment,
                        placeNote: (note) => {
                          invokeMeasureModifier(
                            addNote({ note, measureIndex: i })
                          );
                        },
                      },
                      noteSelected
                    )}
                    {...props}
                    registryDelegates={getRegistryProps()}
                  />
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ModifiableMeasure;
