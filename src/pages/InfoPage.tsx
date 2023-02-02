import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IVehicleVariableByVin from '../interfaces/vehicleVariablesByVin'
import { useAppSelector } from '../store/hooks'

import Hint from '../components/Hint'

const InfoPage = () => {
	const [fetch, setFetch] = useState<IVehicleVariableByVin[]>([])
	const [showHintByID, setShowHintByID] = useState<number | null>(null)
	const vinList = useAppSelector<string[] | []>(state => state.searchList)

	useEffect(() => {
		const fetchVIN = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}decodevin/${
						vinList[vinList.length - 1]
					}?format=json`,
				)
				setFetch(response?.data?.Results)
			} catch (e) {
				console.error(e)
			}
		}

		fetchVIN()
	}, [])

	return (
		<>
			{fetch.length > 0 &&
				fetch?.map((el: IVehicleVariableByVin) => (
					<div key={el?.VariableId} style={{ marginBottom: '10px' }}>
						{el.Value && el.Value !== 'Not Applicable' && (
							<>
								<div
									onMouseEnter={() =>
										setShowHintByID(el.VariableId)
									}
									onMouseLeave={() => setShowHintByID(null)}
								>
									<p>{el?.Variable}</p>
									<p>{el?.Value}</p>
								</div>
								{showHintByID &&
									showHintByID === el.VariableId && (
										<Hint id={showHintByID} />
									)}
							</>
						)}
					</div>
				))}
		</>
	)
}

export default InfoPage
