import React, { Component } from 'react'

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
		console.log('Component Mounts')
		console.log(this.props)
	}
	componentWillUnmount() {
		console.log('component Unmounts')
	}

	render() {
		return (
			<div className="previewDiv">
				<h2>Preview</h2>
			</div>
		)
	}
}
