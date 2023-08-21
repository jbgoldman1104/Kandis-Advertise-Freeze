import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AuthState {
	isAdmin: boolean
	isLoading: boolean
}

const initialState: AuthState = {
	isAdmin: false,
	isLoading: true
}

const AuthSlice = createSlice({
	name: 'AuthSlice',
	initialState,
	reducers: {
		setAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		}
	}
})

export const { setAdmin, setLoading } = AuthSlice.actions

export default AuthSlice.reducer

