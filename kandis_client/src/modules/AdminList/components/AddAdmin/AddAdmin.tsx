import { useState } from 'react';
import styles from './AddAdmin.module.scss'
import { Snackbar, Alert, ButtonBase, styled } from '@mui/material';
import { ReactComponent as IcPersons } from '../../../../assets/icons/ic_persons.svg';
import { ReactComponent as IcPlus } from '../../../../assets/icons/ic_plus.svg';
import { ReactComponent as IcError } from '../../../../assets/icons/ic_error.svg';
import { useForm } from 'react-hook-form';
import { IAdminData } from './types';
import { walletRegex } from '../../utils/regexp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminListService from '../../api/AdminList.service';

const AddAdmin = () => {
	const queryClient = useQueryClient();
	const [isOpen, setOpen] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IAdminData>();
	const { mutateAsync } = useMutation(['add admin'],
		(walletAddress: string) => AdminListService.addAdmin(walletAddress),
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['get admins'] });
				setOpen(true)
			}
		}
		)

	const handleClose = () => {
		setOpen(false)
	}

	const addAdmin = async (data: IAdminData) => {
		await mutateAsync(data.wallet)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(addAdmin)} className={styles.form}>
			<label className={styles.label}>
				<input {...register('wallet', {
					required: 'Required field',
					pattern: {
						value: walletRegex,
						message: 'Enter in the format terra1[...38symbols]'
					}
				})}
							 className={styles.input}
							 type='text'
				/>
				<i className={styles.persons}><IcPersons /></i>
				<i className={styles.plus}><IcPlus /></i>
			</label>

			{errors?.wallet && (
				<span className={styles.errorMessage}><IcError />{errors.wallet.message as string}</span>
			)}

			<div className={styles.wrap}>
				<Save type={'submit'}>
					Save
				</Save>
			</div>

			<Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={isOpen}  onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Wallet added successfully
				</Alert>
			</Snackbar>
		</form>
	);
};

export default AddAdmin;


export const Save = styled(ButtonBase)(({ theme }) => {
	return {
		fontFamily: '\'Roboto\', sans-serif',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#000',
		padding: '10px 52px',
		background: 'var(--yellow)',
		borderRadius: '10px',
		marginTop: '42px'
	}
})