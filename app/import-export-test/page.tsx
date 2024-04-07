'use client';

import ImportExportPage from '@/components/ui/import-export-test';
import classes from './index.module.css';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useMusic } from '@/components/providers/music';
import VolumeManager from '@/components/ui/volume-manager';
import { PlaybackManager } from '@/utils/audio/playback';
import { VolumePair } from '@/types/audio/volume';
import { usePlayback } from '@/components/hooks/usePlayback/usePlayback';
import AnnotationsAssignerButtonSet from '@/components/ui/reusable/assigner-components/annotations/annotations-assigner-button-set';
import NotePlacementAssigner from '@/components/ui/reusable/assigner-components/place-note/buttons/note-placement-assigner';
import NotePlacementAssignerButtonSet from '@/components/ui/reusable/assigner-components/place-note/note-placement-assigner-button-set';
import AssignerButtonRepo from '@/components/ui/reusable/assigner-components/assigner-button-repo';

type ImportExportTestPageProps = {};

const ImportExportTestPage: FunctionComponent<
	ImportExportTestPageProps
> = () => {
	const { setScore, setImportedAudio, playMusic, volumeModifier, volumePairs } =
		usePlayback();
	const { musicScore, setNewMusicScore, replaceMeasures } = useMusic();

	return (
		<>
			<ImportExportPage
				setScore={(score) => {
					setScore(score);
					setNewMusicScore(score);
				}}
				setImportedAudio={setImportedAudio}
				play={playMusic}
			/>
			<VolumeManager
				volumePairs={volumePairs}
				modifyVolume={volumeModifier.modifyVolume}
			/>
			<AssignerButtonRepo />
		</>
	);
};

export default ImportExportTestPage;
