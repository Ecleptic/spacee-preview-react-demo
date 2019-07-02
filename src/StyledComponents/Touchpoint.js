import styled from 'styled-components'
export const StyledTouchPoint = styled.button`
	border: none;
	background-color: #00adef7a;
	position: absolute;
	width: calc(${props => props.touchpoint.width}*100%);
	height: calc(${props => props.touchpoint.height}*100%);
	left: calc(${props => props.touchpoint.tlX}*100%);
	top: calc(${props => props.touchpoint.tlY}*100%);
`
