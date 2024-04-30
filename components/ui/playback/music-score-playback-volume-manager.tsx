import { FunctionComponent, useEffect } from 'react';
import classes from './music-score-playback-volume-manager.module.css';
import { usePlayback } from '@/components/hooks/usePlayback/usePlayback';
import { useMusic } from '@/components/providers/music';
import PlaybackManager from './playback-manager';
import MusicScoreVolumeManager from './volume-manager/music-score-volume-manager';

interface MusicScorePlaybackVolumeManagerProps {
	setImportedAudioLifter?: (setImportedAudioDel: () => void) => void;
}

const MusicScorePlaybackVolumeManager: FunctionComponent<
	MusicScorePlaybackVolumeManagerProps
> = ({ setImportedAudioLifter }) => {
	const {
		setScore,
		setImportedAudio,
		playMusic,
		stopMusic,
		seekMusic,
		playbackManager,
		musicVolumePairMap,
		playbackState,
		seekPercentage,
	} = usePlayback();
	const {
		scoreItems: { musicScore },
	} = useMusic();

	useEffect(() => {
		console.log('Music score changed!');
	}, [musicScore]);

	if (setImportedAudioLifter) setImportedAudioLifter(setImportedAudio);

	return (
		<div className={classes.managers_container}>
			<PlaybackManager
				onPlay={async () => {
					await setScore(musicScore);
					playMusic();
				}}
				onStop={stopMusic}
				onSeek={seekMusic}
				playbackState={playbackState}
				seekPercentage={seekPercentage}
				title={musicScore.title}
			/>
			<MusicScoreVolumeManager
				modifyVolume={playbackManager.modifyVolume}
				musicVolumePairs={musicVolumePairMap}
			/>
		</div>
	);
};

export default MusicScorePlaybackVolumeManager;
