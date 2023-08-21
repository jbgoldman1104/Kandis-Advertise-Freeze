import React, { FC, InputHTMLAttributes, useCallback } from 'react';
import styles from './DropArea.module.scss';
import { ReactComponent as IcImage } from '../../../../assets/icons/ic_image.svg';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as IcError } from '../../../../assets/icons/ic_error.svg';
import classNames from 'classnames';

interface DropAreaProps extends InputHTMLAttributes<HTMLInputElement> {
	onAcceptedFiles: (acceptedFiles: File[]) => void;
	multiple?: boolean;
	errors?: any;
	errorMessage?: any;
}

const DropArea: FC<DropAreaProps> = ({ onAcceptedFiles, multiple, errors, errorMessage }) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {

		onAcceptedFiles(acceptedFiles);
	}, [onAcceptedFiles]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': []
		},
		multiple
	});

	return (
		<>
			<div className={classNames(styles.dropArea, errors && styles.error)} {...getRootProps()}>
				<input {...getInputProps()} />
				<div className={styles.label}>
					<IcImage />
					{isDragActive ? (
						<h5>Drop the files here ...</h5>
					) : (
						<>
							{
								errors ?
									<h5 className={styles.errorMessage}><IcError />{errorMessage}</h5>
									:
									<>
										<h5>Choose a file or drag it here</h5>
										<p>Max image size: 2MB</p>
									</>
							}
						</>
					)}
				</div>
			</div>
			<div className={styles.aboutDropImage}>
				<span>Recommended image size: 512x200</span>
				<span>Acceptable formats: JPG, PNG, SVG</span>
			</div>
		</>
	);
};

export default DropArea;
