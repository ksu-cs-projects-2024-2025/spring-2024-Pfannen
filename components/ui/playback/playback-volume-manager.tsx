import { FunctionComponent } from 'react';
import PlaybackManagerComponent, {
	PlaybackManagerProps,
} from './playback-manager';
import VolumeManager, { VolumeManagerProps } from './volume-manager';

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
		<>
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
			<VolumeManager volumePairs={volumePairs} modifyVolume={modifyVolume} />
		</>
	);
};

export default PlaybackVolumeManager;
