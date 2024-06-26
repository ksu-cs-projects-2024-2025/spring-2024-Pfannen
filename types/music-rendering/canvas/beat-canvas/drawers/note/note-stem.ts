import { NoteDirection } from "@/types/music";
import { Drawer } from "..";
import { Coordinate } from "@/types";

export type NoteStemArgs = {
  bodyWidth: number;
  direction: NoteDirection;
  stemHeight: number;
  stemWidth: number;
  bodyCenter: Coordinate;
};

export type NoteStemDrawer = Drawer<NoteStemArgs, Coordinate>;
