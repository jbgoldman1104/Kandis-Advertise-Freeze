import styles from './AdminWallets.module.scss';
import { FC, useState } from 'react';
import { Tooltip } from '@mui/material';
import { ReactComponent as IcCopy } from '../../../../assets/icons/ic_copy_yellow.svg';
import { ReactComponent as IcDelete } from '../../../../assets/icons/ic_delete_yellow.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminListService from '../../api/AdminList.service';
import { Snackbar, Alert } from '@mui/material';

interface AdminItemProps {
	_id: string;
	number: number;
	wallet: string;
}

const AdminItem: FC<AdminItemProps> = ({ _id, number, wallet }) => {
	const queryClient = useQueryClient();
	const [tooltipText, setTooltipText] = useState<string>('Copy');
	const { mutateAsync } = useMutation(['delete wallet'],
		(walletId: string) => AdminListService.deleteWallet(walletId),
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['get admins'] });
			}
		}
	);

	const copy = () => {
		navigator.clipboard.writeText(wallet)
			.then(() => {
				setTooltipText('Copied!');

				setTimeout(() => {
					setTooltipText('Copy Address');
				}, 2000);
			});
	};

	const deleteWallet = async () => {
		await mutateAsync(_id);
	};

	return (
		<>
			<li data-wallet-id={_id} className={styles.adminItem}>
				<div className={styles.info}>
					<span>{number + 1}.</span>
					<p>{wallet}</p>
				</div>
				<div className={styles.buttons}>
					<Tooltip placement='top' title={tooltipText} arrow>
					<span onClick={copy} className={styles.button} role={'button'} tabIndex={0}>
					<IcCopy />
				</span>
					</Tooltip>
					<Tooltip placement='top' title={'Delete'} arrow>
					<span onClick={deleteWallet} className={styles.button} role={'button'} tabIndex={0}>
					<IcDelete />
				</span>
					</Tooltip>
				</div>
			</li>
		</>
	);
};

export default AdminItem;