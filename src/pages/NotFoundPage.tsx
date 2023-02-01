/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const NotFoundPage = () => {
	return (
		<>
			<h1>
				THIS PAGE DOESN'T EXIST. GO{' '}
				<Link to="/">
					<FontAwesomeIcon icon={faHouse} />
				</Link>
			</h1>
		</>
	)
}

export default NotFoundPage
