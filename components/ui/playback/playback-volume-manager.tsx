import { FunctionComponent, useState } from 'react';
import classes from './PlaybackVolumeManager.module.css';
import { usePlayback } from '@/components/hooks/usePlayback/usePlayback';
import PlaybackManagerComponent, {
	PlaybackManagerProps,
} from './playback-manager';
import VolumeManager, { VolumeManagerProps } from './volume-manager';
import { PlaybackManager } from '@/utils/audio/playback';
import { MusicScore } from '@/types/music';

interface PlaybackVolumeManagerProps
	extends VolumeManagerProps,
		PlaybackManagerProps {}

const PlaybackVolumeManager: FunctionComponent<PlaybackVolumeManagerProps> = ({
	volumePairs,
	modifyVolume,
	title,
	onPlay,
	onStop,
	onSeek,
	seekPercentage,
	playbackState,
	disableUserSliding,
	stopPlaybackOnButtonSeek,
}) => {
	return (
		<div>
			<VolumeManager volumePairs={volumePairs} modifyVolume={modifyVolume} />
			<PlaybackManagerComponent
				title={title}
				onPlay={onPlay}
				onStop={onStop}
				onSeek={onSeek}
				seekPercentage={seekPercentage}
				playbackState={playbackState}
				disableUserSliding={disableUserSliding}
				stopPlaybackOnButtonSeek={stopPlaybackOnButtonSeek}
			/>
		</div>
	);
};

export default PlaybackVolumeManager;