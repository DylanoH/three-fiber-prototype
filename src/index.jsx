import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import ApiContextProvider from './utils/ApiContextProvider'

const GlobalStyle = createGlobalStyle`

*, *::after, *::before {
  box-sizing: border-box;
}

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

`

ReactDOM.render(
  <>
    <ApiContextProvider>
      <GlobalStyle />
      <App />
    </ApiContextProvider>
  </>,

  document.getElementById('root')
)
