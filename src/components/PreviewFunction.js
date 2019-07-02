import React, { useState, useEffect, useCallback } from 'react'
import { StyledTouchPoint } from '../StyledComponents/Touchpoint'
let exitTimer

function PreviewFunction({ currentExperience }) {
	const [currentFrame, setCurrentFrame] = useState()
	const [currentFrameTouchPointsList, setCurrentFrameTouchPointsList] = useState()
	const [framesList, setFramesList] = useState()

	const changeFrame = useCallback(
		newFrame => {
			if (!newFrame) return

			const startExitTimer = timeoutFrame => {
				clearInterval(exitTimer)
				// Content timeout from API is in seconds, so convert to milliseconds.
				if (timeoutFrame && timeoutFrame.ExitToWispId && timeoutFrame.ContentTimeout > 0) {
					const timeout = timeoutFrame.ContentTimeout * 1000
					exitTimer = window.setTimeout(() => {
						const exitFrame = framesList.find(frame => frame.WispId === timeoutFrame.ExitToWispId)
						changeFrame(exitFrame)
					}, timeout)
				}
			}

			if (!newFrame.Menu) {
				newFrame.Menu = {}
			} else {
				const newFrameMenu = currentExperience.Menus.find(menu => menu.MenuId === newFrame.Menu.MenuId)
				newFrame.Menu = { ...newFrameMenu }
			}
			if (!newFrame.Menu.Touchpoints) {
				newFrame.Menu.Touchpoints = []
			}

			const touchPointsList = newFrame.Menu.Touchpoints.map(touchPoint => {
				touchPoint.OnTouch = currentExperience.Containers[0].Wisps.find(frame => {
					return frame.WispId === touchPoint.onTouchFrameId
				})

				touchPoint.height = touchPoint.blY - touchPoint.tlY
				touchPoint.width = touchPoint.trX - touchPoint.tlX
				return touchPoint
			})
			setCurrentFrameTouchPointsList(touchPointsList)
			setCurrentFrame(newFrame)
			startExitTimer(newFrame)
		},
		[currentExperience.Containers, currentExperience.Menus, framesList]
	)

	useEffect(() => {
		if (currentExperience.Containers.length > 0 && currentExperience.Containers[0].Wisps.length > 0) {
			const startupFrame = currentExperience.Containers[0].Wisps.filter(frame => frame.Root)[0]
			setFramesList(currentExperience.Containers[0].Wisps)
			changeFrame(startupFrame)
		}
		return () => {
			clearInterval(exitTimer)
		}
	}, [changeFrame, currentExperience])

	if (!currentFrame) return null
	return (
		<div className="previewDiv">
			<div className="imageContainer">
				<img src={`${process.env.REACT_APP_IMAGE_BASEURL}/${currentFrame.Asset.Original}`} alt="" />
				{currentFrameTouchPointsList &&
					currentFrameTouchPointsList.map(touchPoint => (
						<StyledTouchPoint key={touchPoint.TouchpointId} touchpoint={touchPoint} onClick={() => changeFrame(touchPoint.OnTouch)} />
					))}
			</div>
		</div>
	)
}

export default PreviewFunction
