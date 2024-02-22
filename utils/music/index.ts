import { NoteType } from '@/components/providers/music/types';
import { Clef } from '@/types/music';

export const getSecondsPerBeat = (bpm: number) => 1 / (bpm / 60);

export const getMeasureXStart = (xPos: number, beatsPerMeasure: number) =>
	Math.floor(xPos / beatsPerMeasure);

const clefBasePitchOctave: { [key in Clef]: string } = {
	alto: 'F3',
	bass: 'G2',
	treble: 'E4',
};

export const getNoteFromYPos = (yPos: number, clef: Clef) => {
	const basePitchOctave = clefBasePitchOctave[clef];
	const pitch = basePitchOctave[0];
	const octave = +basePitchOctave[1];

	// If yPos is -1, floor(-1/7) is -1 and we don't want that
	const octaveSteps = Math.floor(Math.abs(yPos) / 7) * Math.sign(yPos);
	const pitchSteps = yPos % 7;

	let targetOctave = octave + octaveSteps;
	let targetPitch = pitch.charCodeAt(0) + pitchSteps;

	// Could've gone too far right with pitch
	if (yPos > 0) {
		if (targetPitch > 'G'.charCodeAt(0)) {
			const overflow = targetPitch - 'G'.charCodeAt(0);
			// If we overflowed 1, that means we want an A
			targetPitch = 'A'.charCodeAt(0) + (overflow - 1);
			// If we had to scale up to reach the target pitch, that means anytime the target pitch is above or equal to a C AND we had overflow, it's an octave higher
			if (targetPitch >= 'C'.charCodeAt(0)) targetOctave += 1;
		}
	}
	// Could've gone too far left with pitch
	else if (yPos < 0) {
		if (targetPitch < 'A'.charCodeAt(0)) {
			const overflow = 'A'.charCodeAt(0) - targetPitch;
			// If we overflowed 1, that means we want a G
			targetPitch = 'G'.charCodeAt(0) - (overflow - 1);
			// If we had to scale down to reach the target pitch, that means anytime the target pitch is lower than a C AND we had overflow, it's an octave lower
			if (targetPitch < 'C'.charCodeAt(0)) targetOctave -= 1;
		}
	}

	return String.fromCharCode(targetPitch) + targetOctave;
};

export const getYPosFromNote = (note: string, clef: Clef) => {
	const basePitchOctave = clefBasePitchOctave[clef];
	const basePitch = basePitchOctave[0];
	const baseOctave = +basePitchOctave[1];

	const targetPitch = note[0];
	const targetOcatve = +note[1];

	// Get into the right octave
	const octaveSteps = targetOcatve - baseOctave;
	// Convert base pitch to a C in targetOctave -> now we know that targetPitch MUST be a positive distance from us
	let stepsToC = 'C'.charCodeAt(0) - basePitch.charCodeAt(0);
	// If stepsToC is positive, we'll end up in the next octave's C, so we need to subtract 7
	if (stepsToC > 0) stepsToC -= 7;
	// Calculate the number of steps to reach the target pitch from
	let stepsToTargetPitch = targetPitch.charCodeAt(0) - 'C'.charCodeAt(0);
	// If the steps are negative, we'll end up going to the previous octave's pitchTarget, so we need to add 7
	if (stepsToTargetPitch < 0) stepsToTargetPitch += 7;

	// Add all the results, factoring in stepsToC
	const yPos = octaveSteps * 7 + stepsToC + stepsToTargetPitch;

	return yPos;
};

const quarterDurationToNoteType: { [key in number]: NoteType } = {
	4: 'whole',
	3: 'dotted-half',
	2: 'half',
	1.5: 'dotted-quarter',
	1: 'quarter',
	0.75: 'dotted-eighth',
	0.5: 'eighth',
	0.375: 'dotted-sixteenth',
	0.25: 'sixteenth',
	0.1875: 'dotted-thirtysecond',
	0.125: 'thirtysecond',
};

const noteTypeToQuarterNoteDuration: { [key in NoteType]: number } = {
	whole: 4,
	'dotted-half': 3,
	half: 2,
	'dotted-quarter': 1.5,
	quarter: 1,
	'dotted-eighth': 0.75,
	eighth: 0.5,
	'dotted-sixteenth': 0.375,
	sixteenth: 0.25,
	'dotted-thirtysecond': 0.1875,
	thirtysecond: 0.125,
};

// The duration of note with respect to a quarter note (i.e. an eighth note in 3/8 has duration 1, but in 4/4 it's 0.5)
export const getQuarterNoteDuration = (duration: number, beatNote: number) => {
	// Calculate what we need to multiply the duration by to get its quarter note duration
	const multiplier = 4 / beatNote;

	// Multiply the duration by the multiplier
	const quarterDuration = duration * multiplier;

	return quarterDuration;
};

export const durationToNoteType = (duration: number, beatNote: number) => {
	const quarterDuration = getQuarterNoteDuration(duration, beatNote);

	if (quarterDuration in quarterDurationToNoteType) {
		return quarterDurationToNoteType[quarterDuration];
	} else {
		console.error("Quarter duration doesn't have a type:\n ");
		console.error({ quarterDuration, duration });
		return 'quarter';
	}
};

export const getQuarterNoteDurationFromNoteType = (noteType: NoteType) => {
	if (noteType in noteTypeToQuarterNoteDuration) {
		return noteTypeToQuarterNoteDuration[noteType];
	} else {
		console.error('Note type not supported:\n ');
		console.error({ noteType });
		return 1;
	}
};

export const noteTypeIsDotted = (noteType: NoteType) =>
	noteType.startsWith('dotted-');