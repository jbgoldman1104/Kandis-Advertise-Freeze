import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalSlice {
	walletModal: boolean
	mobileMenu: boolean
	statusPaymentCompleted: boolean
	statusPaymentFailed: boolean
	adminList: boolean
	adminReview: boolean
}

const initialState: ModalSlice = {
	walletModal: false,
	mobileMenu: false,
	statusPaymentCompleted: false,
	statusPaymentFailed: false,
	adminList: false,
	adminReview: true
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ModalSlice = createSlice({
	name: 'ModalSlice',
	initialState,
	reducers: {
		setWalletModal(state, action: PayloadAction<boolean>) {
			state.walletModal = action.payload
		},
		setMobileMenu(state, action: PayloadAction<boolean>) {
			state.mobileMenu = action.payload
		},
		setStatusPaymentCompleted(state, action: PayloadAction<boolean>) {
			state.statusPaymentCompleted = action.payload
		},
		setStatusPaymentFailed(state, action: PayloadAction<boolean>) {
			state.statusPaymentFailed = action.payload
		},
		setAdminList(state, action: PayloadAction<boolean>) {
			state.adminList = action.payload
		},
		setAdminReview(state, action: PayloadAction<boolean>) {
			state.adminReview = action.payload
		}
	}
})

export const {
	setWalletModal,
	setMobileMenu,
	setStatusPaymentCompleted,
	setStatusPaymentFailed,
	setAdminList,
	setAdminReview
} = ModalSlice.actions
export default ModalSlice.reducer
