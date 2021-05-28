import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  padding: 0;
}

#root {
  position: relative;
}

canvas {
  width: 100vw;
  z-index: 3;
  height: 100vh;
  background-color: #8dd1e9;
}

.container {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: 1s ease-in-out;
  z-index: 1;
  visibility: hidden;
}

.container .title {
  font-size: 12rem;
  text-transform: uppercase;
  color: black;
  z-index: 4;

  position: absolute;
  top: 105vh;
  left: 400px;

}

.sidebar {
  opacity: 1;
  transition: 1s ease-in-out;
  position: fixed;
  left: -390px;
  padding: 20px;
  width: 350px;
  top: 0;
  z-index: 5;
  height: 100vh;
  background-color: grey;

}
`

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,

  document.getElementById('root')
)
