import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import IDescription from '../interfaces/description'

interface IDescriptionList {
	descriptionList: IDescription[] | []
	status: string | null
	error?: string
}

const userInitialState: IDescriptionList = {
	descriptionList: [],
	status: null,
}

export const fetchDescriptionsList = createAsyncThunk(
	'descriptionList/fetchDescriptionsList',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_DESCRIPTION_LIST_URL}`,
			)
			if (!response.ok) {
				throw new Error('Server error!')
			}

			const data = await response.json()

			return data.Results
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	},
)

const descriptionListSlice = createSlice({
	name: 'descriptionList',
	initialState: userInitialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDescriptionsList.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchDescriptionsList.fulfilled, (state, action) => {
				state.descriptionList = action.payload
				state.status = 'ready'
			})
			.addCase(fetchDescriptionsList.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export default descriptionListSlice
