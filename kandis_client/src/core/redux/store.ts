import { configureStore } from '@reduxjs/toolkit'
import BannerSlice from './slices/BannerSlice'
import ModalSlice from './slices/ModalSlice'
import AuthSlice from './slices/AuthSlice'
import AdminReviewSlice from './slices/AdminReviewSlice';
import BannerReviewSlice from './slices/BannerReviewSlice';
import ExchangeRatesSlice from './slices/ExchangeRatesSlice';

export const store = configureStore({
	reducer: {
		BannerSlice,
		ModalSlice,
		AuthSlice,
		AdminReviewSlice,
		BannerReviewSlice,
		ExchangeRatesSlice
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
