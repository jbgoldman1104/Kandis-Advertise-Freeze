import { useState } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import CollapseButton from '../CollapseButton/CollapseButton';
import { MenuItem, MenuList } from '../../styles';
import CopyAddress from '../CopyAddress/CopyAddress';
import Disconnect from '../Disconnect/Disconnect';
import { useAppSelector } from '../../../../core/hooks/storeHooks';
import Admin from '../Admin/Admin';
import AddAdmin from '../AddAdmin/AddAdmin';

const WalletMenu = () => {
	const { isAdmin } = useAppSelector(state => state.AuthSlice);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ClickAwayListener onClickAway={() => setIsOpen(false)}>
			<MenuList aria-label='Wallet Menu'>
				<MenuItem>
					<CollapseButton aria-expanded={isOpen} state={isOpen} onClick={toggleOpen} />
				</MenuItem>
				{isOpen && (<>
					<MenuItem>
						<CopyAddress />
					</MenuItem>
					{
						isAdmin && (<>
							<MenuItem>
								<Admin />
							</MenuItem>
							<MenuItem>
								<AddAdmin />
							</MenuItem>
							</>
						)
					}
					<MenuItem>
						<Disconnect />
					</MenuItem>
				</>)}
			</MenuList>
		</ClickAwayListener>
	);
};

export default WalletMenu;