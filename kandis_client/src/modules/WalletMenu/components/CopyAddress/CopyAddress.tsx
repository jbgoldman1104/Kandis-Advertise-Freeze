import { MenuButton } from '../../styles';
import { ReactComponent as IcCopy } from '../../../../assets/icons/ic_copy.svg';
import { useWalletConnect } from '../../../../core/hooks/useWalletConnect';
import { useState } from 'react';

const CopyAddress = () => {
	const [currentText, setCurrentText] = useState<string>('Copy Address')
	const { lunaAddress } = useWalletConnect()

	const copyAddress = () => {
		if (lunaAddress === null) return

		navigator.clipboard.writeText(lunaAddress)
			.then(() => {
				setCurrentText('Copied!');

				setTimeout(() => {
					setCurrentText('Copy Address')
				}, 2000)
			})
	}

	return (
		<MenuButton onClick={copyAddress}>
			<IcCopy />
			<i>{currentText}</i>
		</MenuButton>
	);
};

export default CopyAddress;