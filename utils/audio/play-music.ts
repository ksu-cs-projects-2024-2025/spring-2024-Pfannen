import * as Tone from 'tone';
import { Measure } from '@/components/providers/music/types';
import { getNoteFromYPos, getSecondsPerBeat } from '../music';
import { MeasureAttributes, MusicScore } from '@/types/music';
import { getNoteDuration } from '@/components/providers/music/utils';
import { applyKeySignature } from '../music/key-signature';

const initializeAttributes = (initialMeasure: Measure) => {
	const { attributes } = initialMeasure;
	const metronome = attributes?.metronome || {
		beatNote: 4,
		beatsPerMinute: 136,
	};
	const timeSignature = attributes?.timeSignature || {
		beatNote: 4,
		beatsPerMeasure: 4,
	};
	const keySignature = attributes?.keySignature || '0';
	const clef = attributes?.clef || 'treble';
	return {
		metronome,
		timeSignature,
		keySignature,
		clef,
	} as MeasureAttributes;
};

const updateAttributes = (
	currentAttributes: MeasureAttributes,
	measure: Measure
) => {
	const { attributes } = measure;
	if (!attributes) return;

	const { metronome, timeSignature, keySignature, clef } = attributes;

	if (metronome) currentAttributes.metronome = metronome;
	if (timeSignature) currentAttributes.timeSignature = timeSignature;
	if (keySignature) currentAttributes.keySignature = keySignature;
	if (clef) currentAttributes.clef = clef;
};

// TODO: Take in instrument, extract measure attributes
export const playMeasures = (measures: Measure[]) => {
	const now = Tone.now();
	const synth = new Tone.PolySynth(Tone.Synth).toDestination();

	let curX = 0;
	const attributes = initializeAttributes(measures[0]);

	for (let i = 0; i < measures.length; i++) {
		const measure = measures[i];
		updateAttributes(attributes, measure);

		const { metronome, timeSignature, clef, keySignature } = attributes;

		const secondsPerBeat = getSecondsPerBeat(metronome.beatsPerMinute);

		for (const { x, y, type } of measure.notes) {
			const noteDuration = getNoteDuration(type, timeSignature.beatNote);
			const pitchOctave = getNoteFromYPos(y, clef);
			applyKeySignature(keySignature, pitchOctave);

			const { pitch, octave, accidental } = pitchOctave;
			const fullNote = pitch + (accidental || '') + octave;
			console.log(fullNote);

			synth.triggerAttackRelease(
				fullNote,
				noteDuration * secondsPerBeat,
				now + (curX + x) * secondsPerBeat
			);
			
		}
		curX = (i + 1) * timeSignature.beatsPerMeasure;
	}
};

export const ohWhatANight: Measure[] = [
	{
		attributes: {
			metronome: {
				beatNote: 4,
				beatsPerMinute: 106,
			},
			timeSignature: {
				beatNote: 4,
				beatsPerMeasure: 4,
			},
			keySignature: 0,
			clef: 'bass',
		},
		notes: [
			{ x: 0, y: 4, type: 'dotted-eighth' },
			{ x: 0.75, y: 5, type: 'sixteenth' },
			{ x: 1.5, y: 6, type: 'eighth' },
			{ x: 2.25, y: 7, type: 'sixteenth' },
			{ x: 2.5, y: 7, type: 'eighth' },
			{ x: 3, y: 7, type: 'eighth' },
			{ x: 3.5, y: 6, type: 'eighth' },
		],
	},
	{
		notes: [
			{ x: 0, y: 7, type: 'eighth' },
			{ x: 0.5, y: 7, type: 'sixteenth' },
			{ x: 0.75, y: 7, type: 'sixteenth' },
			{ x: 1.5, y: 8, type: 'dotted-eighth' },
			{ x: 2.25, y: 5, type: 'sixteenth' },
			{ x: 2.5, y: 1, type: 'eighth' },
			{ x: 3, y: 2, type: 'eighth' },
			{ x: 3.5, y: 3, type: 'eighth' },
		],
	},
	{
		notes: [
			{ x: 0, y: 4, type: 'eighth' },
			{ x: 0.5, y: 5, type: 'sixteenth' },
			{ x: 0.75, y: 5, type: 'sixteenth' },
			{ x: 1.25, y: 6, type: 'sixteenth' },
			{ x: 1.5, y: 6, type: 'eighth' },
			{ x: 2.25, y: 7, type: 'sixteenth' },
			{ x: 2.5, y: 7, type: 'eighth' },
			{ x: 3, y: 7, type: 'eighth' },
			{ x: 3.5, y: 6, type: 'eighth' },
		],
	},
	{
		notes: [
			{ x: 0, y: 7, type: 'eighth' },
			{ x: 0.5, y: 7, type: 'sixteenth' },
			{ x: 0.75, y: 7, type: 'sixteenth' },
			{ x: 1.5, y: 8, type: 'dotted-eighth' },
			{ x: 2.25, y: 8, type: 'sixteenth' },
			{ x: 2.5, y: 1, type: 'eighth' },
			{ x: 3, y: 2, type: 'eighth' },
			{ x: 3.5, y: 3, type: 'eighth' },
		],
	},
];

export const ohWhatANightScore: MusicScore = {
	title: 'Oh What a Night!',
	parts: [
		{
			attributes: {
				instrument: 'Bass Guitar',
				id: 'P1',
				name: 'Bass Guitar',
			},
			measures: ohWhatANight,
		},
	],
};
