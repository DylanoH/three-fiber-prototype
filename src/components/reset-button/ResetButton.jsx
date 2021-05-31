import React from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'

const Button = styled.div`
  width: 200px;
  height: 80px;
  background-color: green;
  position: fixed;
  bottom: 20px;
  left: 20px;
`

const ResetButton = ({ children, playBackAnimations }) => {
  return (
    // <Button onClick={() => playBackAnimations()}>
    <Button onClick={() => playBackAnimations()}>{children}</Button>
  )
}

export default ResetButton
