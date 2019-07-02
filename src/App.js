import React, { useState, useEffect } from 'react'
import './App.css'
import { GlobalStyle } from './StyledComponents/GlobalStyle'
import { Header } from './StyledComponents/Header'
import ExperienceList from './components/ExperienceList'
import { postData } from './utils/postData'
import PreviewClass from './components/PreviewClass'

function App() {
	const [token, setToken] = useState('')
	const [currentExperience, setCurrentExperience] = useState(null)

	useEffect(() => {
		getToken()

		return () => {}
	}, [])
	return (
		<>
			<GlobalStyle />
			<div className="App">
				{token && !currentExperience ? <ExperienceList token={token} setCurrentExperience={setCurrentExperience} /> : null}
				<PreviewClass />
			</div>
		</>
	)

	async function getToken() {
		const tokenResponse = await postData(
			`${process.env.REACT_APP_API_ENDPOINT}/token`,
			`username=${process.env.REACT_APP_API_USERNAME}&password=${process.env.REACT_APP_API_PASSWORD}&grant_type=password`
		)
		if (tokenResponse.access_token) {
			setToken(tokenResponse.access_token)
		}
	}
}

export default App
