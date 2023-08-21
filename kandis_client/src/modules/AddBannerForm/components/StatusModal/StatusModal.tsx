import { FC } from 'react';
import styles from './StatusModal.module.scss'
import Modal from '../../../../components/Modal/Modal';
import { ReactComponent as IcFailed} from '../../../../assets/icons/ic_failed.svg';
import { ReactComponent as IcCompleted } from '../../../../assets/icons/ic_completed.svg';
import { CloseButton } from './styles';

interface StatusModalProps {
	type: 'failed' | 'completed'
	onClose: () => void
	open: boolean
}

const StatusModal: FC<StatusModalProps> = ({ type, open, onClose }) => {
	if (type === 'failed') {
		return (
			<Modal modalTitle={'Failed'} open={open} onClose={onClose}>
				<div className={styles.wrapper}>
					<i className={styles.icon}>
						<IcFailed />
					</i>
					<p className={styles.message}>
						Payment failed, try again.
					</p>
					<CloseButton onClick={onClose}>OK</CloseButton>
				</div>
			</Modal>
		)
	}

	if (type === 'completed') {
		return (
			<Modal modalTitle={'Completed'} open={open} onClose={onClose}>
				<div className={styles.wrapper}>
					<i className={styles.icon}>
						<IcCompleted />
					</i>
					<p className={styles.message}>
						Payment completed, your order is being verified by us and will be up and running within 3 hours.
					</p>
					<CloseButton onClick={onClose}>OK</CloseButton>
				</div>
			</Modal>
		)
	}

	return null
};

export default StatusModal;