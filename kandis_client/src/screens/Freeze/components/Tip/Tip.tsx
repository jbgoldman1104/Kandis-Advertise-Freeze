import styles from './Tip.module.scss'
import { ReactComponent as IcTip } from '../../../../assets/icons/ic_tip.svg';

const Tip = () => {
	return (
		<div className={styles.tip}>
			<i><IcTip/></i>
			<i>For a full in-depth walkthrough on how to use this page kindly visit our documentation</i>
		</div>
	);
};

export default Tip;