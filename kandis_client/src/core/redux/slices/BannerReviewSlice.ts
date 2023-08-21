import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface BannerReviewState {
	isActive: boolean
	bannerId: string | null
}

const initialState: BannerReviewState = {
	isActive: false,
	bannerId: null
}

const BannerReviewSlice = createSlice({
	name: 'BannerReview',
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

export const { setActive, setBannerId } = BannerReviewSlice.actions

export default BannerReviewSlice.reducer

