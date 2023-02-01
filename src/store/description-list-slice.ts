import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import IDescription from '../interfaces/description'

interface IDescriptionList {
	descriptionList: IDescription[] | []
	status: string
	error: string | undefined
}

const userInitialState: IDescriptionList = {
	descriptionList: [],
	status: 'loading',
	error: undefined,
}

export const fetchDescriptionsList = createAsyncThunk(
	'description-list/fetchDescriptionsList',
	async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_DESCRIPTION_LIST_URL}`,
			)
			return response.data.Results
		} catch (e) {
			console.error(e)
		}
	},
)

const descriptionListSlice = createSlice({
	name: 'description-list',
	initialState: userInitialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(
				fetchDescriptionsList.fulfilled,
				(state, action: PayloadAction<IDescription[]>) => {
					console.log(action.payload)
					state.descriptionList = [...action.payload]
					state.status = 'ready'
					state.error = undefined
				},
			)
			.addCase(fetchDescriptionsList.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export default descriptionListSlice
