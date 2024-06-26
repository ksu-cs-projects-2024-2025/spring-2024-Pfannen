import {
	ChangeEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';
import ModifyMusicAssigner from './style/modify-music-assigner-button';
import AssignerInputLayout from './style/assigner-input-layout';
import AssignerDropdownField, {
	DropdownItem,
} from './style/assigner-dropdown-field';
import { IGenericAssignerComponent } from '@/types/modify-score/assigner';
import {
	assignerShouldAddValue,
	assignerShouldDisable,
	getAssignValue,
} from '@/utils/music/modify-score/metadata-helpers';
import { indexIsValid } from '@/utils';

export type AssignerDropdownItemDisplay<T = string> = DropdownItem<T> & {
	el: ReactNode;
};

interface AssignerDropdownProps<T, K extends keyof T>
	extends Omit<IGenericAssignerComponent<T, K>, 'children'> {
	label: string;
	children: AssignerDropdownItemDisplay<T[K]>[];
	defaultSelectedIdx?: number;
}

const AssignerDropdown = <T, K extends keyof T>({
	assigner,
	label,
	children,
	tKey,
	metadataEntry,
	defaultSelectedIdx,
}: AssignerDropdownProps<T, K>) => {
	const [selectedItem, setSelectedItem] = useState<
		AssignerDropdownItemDisplay<T[K]>
	>(() => {
		if (
			defaultSelectedIdx !== undefined &&
			indexIsValid(defaultSelectedIdx, children.length)
		)
			return children[defaultSelectedIdx];
		else return children[0];
	});

	/*const dropdownRef = useRef<HTMLSelectElement>(null);
	 useEffect(() => {
		if (selectedItem === metadataEntry?.value) return;
		const idx = children.findIndex(
			({ value }) => value === metadataEntry?.value
		);
		if (idx !== -1) {
			setSelectedItem(children[idx]);
			if (dropdownRef.current) dropdownRef.current.selectedIndex = idx;
		}
	}, [metadataEntry, children]); */

	const assignValue = getAssignValue<T, K>(selectedItem.value, metadataEntry);
	const disabled = assignerShouldDisable(metadataEntry);
	const add = assignerShouldAddValue(assignValue);

	const onOptionSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
		const newSelectedItem = children[event.target.selectedIndex];
		if (newSelectedItem !== selectedItem) setSelectedItem(newSelectedItem);
		/* if (dropdownRef.current)
			dropdownRef.current.selectedIndex = event.target.selectedIndex; */
	};

	return (
		<AssignerInputLayout disabled={disabled}>
			<label htmlFor={label}>{label}: </label>
			<AssignerDropdownField<T[K]>
				id={label}
				onChange={onOptionSelected}
				disabled={disabled}
				defaultValue={JSON.stringify(selectedItem.value)}
				//inputRef={dropdownRef}
			>
				{children}
			</AssignerDropdownField>
			<ModifyMusicAssigner
				onClick={() => assigner(tKey, assignValue)}
				disabled={disabled}
				add={add}
			>
				{selectedItem.el}
			</ModifyMusicAssigner>
		</AssignerInputLayout>
	);
};

export default AssignerDropdown;
