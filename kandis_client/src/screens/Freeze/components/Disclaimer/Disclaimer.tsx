import styles from './Disclaimer.module.scss'
import Modal from '../../../../components/Modal/Modal';
import { useState } from 'react';
import classNames from 'classnames';
import YellowCheckbox from '../../../../ui/YellowCheckbox/YellowCheckbox';
import { AcceptButton } from './styles';

const Disclaimer = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isAcceptedTerms, setIsAcceptedTerms] = useState<boolean>(false);

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsAcceptedTerms(event.target.checked);
	};
	
	return (
		<Modal open={isOpen} modalTitle={'Disclaimer'}>
			<div className={styles.container}>
				<div className={styles.terms}>
					<div className={styles.termsBox}>
						<h1>No Investment Advice</h1>
						<p>
							The information provided on Kandis protocol does not constitute investment advice, financial advice, trading advice, or any other sort of advice and you should not treat any of the website's content as such. Kandis protocol does not recommend that any cryptocurrency should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.
						</p>
					</div>

					<div className={classNames(styles.termsBox, styles.noMargin)}>
						<h1>Accuracy of Information</h1>
						<p>
							Kandis protocol will strive to ensure accuracy of information listed on this website although it will not hold any responsibility for any missing or wrong information. Kandis protocol provides all information as is. You understand that you are using any and all information available here at your own risk.
						</p>
					</div>
				</div>

				<div className={styles.acceptedTerms}>
					<div className={styles.acceptedTermsBox}>
						<YellowCheckbox onChange={handleChange} />
						<p>
							I agree to the <a target={'_blank'} href='https://docs.kandisprotocol.com/terms-and-conditions' rel="noreferrer">Terms and Conditions</a> and acknowledge that I have read and understood the disclaimer.
						</p>
					</div>

					<AcceptButton onClick={handleClose} disabled={!isAcceptedTerms}>
						Accept
					</AcceptButton>
				</div>
			</div>
		</Modal>
	);
};

export default Disclaimer;