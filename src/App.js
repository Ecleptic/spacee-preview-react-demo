import React, { useState, useEffect } from 'react'
import './App.css'
import { GlobalStyle } from './StyledComponents/GlobalStyle'
import { Header } from './StyledComponents/Header'

function App() {
	useEffect(() => {
		return () => {}
	}, [])
	return (
		<>
			<GlobalStyle />
			<div className="App">{/* App Data Here */}</div>
		</>
	)
}

export default App
