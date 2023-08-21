import styles from './DescriptionArea.module.scss';
import React, { FC, forwardRef, TextareaHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as IcError } from '../../../../assets/icons/ic_error.svg';

interface DescriptionAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
	onChange: any;
	value: string;
	errors?: any
	errorMessage?: any
	onBlur?: () => void
}

const DescriptionArea: FC<DescriptionAreaProps> = forwardRef<HTMLTextAreaElement, DescriptionAreaProps>(
	({ className, onChange, value, errors, errorMessage, onBlur, ...rest }, ref) => {
		const [length, setLength] = useState<number>(0);
		const condition = length > 300;

		const setValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setLength(event.target.value.length);
			onChange(event);
		};

		return (
			<>
				<div className={styles.wrapper}>
				<textarea
					{...rest}
					onBlur={onBlur}
					placeholder={'Write a description...'}
					className={styles.descriptionArea}
					onChange={setValue}
					ref={ref}
					value={value}
				/>
					<div className={styles.messages}>
						{
							errorMessage ?
								<span className={classNames(styles.errorMessage, styles.error)}>
									<IcError />
									{errorMessage}
								</span>
								:
								<span></span>
						}

						<span className={classNames(styles.errorMessage, condition && styles.error)}>
							{condition && <IcError />}
							{length}/300
						</span>
					</div>
				</div>
			</>
		);
	}
);

export default DescriptionArea;