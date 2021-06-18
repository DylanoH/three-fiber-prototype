import React from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
const HeaderContainer = styled.div``

const Header = ({ title, image, text }) => {
  console.log('img', image)
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <img src={image} alt='' />
      <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />
    </HeaderContainer>
  )
}

export default Header
