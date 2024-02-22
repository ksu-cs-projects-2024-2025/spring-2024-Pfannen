import { Measure, TimeSignature } from '@/components/providers/music/types';

export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type MusicPart = {
	attributes: MusicPartAttributes;
	measures: Measure[];
};

export type MusicPartAttributes = {
	instrument: string;
	id: string;
	name: string;
};

export type Clef = 'treble' | 'alto' | 'bass';

export type MusicScore = {
	title: string;
	parts: MusicPart[];
};

export type Metronome = {
	beatNote: number;
	beatsPerMinute: number;
};

export type MeasureAttributes = {
	metronome: Metronome;
	timeSignature: TimeSignature;
	keySignature: string;
	clef: Clef;
};

export type PartialMeasureAttributes = Partial<MeasureAttributes>;

export type MeasureAttributesMXML = Partial<MeasureAttributes> & {
	quarterNoteDivisions?: number;
};
