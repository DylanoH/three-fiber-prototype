import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  width: 140px;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  border-radius: 5px;
`

const ResetButton = ({ children, click }) => {
  return <Button onClick={() => click()}>{children}</Button>
}

export default ResetButton
