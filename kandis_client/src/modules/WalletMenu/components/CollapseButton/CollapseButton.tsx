import { MenuButton } from '../../styles';
import { useWalletConnect } from '../../../../core/hooks/useWalletConnect';
import { ReactComponent as IcPerson } from '../../../../assets/icons/ic_person_white.svg';
import { ReactComponent as IcArrow } from '../../../../assets/icons/ic_arrow_menu.svg';
import { FC } from 'react';

interface CollapseButtonProps {
	state: boolean,
	onClick: () => void
}

const CollapseButton: FC<CollapseButtonProps> = ({ onClick, state, ...props }) => {
	const { lunaAddress } = useWalletConnect()

	return (
		<MenuButton {...props} onClick={onClick}>
			<IcPerson />
			<i>{lunaAddress}</i>
			<i className={state ? 'arrow active' : 'arrow'}>
				<IcArrow />
			</i>
		</MenuButton>
	);
};

export default CollapseButton;