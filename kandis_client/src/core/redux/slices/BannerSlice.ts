import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BannerState {
	isActive: boolean
}

const initialState: BannerState = {
	isActive: false
}

const BannerSlice = createSlice({
	name: 'BannerSlice',
	initialState,
	reducers: {
		setBannerActive(state, action: PayloadAction<boolean>) {
			state.isActive = action.payload
		}
	}
})

export const { setBannerActive } = BannerSlice.actions
export default BannerSlice.reducer
