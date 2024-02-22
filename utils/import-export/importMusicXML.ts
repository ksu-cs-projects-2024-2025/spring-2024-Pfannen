import {
	Measure,
	Note,
	TimeSignature,
} from '@/components/providers/music/types';
import {
	Clef,
	MeasureAttributesMXML,
	MusicPart,
	MusicScore,
} from '@/types/music';
import { durationToNoteType, getYPosFromNote } from '../music';
import Helper from './helper-classes/ImportMusicXMLHelper';

const getMeasureNotesJS = (
	measureXML: Element,
	quarterNoteDivisions: number,
	clef: Clef,
	timeSignature: TimeSignature
) => {
	const noteArr: Note[] = [];

	const noteXMLArr = Helper.getNoteXMLArray(measureXML);
	if (!noteXMLArr) return null;

	let curX = 0;
	const { beatNote, beatsPerMeasure } = timeSignature;
	for (let i = 0; i < noteXMLArr.length; i++) {
		const noteXML = noteXMLArr[i];

		const duration = Helper.getNoteXMLDuration(
			noteXML,
			quarterNoteDivisions,
			beatNote
		);
		if (duration === null) continue;

		const pitchOctave = Helper.getNoteXMLPitchOctave(noteXML);
		if (pitchOctave) {
			let type = durationToNoteType(duration, beatNote);

			const y = getYPosFromNote(pitchOctave, clef);
			noteArr.push({ x: curX, y, type });
		} else {
			if (!Helper.noteXMLIsRest(noteXML)) {
				console.error('there was neither a pitch nor rest in a measure');
			}
		}

		curX += duration;
		// TODO: Address measures specifying multiple voices
		if (curX >= beatsPerMeasure) break;
	}

	return noteArr;
};

const getMeasuresJS = (part: Element) => {
	const measuresXML = Helper.getMeasureXMLArray(part);
	if (!measuresXML) return null;

	const measures: Measure[] = [];
	const curAttr = Helper.getDefaultMeasureAttributes();

	for (let i = 0; i < measuresXML.length; i++) {
		const measureXML = measuresXML[i];
		const measure: Measure = {
			notes: [],
		};

		const measureAttributes = Helper.getMeasureAttributesJS(measureXML);
		if (measureAttributes) {
			// TODO: Remove any cast
			for (const key in measureAttributes) {
				curAttr[key as keyof MeasureAttributesMXML] = measureAttributes[
					key as keyof MeasureAttributesMXML
				] as any;
			}

			delete measureAttributes.quarterNoteDivisions;
			measure.attributes = measureAttributes;
		}

		const notes = getMeasureNotesJS(
			measureXML,
			curAttr.quarterNoteDivisions!,
			curAttr.clef!,
			curAttr.timeSignature!
		);

		if (!notes) return null;
		measure.notes = notes;
		measures.push(measure);
	}

	return measures;
};

export const musicXMLToJSON = (musicXML: XMLDocument) => {
	const docEl = musicXML.documentElement;
	const tagName = docEl.tagName;

	if (tagName !== 'score-partwise') {
		console.error("can't read anything other than score-partwise rn");
		return null;
	}

	const partsJS: MusicPart[] = [];
	const partAttributes = Helper.getPartAttributesArray(docEl);
	if (!partAttributes) return null;

	const partsXML = Helper.getPartsXMLArray(docEl);
	if (!partsXML) return null;

	for (let i = 0; i < partsXML.length; i++) {
		const partXML = partsXML[i];
		const measures = getMeasuresJS(partXML);
		if (!measures) return null;

		const attributes = partAttributes[i];
		partsJS.push({ attributes, measures });
	}

	const musicScore: MusicScore = {
		title: Helper.getScoreTitle(docEl) || 'Unknown Title',
		parts: partsJS,
	};

	return musicScore;
};