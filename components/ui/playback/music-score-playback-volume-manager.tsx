import { FunctionComponent, useEffect } from 'react';
import { usePlayback } from '@/components/hooks/usePlayback/usePlayback';
import { useMusic } from '@/components/providers/music';
import { useSecondsToMeasureIndex } from '@/components/hooks/usePlayback/useSecondsToMeasureIndex';
import PBVManagerMain from './styles/pbv-manager-main';
import { MusicPlaybackManager } from '@/utils/audio/music-playback';

interface MusicScorePlaybackVolumeManagerProps {
	setImportedAudioLifter?: (setImportedAudioDel: () => void) => void;
	initialPBM?: MusicPlaybackManager;
}

const MusicScorePlaybackVolumeManager: FunctionComponent<
	MusicScorePlaybackVolumeManagerProps
> = ({ setImportedAudioLifter, initialPBM }) => {
	const {
		setScore,
		newScoreEncountered,
		setImportedAudio,
		playMusic,
		stopMusic,
		seekMusic,
		playbackManager,
		musicVolumePairMap,
		playbackState,
		seekPercentage,
	} = usePlayback(initialPBM);
	const {
		scoreItems: { musicScore },
		measuresItems: { measures },
	} = useMusic();

	useEffect(() => {
		console.log('Music score changed!');
		newScoreEncountered(musicScore);
		seekMusic(0);
	}, [musicScore]);

	// Currently spams the delegate during playback
	if (setImportedAudioLifter) setImportedAudioLifter(setImportedAudio);

	const { measureIdx } = useSecondsToMeasureIndex(
		seekPercentage * playbackManager.getMaxDuration(),
		measures
	);
	// console.log({ measureIdx });

	return (
		<>
			<PBVManagerMain
				onPlay={async () => {
					/* await setScore(musicScore); */
					playMusic();
				}}
				onStop={stopMusic}
				onSeek={seekMusic}
				playbackState={playbackState}
				seekPercentage={seekPercentage}
				title={musicScore.title}
				modifyVolume={playbackManager.modifyVolume}
				musicVolumePairs={musicVolumePairMap}
			/>
		</>
	);
};

export default MusicScorePlaybackVolumeManager;
