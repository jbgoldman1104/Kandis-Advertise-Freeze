import React, { FC } from 'react';
import styles from './Modal.module.scss'
import { StyledModal } from './styles';
import { DialogProps } from '@mui/material/Dialog/Dialog';

interface DialogModalProps extends DialogProps {
	modalTitle: string
}

const Modal: FC<DialogModalProps> = ({ onClose, open, modalTitle, children }) => {
	return (
		<StyledModal scroll={'body'} onClose={onClose} open={open}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<p>{modalTitle}</p>
				</div>
				<div className={styles.body}>
					{children}
				</div>
			</div>
		</StyledModal>
	);
};

export default Modal;