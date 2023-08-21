import React, { FC, forwardRef, ReactNode } from 'react';
import { StyledCheckbox, StyledFormControlLabel } from './styles';
import { ReactComponent as IcCheckbox } from '../../assets/icons/ic_radioButton.svg'
import { ReactComponent as IcCheckedCheckbox } from '../../assets/icons/ic_chekedRadioButton.svg'


interface CheckboxProps {
	label?: ReactNode;
	checked?: boolean;
	defaultChecked?: boolean;
	className?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean
}

const AdvetiseCheckbox = forwardRef<HTMLInputElement, CheckboxProps>((
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

export default AdvetiseCheckbox;