import React, { useEffect, useState } from 'react'
import { getData } from '../utils/getData'
import { StyledList, StyledListItem, StyledListButton } from '../StyledComponents/List'

export function ExperienceList(props) {
	const apiToken = props.token
	const setCurrentExperience = props.setCurrentExperience

	const [experiences, setExperiences] = useState([])

	useEffect(() => {
		getExperiences(apiToken)
		return () => {}
	}, [apiToken])

	return (
		<StyledList>
			{experiences &&
				experiences.map(experience => {
					return (
						<StyledListItem key={experience.EngagementId} onClick={() => getExperience(experience.EngagementId, apiToken)}>
							{experience.Asset && <img src={`${process.env.REACT_APP_IMAGE_BASEURL}/${experience.Asset}`} alt="" width="100px" />}
							<StyledListButton> {experience.Name}</StyledListButton>
						</StyledListItem>
					)
				})}
		</StyledList>
	)

	async function getExperiences(token) {
		const indexResponse = await getData(`${process.env.REACT_APP_API_ENDPOINT}/Engagement/Index`, { token })
		if (indexResponse) {
			setExperiences(indexResponse)
		}
	}
	async function getExperience(EngagementId, token) {
		const experienceDetailResponse = await getData(`${process.env.REACT_APP_API_ENDPOINT}/Runtime/${EngagementId}`, { token })
		if (experienceDetailResponse) {
			setCurrentExperience(experienceDetailResponse)
		}
	}
}

export default ExperienceList
