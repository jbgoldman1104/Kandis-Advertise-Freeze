import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LunaState {
	lunaCoin: number | null
}

const initialState: LunaState = {
	lunaCoin: null
}

const ExchangeRatesSlice = createSlice({
	name: 'BannerSlice',
	initialState,
	reducers: {
		setLunaCoin(state, action: PayloadAction<number | null>) {
			state.lunaCoin = action.payload
		}
	}
})

export const { setLunaCoin } = ExchangeRatesSlice.actions
export default ExchangeRatesSlice.reducer
