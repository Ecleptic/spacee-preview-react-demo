import React, { Component } from 'react'
let exitTimer

export default class PreviewClass extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentFrame: {},
			touchPointsList: [],
			framesList: []
		}
	}
	componentWillMount() {
		if (this.props.currentExperience.Containers.length > 0 && this.props.currentExperience.Containers[0].Wisps.length > 0) {
			const startupFrame = this.props.currentExperience.Containers[0].Wisps.filter(frame => frame.Root)[0]
			this.setState({ framesList: this.props.currentExperience.Containers[0].Wisps })
			this.changeFrame(startupFrame)
		}
	}
	componentWillUnmount() {
		clearInterval(exitTimer)
	}
	changeFrame(newFrame) {
		if (!newFrame) return

		if (!newFrame.Menu) {
			newFrame.Menu = {}
		} else {
			const newFrameMenu = this.props.currentExperience.Menus.find(menu => menu.MenuId === newFrame.Menu.MenuId)
			newFrame.Menu = { ...newFrameMenu }
		}
		if (!newFrame.Menu.Touchpoints) {
			newFrame.Menu.Touchpoints = []
		}

		const touchPointsList = newFrame.Menu.Touchpoints.map(touchPoint => {
			touchPoint.OnTouch = this.props.currentExperience.Containers[0].Wisps.find(frame => {
				return frame.WispId === touchPoint.onTouchFrameId
			})

			touchPoint.height = touchPoint.blY - touchPoint.tlY
			touchPoint.width = touchPoint.trX - touchPoint.tlX
			return touchPoint
		})
		this.setState({ touchPointsList, currentFrame: newFrame })
		this.startExitTimer(newFrame, this.state.framesList)
	}

	startExitTimer(currentFrame) {
		// Content timeout from API is in seconds.
		clearInterval(exitTimer)
		if (currentFrame.ExitToWispId && currentFrame.ContentTimeout > 0) {
			const timeout = currentFrame.ContentTimeout * 1000
			exitTimer = window.setTimeout(() => {
				const exitFrame = this.state.framesList.find(frame => frame.WispId === currentFrame.ExitToWispId)
				this.changeFrame(exitFrame)
			}, timeout)
		}
	}

	render() {
		return (
			<div className="previewDiv">
				<div className="imageContainer">
					<img src={`${process.env.REACT_APP_IMAGE_BASEURL}/${this.state.currentFrame.Asset.Original}`} alt="" />
					{this.state.touchPointsList &&
						this.state.touchPointsList.map(touchPoint => {
							return (
								<button
									key={touchPoint.TouchpointId}
									style={{
										position: `absolute`,
										width: `calc(${touchPoint.width}*100%)`,
										height: `calc(${touchPoint.height}*100%)`,
										left: `calc(${touchPoint.tlX}*100%)`,
										top: `calc(${touchPoint.tlY}*100%)`,
										backgroundColor: `#00adef7a`
									}}
									onClick={() => {
										this.changeFrame(touchPoint.OnTouch)
									}}
								/>
							)
						})}
				</div>
			</div>
		)
	}
}
