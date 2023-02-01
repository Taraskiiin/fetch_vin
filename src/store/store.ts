import { configureStore } from '@reduxjs/toolkit'
import descriptionListSlice from './description-list-slice'

export const store = configureStore({
	reducer: {
		descriptionList: descriptionListSlice.reducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
