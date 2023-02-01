import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch } from './store/hooks'
import { fetchDescriptionsList } from './store/descriptionListSlice'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchDescriptionsList())
	}, [])
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/info" element={<InfoPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
