import { getNoteDuration } from '@/components/providers/music/utils';
import { getNoteFromYPos } from '../music';
import { createAppend } from './xml-helpers';
import { Clef, MeasureAttributes, MusicPart, MusicScore } from '@/types/music';
import {
	Measure,
	Note,
	TimeSignature,
} from '@/components/providers/music/types';
import { segmentGen1 } from '../segments/segment-gen-1';
import { clefToMusicXML } from '../musicXML';

const createRestsXML = (
	root: XMLDocument,
	xPos1: number,
	xPos2: number,
	measureXML?: Element
) => {
	const restsData = segmentGen1(xPos1, xPos2);

	const restsXML: Element[] = [];
	restsData.forEach((restData) => {
		for (let i = 0; i < restData.count; i++) {
			const noteXML = root.createElement('note');
			createAppend(root, noteXML, 'rest');
			const duration = createAppend(root, noteXML, 'duration');
			duration.textContent = restData.segmentBeat.toString();

			if (measureXML) measureXML.appendChild(noteXML);
			restsXML.push(noteXML);
		}
	});

	return restsXML;
};

const getMeasureNotesXML = (
	root: XMLDocument,
	measureXML: Element,
	notes: Note[],
	timeSignature: TimeSignature,
	clef: Clef
) => {
	const boundCA = createAppend.bind(this, root);

	createRestsXML(
		root,
		0,
		notes.length ? notes[0].x : timeSignature.beatsPerMeasure,
		measureXML
	);

	for (let i = 0; i < notes.length; i++) {
		const { x, y, type } = notes[i];
		const stepOctave = getNoteFromYPos(y, clef);

		const noteXML = boundCA(measureXML, 'note');

		const pitchXML = boundCA(noteXML, 'pitch');
		const stepXML = boundCA(pitchXML, 'step');
		stepXML.textContent = stepOctave.slice(0, -1);
		const octaveXML = boundCA(pitchXML, 'octave');
		octaveXML.textContent = stepOctave.slice(-1);

		const duration = getNoteDuration(type, timeSignature.beatNote);
		const durationXML = boundCA(noteXML, 'duration');
		durationXML.textContent = duration.toString();
		const typeXML = boundCA(noteXML, 'type');
		typeXML.textContent = type;

		createRestsXML(
			root,
			x + duration,
			i === notes.length - 1 ? timeSignature.beatsPerMeasure : notes[i + 1].x,
			measureXML
		);
	}
};

const getMeasureAttributesXML = (
	root: XMLDocument,
	measureXML: Element,
	measure: Measure,
	curAttributes: MeasureAttributes
) => {
	const { attributes } = measure;
	if (!attributes) return null;

	const boundCA = createAppend.bind(this, root);
	const attributesXML = boundCA(measureXML, 'attributes');

	const { timeSignature, keySignature, metronome, clef } = attributes;
	if (timeSignature) {
		curAttributes.timeSignature = timeSignature;

		const divisions = boundCA(attributesXML, 'divisions');
		divisions.textContent = (timeSignature.beatNote / 4).toString();
		const time = boundCA(attributesXML, 'time');
		const beats = boundCA(time, 'beats');
		beats.textContent = timeSignature.beatsPerMeasure.toString();
		const beatType = boundCA(time, 'beat-type');
		beatType.textContent = timeSignature.beatNote.toString();
	}

	if (keySignature) {
		curAttributes.keySignature = keySignature;

		// TODO: Make this resemble actual key signature
		const key = boundCA(attributesXML, 'key');
		const fifths = boundCA(key, 'fifths');
		fifths.textContent = '0';
	}

	if (metronome) {
		curAttributes.metronome = metronome;

		const directionTypeXML = boundCA(attributesXML, 'direction-type');
		const metronomeXML = boundCA(directionTypeXML, 'metronome');
		const beatUnitXML = boundCA(metronomeXML, 'beat-unit');
		beatUnitXML.textContent = metronome.beatNote.toString();
		const perMinuteXML = boundCA(metronomeXML, 'per-minute');
		perMinuteXML.textContent = metronome.beatsPerMinute.toString();
	}

	if (clef) {
		curAttributes.clef = clef;
		const musicXMLClef = clefToMusicXML(clef);

		const clefXML = boundCA(attributesXML, 'clef');
		const sign = boundCA(clefXML, 'sign');
		sign.textContent = musicXMLClef[0];
		const line = boundCA(clefXML, 'line');
		line.textContent = musicXMLClef[1];
	}

	return attributesXML;
};

const getMeasuresXML = (
	root: XMLDocument,
	partXML: Element,
	measures: Measure[]
) => {
	const curAttr: MeasureAttributes = {
		metronome: {
			beatNote: 4,
			beatsPerMinute: 60,
		},
		timeSignature: {
			beatNote: 4,
			beatsPerMeasure: 4,
		},
		clef: 'bass',
		keySignature: 'idk',
	};
	const boundCA = createAppend.bind(this, root);

	for (let i = 0; i < measures.length; i++) {
		const measureXML = boundCA(partXML, 'measure');
		measureXML.setAttribute('number', (i + 1).toString());

		const measure = measures[i];
		getMeasureAttributesXML(root, measureXML, measure, curAttr);
		getMeasureNotesXML(
			root,
			measureXML,
			measure.notes,
			curAttr.timeSignature!,
			curAttr.clef!
		);
	}
};

const getPartListXML = (root: XMLDocument, parts: MusicPart[]) => {
	const partList = root.createElement('part-list');

	for (const part of parts) {
		const scorePart = createAppend(root, partList, 'score-part');
		scorePart.setAttribute('id', part.id);

		const pName = createAppend(root, scorePart, 'part-name');
		pName.textContent = part.instrument;
	}

	return partList;
};

// TODO: Add title and instrument appropriately
export const createMusicXMLScore = (score: MusicScore) => {
	const { title, parts } = score;

	const header =
		'<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE score-partwise><score-partwise></score-partwise>';
	const root = new DOMParser().parseFromString(header, 'application/xml');

	const scoreXML = root.getElementsByTagName('score-partwise')[0];
	scoreXML.setAttribute('version', '4.0');

	const partListXML = getPartListXML(root, parts);
	scoreXML.appendChild(partListXML);

	for (let i = 0; i < parts.length; i++) {
		const { measures, id, instrument } = parts[i];

		const partXML = createAppend(root, scoreXML, 'part');
		partXML.setAttribute('id', id);

		getMeasuresXML(root, partXML, measures);
	}

	return root;
};
