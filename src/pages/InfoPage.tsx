import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import IVehicleVariableByVin from '../interfaces/vehicleVariablesByVin'
import { useAppSelector } from '../store/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faMinus } from '@fortawesome/free-solid-svg-icons'

import Hint from '../components/Hint'

import '../styles/pages/InfoPage.css'

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
		<div className="list">
			<Link to="/">
				<FontAwesomeIcon icon={faLongArrowAltLeft} />
			</Link>
			{fetch.length > 0 &&
				fetch?.map((el: IVehicleVariableByVin) => (
					<>
						{el.Value && el.Value !== 'Not Applicable' && (
							<>
								<div
									className="list-item_content"
									onMouseOver={() =>
										setShowHintByID(el.VariableId)
									}
									onMouseLeave={() => setShowHintByID(null)}>
									<p>
										{el?.Variable}{' '}
										<FontAwesomeIcon icon={faMinus} />
									</p>
									<p>{el?.Value}</p>
									{showHintByID &&
										showHintByID === el.VariableId && (
											<Hint id={showHintByID} />
										)}
								</div>
							</>
						)}
					</>
				))}
		</div>
	)
}

export default InfoPage
