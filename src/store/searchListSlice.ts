import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userInitialState: string[] = []

const searchListSlice = createSlice({
	name: 'searchList',
	initialState: userInitialState,
	reducers: {
		addElement(state: string[], action: PayloadAction<string>) {
			if (state.length === 5) {
				state.splice(0, 1).push(action.payload)
			}
			state.push(action.payload)
		},
	},
})

export const { addElement } = searchListSlice.actions
export default searchListSlice
