import { FC, forwardRef, ReactNode, InputHTMLAttributes } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames';
import { ReactComponent as IcError } from '../../../../assets/icons/ic_error.svg';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label: string;
	icon: ReactNode;
	errorMessage?: string | boolean;
	errors?: any
}

const FormInput: FC<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(
	({ className, label, icon, errors, errorMessage, ...rest }, ref) => {
		return (
			<>
				<label className={classNames(styles.label, errors && styles.error)}>
					<input className={classNames(styles.input, className)} type='text' placeholder={label} ref={ref} {...rest} />
					<i className={styles.icon}>{icon}</i>
				</label>
				{errors && <span className={styles.errorMessage}><IcError />{errorMessage}</span>}
			</>
		);
	}
);

export default FormInput;