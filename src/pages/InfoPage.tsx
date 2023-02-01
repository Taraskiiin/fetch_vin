import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IDescription from '../interfaces/description'
import IVehicleVariableByVin from '../interfaces/vehicleVariablesByVin'

const InfoPage = () => {
	const [fetch, setFetch] = useState<any>([])
	const [fetchDesc, setFetchDesc] = useState<any>([])
	// const vin1 = '1FTFW1CT5DFC10312'
	const vin2 = 'JN1AZ4EH7DM430111'
	useEffect(() => {
		const fetchVIN = async () => {
			try {
				const response = await axios.get(
					`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin2}?format=json`,
				)
				setFetch(response?.data?.Results)
			} catch (e) {
				console.error(e)
			}
		}
		const fetch = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_DESCRIPTION_LIST_URL}`,
				)
				setFetchDesc(response?.data?.Results)
			} catch (e) {
				console.error(e)
			}
		}

		fetchVIN()
		fetch()
	}, [])
	// console.log(descriptionList)

	const findDescription = (id: number) => {
		const correctElem = fetchDesc.find(
			(element: IDescription) => element.ID === id,
		)

		return correctElem.Description
	}

	return (
		<>
			{fetch.length > 0 &&
				fetch?.map((el: IVehicleVariableByVin) => (
					<div key={el?.VariableId} style={{ marginBottom: '10px' }}>
						{el.Value && (
							<>
								<p>{el?.Value}</p>
								<p>{el?.Variable}</p>
								<div
									dangerouslySetInnerHTML={{
										__html: findDescription(el?.VariableId),
									}}
								/>
							</>
						)}
					</div>
				))}
		</>
	)
}

export default InfoPage
