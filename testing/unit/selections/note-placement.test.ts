import { SelectionData } from '../../../types/modify-score/assigner';
import { createSelection, validateGreatestNoteType } from '../helpers';
import { MeasureAttributes } from '../../../types/music';
import { getValidNotePlacementTypes } from '../../../utils/music/modify-score/assigner';

// #region 4/4

test('4/4: x: 0', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'whole')).toBeTruthy();
});

test('4/4: x: 0, x: 1', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 0 }),
		createSelection({ rollingAttributes, xStart: 1 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'half')).toBeTruthy();
});

test('4/4: x: 3', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 3 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'quarter')).toBeTruthy();
});

test('4/4: x: 2, x: 3.5', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 2 }),
		createSelection({ rollingAttributes, xStart: 3.5 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'eighth')).toBeTruthy();
});

test('4/4: x: 0.25', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 0.25 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'sixteenth')).toBeTruthy();
});

test('4/4: x: 0, x: 3, x: 2.5, x: 3.5, x: 0.75', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 0 }),
		createSelection({ rollingAttributes, xStart: 3 }),
		createSelection({ rollingAttributes, xStart: 2.5 }),
		createSelection({ rollingAttributes, xStart: 3.5 }),
		createSelection({ rollingAttributes, xStart: 0.75 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'sixteenth')).toBeTruthy();
});

// #endregion

// #region 3/4

test('3/4: x: 0', () => {
	const rollingAttributes = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'half')).toBeTruthy();
});

// #endregion

// #region 4/4, 3/4

test('4/4 ; 3/4: x: 0 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'half')).toBeTruthy();
});

test('4/4 ; 3/4: x: 1 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 1 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'half')).toBeTruthy();
});

test('4/4 ; 3/4: x: 2 ; x: 1', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 2 }),
		createSelection({ rollingAttributes: rA2, xStart: 2 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'quarter')).toBeTruthy();
});

// #endregion

// #region 4/4, 3/8

test('4/4 ; 3/8: x: 0 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 8,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'quarter')).toBeTruthy();
});

test('4/4 ; 3/8: x: 0 ; x: 2', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 8,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0 }),
		createSelection({ rollingAttributes: rA2, xStart: 2 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'eighth')).toBeTruthy();
});

test('4/4 ; 3/8: x: 0.25 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 3,
			beatNote: 8,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0.25 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'sixteenth')).toBeTruthy();
});

// #endregion

// #region 2/2, 4/4

test('2/2 ; 4/4: x: 0 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 2,
			beatNote: 2,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'whole')).toBeTruthy();
});

test('2/2 ; 4/4: x: 0.5 ; x: 0', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 2,
			beatNote: 2,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0.5 }),
		createSelection({ rollingAttributes: rA2, xStart: 0 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'quarter')).toBeTruthy();
});

test('2/2 ; 4/4: x: 0 ; x: 2', () => {
	const rA1 = {
		timeSignature: {
			beatsPerMeasure: 2,
			beatNote: 2,
		},
	} as MeasureAttributes;
	const rA2 = {
		timeSignature: {
			beatsPerMeasure: 4,
			beatNote: 4,
		},
	} as MeasureAttributes;

	const selections: SelectionData[] = [
		createSelection({ rollingAttributes: rA1, xStart: 0 }),
		createSelection({ rollingAttributes: rA2, xStart: 2 }),
	];

	const validTypes = getValidNotePlacementTypes(selections);
	expect(validateGreatestNoteType(validTypes, 'half')).toBeTruthy();
});

// #endregion
