import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IVehicleVariableByVin from '../interfaces/vehicleVariablesByVin'
import useDescription from '../hooks/useDescription'

const InfoPage = () => {
	const [fetch, setFetch] = useState<any>([])
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

		fetchVIN()
	}, [])

	const handleClick = (id: number) => {
		const result = useDescription(id)

		return result
	}
	return (
		<>
			{fetch.length > 0 &&
				fetch?.map((el: IVehicleVariableByVin) => (
					<div key={el?.VariableId} style={{ marginBottom: '10px' }}>
						{el.Value && (
							<>
								<p>{el?.Variable}</p>
								<p>{el?.Value}</p>
							</>
						)}
					</div>
				))}
		</>
	)
}

export default InfoPage
