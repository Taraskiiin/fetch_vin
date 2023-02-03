import store from '../store'
import { fetchDescriptionsList } from '../descriptionListSlice'

const mockLastElement = {
	DataType: 'string',
	Description: 'Vehicle Descriptor is VIN without PII (sequential number)',
	GroupName: null,
	ID: 196,
	Name: 'Vehicle Descriptor',
}

const dispatch = jest.fn()
const fetch = jest.fn()

describe('descriptionListSlice slice', () => {
	it('should return initial state', () => {
		const expected = { descriptionList: [], status: null }
		const state = store.getState().descriptionList
		expect(state).toEqual(expected)
	})

	it('should fetchDescriptionList with rejected response', async () => {
		const thunk = fetchDescriptionsList()

		fetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockLastElement),
		})

		await thunk(dispatch, () => ({}), [])

		const { calls } = dispatch.mock
		expect(calls).toHaveLength(2)

		const [start, end] = calls

		expect(start[0].type).toBe(
			'descriptionList/fetchDescriptionsList/pending',
		)
		expect(end[0].type).toBe(
			'descriptionList/fetchDescriptionsList/fulfilled',
		)
		expect(end[0].payload[139]).toStrictEqual(mockLastElement)
	})
})
