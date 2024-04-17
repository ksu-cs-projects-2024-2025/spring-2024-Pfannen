export const fractionToPercent = (val: number) => numToUnit(val, '%');

export const numToUnit = (val: number, unit: 'px' | '%') => {
	if (unit === '%') {
		val *= 100;
	}
	return val + unit;
};

export const numIsUndefined = <T>(val?: number) =>
	val === undefined ? false : true;

export const isOnClient = () => typeof window !== 'undefined';

export const loadFile = async (
	file: File,
	readAs: 'text' | 'array' | 'url'
): Promise<string | ArrayBuffer | null> => {
	return new Promise((res) => {
		const fileReader = new FileReader();
		fileReader.onload = (event) => {
			if (!event.target) return res(null);
			else res(event.target.result);
		};

		if (readAs === 'text') fileReader.readAsText(file);
		else if (readAs === 'array') fileReader.readAsArrayBuffer(file);
		else fileReader.readAsDataURL(file);
	});
};
