import { FunctionComponent, SVGProps } from 'react';
import classes from './WholeNoteSVG.module.css';

interface WholeNoteSVGProps extends SVGProps<SVGSVGElement> {}

const WholeNoteSVG: FunctionComponent<WholeNoteSVGProps> = ({ ...props }) => {
	return (
		<svg
			width="16"
			height="9"
			viewBox="0 0 16 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M7.19249 0.584389C9.32216 0.487766 11.3773 0.72242 13.31 1.58282C15.61 2.60426 16.4086 4.9462 14.9764 6.58878C14.2151 7.46298 13.113 7.93689 11.9576 8.24056C9.05062 9.00894 6.1383 8.95372 3.28987 7.9829C1.03242 7.21452 -0.0909821 5.54894 0.436111 3.74992C0.846072 2.3604 2.37943 1.72545 3.32714 1.31136C4.83388 0.648803 6.28205 0.565984 7.19249 0.584389ZM10.978 5.67777C10.978 5.53053 10.9939 5.3833 10.978 5.24067C10.7916 3.63029 10.206 2.19936 8.41172 1.41258C6.93693 0.76383 5.1906 1.59662 5.00958 3.00455C4.83388 4.40787 5.18527 5.71457 6.16492 6.85564C6.67604 7.45378 7.33624 7.94609 8.2307 8.03351C10.0942 8.20835 11.0312 7.38476 10.9833 5.68237L10.978 5.67777Z"
				fill="#F4F9FA"
			/>
		</svg>
	);
};

export default WholeNoteSVG;
