import { useState } from 'react';
import { Measure } from '../../types';
import { MeasureFetcher, MeasureModifier } from './utils';
import { deepyCopy } from '@/utils';

const useMeasures = (initialMeasures?: Measure[]) => {
	const [measures, setMeasures] = useState<Measure[]>(initialMeasures || []);

	const invokeMeasureModifier = (del: ReturnType<MeasureModifier<any>>) => {
		setMeasures((prevState) => {
			const copyState = [...prevState];
			const getMeasures: MeasureFetcher = (index, count) => {
				if (index === undefined || !count) {
					return copyState;
				}
				const copiedMeasures = [];
				for (let i = 0; i < count; i++) {
					const copyMeasure = deepyCopy(copyState[i + index]);
					copyState[i + index] = copyMeasure;
					copiedMeasures.push(copyMeasure);
				}
				return copiedMeasures;
			};

			if (del(getMeasures) === false) return prevState; //Delegate could not perform the requested modification so no state is needed to be updated
			return copyState;
		});
	};

	const replaceMeasures = (measures: Measure[]) => {
		setMeasures(measures);
	};

	const getMeasures = (index: number, count: number, copy = false) => {
		const slicedMeasures = measures.slice(index, index + count);
		if (copy) {
			return deepyCopy(slicedMeasures);
		}
		return slicedMeasures;
	};

	return {
		measures,
		replaceMeasures,
		invokeMeasureModifier,
		getMeasures,
	};
};

useMeasures.initialState = {
	measures: [],
	invokeMeasureModifier: () => {},
	getMeasures: () => [],
	replaceMeasures: () => {},
};

export default useMeasures;
