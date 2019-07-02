import styled from 'styled-components'

export const StyledList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	padding: 0;
	margin: 40px;
`
export const StyledListItem = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	width: 100%;
	list-style: none;
	height: 300px;
`

export const StyledListButton = styled.button`
	background: none;
	border: none;
	font-family: Verdana;
	font-size: 20px;
	font-weight: 700;
`
