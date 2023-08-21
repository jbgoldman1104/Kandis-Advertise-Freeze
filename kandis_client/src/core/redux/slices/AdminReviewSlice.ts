import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AdminReviewState {
	isActive: boolean
	bannerId: string | null
}

const initialState: AdminReviewState = {
	isActive: false,
	bannerId: null
}

const AdminReviewSlice = createSlice({
	name: 'AdminReview',
	initialState,
	reducers: {
		setActive(state, action: PayloadAction<boolean>) {
			state.isActive = action.payload
		},
		setBannerId(state, action: PayloadAction<string | null>) {
			state.bannerId = action.payload
		}
	}
})

export const { setActive, setBannerId } = AdminReviewSlice.actions

export default AdminReviewSlice.reducer

