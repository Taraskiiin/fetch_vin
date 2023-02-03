/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons'

import '../styles/pages/NotFoundPage.css'

const NotFoundPage = () => {
	return (
		<div className="Not-found-block">
			<Link to="/">
				<h3 className="Not-found-text">
					<FontAwesomeIcon icon={faHandPointDown} />
					THIS PAGE DOESN'T EXIST. PLEASE TAP HERE
				</h3>
			</Link>
		</div>
	)
}

export default NotFoundPage
