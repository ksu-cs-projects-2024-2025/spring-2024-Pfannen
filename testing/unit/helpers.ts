import { Note, NoteType } from '@/components/providers/music/types';
import {
	SelectionData,
	SelectionMetadata,
} from '@/types/modify-score/assigner';
import { MeasureAttributes } from '@/types/music';
import { NoteAnnotations } from '@/types/music/note-annotations';
import { getNoteTypes } from '../../utils/music';

export const createNote = (annotations?: NoteAnnotations) => {
	const note: Note = {
		x: 0,
		y: 0,
		type: 'quarter',
		annotations,
	};

	return note;
};

type CreateParams = {
	annotations: NoteAnnotations;
} & SelectionData;

export const createSelection = (params: Partial<CreateParams> = {}) => {
	const { annotations, rollingAttributes, nonRollingAttributes } = params;
	const selection: SelectionData = {
		measureIndex: params.measureIndex || 0,
		measureNotes: params.measureNotes || [],
		xStart: params.xStart || 0,
		xEnd: params.xEnd || params.xStart || 1,
		y: params.y || 0,
		// Don't care to populate if it's present
		rollingAttributes: rollingAttributes || ({} as MeasureAttributes),
		nonRollingAttributes: nonRollingAttributes || {},
	};

	if (annotations) selection.note = createNote(annotations);

	return selection;
};

export const checkMetadata = <T extends {}>(
	metadata: SelectionMetadata<T>,
	check: { [key in keyof T]?: boolean }
) => {
	const keys = Object.keys(check) as (keyof T)[];
	for (const key of keys) {
		if (!metadata[key]) return false;
		else if (metadata[key]!.allSelectionsHave !== check[key]) return false;
	}

	return true;
};

export const validateGreatestNoteType = (
	validTypes: Set<NoteType> | null,
	expectedGreatestType?: NoteType
) => {
	if (!expectedGreatestType)
		return validTypes === null || validTypes.size === 0;
	if (!validTypes) return false;

	const noteTypes = getNoteTypes();
	let passedGreatestType = false;
	for (const noteType of noteTypes) {
		if (noteType === expectedGreatestType) passedGreatestType = true;

		if (passedGreatestType) {
			if (!validTypes.has(noteType)) return false;
		} else if (validTypes.has(noteType)) return false;
	}

	return true;
};