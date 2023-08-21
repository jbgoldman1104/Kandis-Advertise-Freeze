import styles from './WalletConnectModal.module.scss'
import { FC, ReactNode, useState } from 'react'
import { Modal } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks'
import { setWalletModal } from '../../core/redux/slices/ModalSlice'
import { WalletButton } from './styles'
import { useWallet } from '@terra-money/wallet-provider'
import { useWalletConnect } from '../../core/hooks/useWalletConnect'

const WalletConnectModal = () => {
	const { walletModal } = useAppSelector(state => state.ModalSlice)
	const dispatch = useAppDispatch()
	const { isWalletConnect } = useWalletConnect()
	const { availableConnections, connect, availableInstallations } =
		useWallet()
	const handleClose = () => {
		dispatch(setWalletModal(false))
	}

	return (
		<Modal open={walletModal && !isWalletConnect} onClose={handleClose}>
			<div className={styles.walletModal}>
				<div className={styles.body}>
					<h3>Connect Wallet</h3>

					<div className={styles.buttons}>
						{/* eslint-disable-next-line array-callback-return */}
						{availableConnections.map((item, index) => {
							if (item.type !== "READONLY") {
								return (
									<WalletButton
										key={index}
										onClick={() => connect(item.type, item.identifier)}
									>
										<img src={item.icon} alt={item.name} />
										<i>{item.name}</i>
									</WalletButton>
								)
							}
						})}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default WalletConnectModal
