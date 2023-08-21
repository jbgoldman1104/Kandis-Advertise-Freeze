import { ReactComponent as IcCheckbox } from '../../../../assets/icons/ic_checkbox.svg';
import { ReactComponent as IcCheckedCheckbox } from '../../../../assets/icons/ic_hors_checkbox.svg';
import React, { forwardRef, ReactNode } from 'react';
import { StyledCheckbox, StyledFormControlLabel } from './styles';

interface HoursCheckboxProps {
	label?: ReactNode;
	checked?: boolean;
	defaultChecked?: boolean;
	className?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean
}

const HoursCheckbox = forwardRef<HTMLInputElement, HoursCheckboxProps>((
	{
		label,
		checked,
		onChange,
		defaultChecked,
		className,
		disabled,
		...props
	}, ref) => {
	return (
		<StyledFormControlLabel
			className={className}
			disabled={disabled}
			control={
				<StyledCheckbox
					{...props}
					checked={checked}
					onChange={onChange}
					color='default'
					icon={<IcCheckbox />}
					checkedIcon={<IcCheckedCheckbox />}
					defaultChecked={defaultChecked}
					inputRef={ref}
				/>
			}
			label={label}
		/>
	);
});

export default HoursCheckbox;