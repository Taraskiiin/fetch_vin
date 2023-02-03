import React from 'react'
import { useAppSelector } from '../store/hooks'
import IDescription from '../interfaces/description'
import '../styles/components/Hint.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

interface IHint {
	id: number
}

const Hint: React.FC<IHint> = ({ id }) => {
	const descriptionList = useAppSelector<IDescription[]>(
		state => state.descriptionList.descriptionList,
	)

	const correctElem = descriptionList.find(
		(element: IDescription) => element.ID === id,
	)

	return (
		<div className="hint">
			<FontAwesomeIcon icon={faHandPointLeft} />
			{correctElem ? (
				<p
					dangerouslySetInnerHTML={{
						__html: correctElem.Description,
					}}
				/>
			) : (
				// eslint-disable-next-line react/no-unescaped-entities
				<p className="hint-error">Can't find this description</p>
			)}
		</div>
	)
}

export default Hint
