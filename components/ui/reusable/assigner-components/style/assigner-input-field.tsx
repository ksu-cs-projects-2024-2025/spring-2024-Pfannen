import { FunctionComponent, InputHTMLAttributes, RefObject } from 'react';
import classes from './assigner-input-field.module.css';

// NOTE: This component is here to apply styling to all input fields used for assigner components
// There's no styling right now, but probably will be in the future
interface AssignerInputFieldProps
	extends InputHTMLAttributes<HTMLInputElement> {
	ref1?: RefObject<HTMLInputElement>;
}

const AssignerInputField: FunctionComponent<AssignerInputFieldProps> = ({
	ref1,
	...props
}) => {
	return <input {...props} ref={ref1} className={classes.input} />;
};

export default AssignerInputField;
