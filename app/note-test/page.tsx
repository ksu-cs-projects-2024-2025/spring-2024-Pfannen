import Note from "@/lib/notes/ui/note";
import classes from "./index.module.css";
import { FunctionComponent } from "react";

type NoteTestProps = {};

const NoteTest: FunctionComponent<NoteTestProps> = () => {
  return (
    <div className={classes.page}>
      <Note></Note>
    </div>
  );
};

export default NoteTest;
