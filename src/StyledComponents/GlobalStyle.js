import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=DM+Serif+Text|Montserrat|Roboto+Mono&display=swap');
  body {
    font-family:'DM Serif Text', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif,Montserrat,'Roboto Mono';
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`
