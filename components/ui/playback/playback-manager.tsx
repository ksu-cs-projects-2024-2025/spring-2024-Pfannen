import { FunctionComponent } from 'react';
import classes from './playback-manager.module.css';
import SeekSlider from './buttons/seek-slider';
import SeekButton from './buttons/seek-button';
import PlayStopSwapper from './buttons/play-stop-button-swapper';
import { BasicPlaybackState } from 'tone';
import { concatClassNames } from '@/utils/css';
import { MusicPlaybackState } from '@/types/audio/volume';
import Spinner from '../reusable/feedback/spinner';

export interface PlaybackManagerProps {
	title?: string;
	onPlay: () => void;
	onStop: () => void;
	onSeek: (seekPercent: number) => void;
	seekPercentage?: number;
	playbackState?: MusicPlaybackState;
	disableUserSliding?: boolean;
	stopPlaybackOnButtonSeek?: boolean;
}

const PlaybackManager: FunctionComponent<PlaybackManagerProps> = ({
	title,
	onPlay,
	onStop,
	onSeek,
	seekPercentage,
	playbackState,
	disableUserSliding,
	stopPlaybackOnButtonSeek = true,
}) => {
	const disabled =
		!playbackState ||
		playbackState === 'requires enqueue' ||
		playbackState === 'enqueueing';

	return (
		<div
			className={concatClassNames(
				classes.playback_manager,
				classes[playbackState || '']
			)}
		>
			<h1 className={classes.title}>{title || 'Playback Manager'}</h1>
			<div className={classes.playback_buttons}>
				<SeekButton
					onClick={() => {
						onSeek(0);
						stopPlaybackOnButtonSeek && onStop();
					}}
					disabled={disabled}
				/>
				<PlayStopSwapper
					onClick={(play) => (play ? onPlay() : onStop())}
					playbackState={playbackState}
				/>
				<SeekButton
					onClick={() => {
						onSeek(1);
						stopPlaybackOnButtonSeek && onStop();
					}}
					right
					disabled={disabled}
				/>
			</div>
			<div className={classes.slider_container}>
				<SeekSlider
					onSeek={onSeek}
					seekPercentage={seekPercentage}
					disableUserSliding={disableUserSliding || disabled}
				/>
			</div>
			{playbackState === 'enqueueing' && <Spinner />}
		</div>
	);
};

export default PlaybackManager;
