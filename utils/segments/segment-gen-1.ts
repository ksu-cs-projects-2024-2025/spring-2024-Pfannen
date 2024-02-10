import { SegmentBeat } from '@/components/providers/music/types';
import { SegmentCount, SegmentGenerator } from '@/components/ui/measure/types';

const rightHandSplits: { [key: number]: SegmentBeat } = {
	0.5: 0.5,
	0.25: 0.25,
	0.75: 0.25,
	0.125: 0.125,
	0.375: 0.125,
	0.625: 0.125,
	0.875: 0.125,
};
const smallestSegmentBeat = 0.125;

export const segmentGen1: SegmentGenerator = (xPos1: number, xPos2: number) => {
	const distance = xPos2 - xPos1; //The distance that needs to be covered
	let remainingDistance = distance; //The total distance covered
	const segmentCounts: SegmentCount[] = []; //The segments that will fill the distance

	// Normalize xPos1 and xPos2
	xPos2 = xPos2 - Math.floor(xPos1);
	xPos1 = xPos1 - Math.floor(xPos1);

	while (xPos1 in rightHandSplits && remainingDistance > 0) {
		let beat = rightHandSplits[xPos1];
		while (beat > remainingDistance && beat >= smallestSegmentBeat) beat /= 2;

		if (beat < smallestSegmentBeat) return [];

		segmentCounts.push({
			segmentBeat: beat,
			count: 1,
		});

		xPos1 += beat;
		remainingDistance -= beat;
	}

	let currentBeat: SegmentBeat = 1; //The segment length to start with
	while (remainingDistance > 0 && currentBeat >= smallestSegmentBeat) {
		//While the distance hasn't been fully covered
		const segmentCount = Math.floor(remainingDistance / currentBeat); //How many whole segments can be placed in the current distance
		remainingDistance -= segmentCount * currentBeat; //The distance that the whole segments cover
		if (segmentCount) {
			segmentCounts.push({
				segmentBeat: currentBeat as SegmentBeat,
				count: segmentCount,
			}); //Add the segment to the list of counts
		}
		currentBeat /= 2; //Try the next biggest segment length
	}

	if (currentBeat < smallestSegmentBeat) return [];

	return segmentCounts;
};

const isDownBeat = (currentPosition: number) => {
	return Math.floor(currentPosition) === currentPosition; //Is down beat if there is no fractional part of current position
};
