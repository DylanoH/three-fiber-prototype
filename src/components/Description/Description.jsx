import React from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
const DescriptionContainer = styled.div``

const Description = ({ title, image, text }) => {
  console.log('img', image)
  return (
    <DescriptionContainer>
      <h1>{title}</h1>
      <img src={image} alt='' />
      <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />
    </DescriptionContainer>
  )
}

export default Description
