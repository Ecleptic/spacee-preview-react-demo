import Weather from 'ecleptic-react-weather-component'
import React, { useEffect, useState } from 'react'
import 'ecleptic-web-weather-component'

import './App.css'

import ArrowLeft from './assets/arrow-left.svg'
import ExperienceList from './components/ExperienceList'
import PreviewClass from './components/PreviewClass'
import { BackButton } from './StyledComponents/BackButton'
import { GlobalStyle } from './StyledComponents/GlobalStyle'
import { Header } from './StyledComponents/Header'
import { postData } from './utils/postData'

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
				<Header>
					{currentExperience ? (
						<BackButton
							type="button"
							onClick={() => {
								setCurrentExperience(null)
							}}
						>
							<img src={ArrowLeft} alt="Back Arrow" />
						</BackButton>
					) : (
						<ecleptic-weather-component zip={process.env.REACT_APP_ZIP} APIKEY={process.env.REACT_APP_WEATHER_APIKEY} />
					)}
					<h2>Spacee Preview</h2>
					<Weather zip={process.env.REACT_APP_ZIP} APIKEY={process.env.REACT_APP_WEATHER_APIKEY} orderFlipped={true} />
				</Header>
				{token && !currentExperience ? <ExperienceList token={token} setCurrentExperience={setCurrentExperience} /> : null}
				{token && currentExperience ? <PreviewClass currentExperience={currentExperience} /> : null}
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
