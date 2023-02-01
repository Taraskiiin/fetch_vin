import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/info" element={<InfoPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
