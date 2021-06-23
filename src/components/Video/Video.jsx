import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const VideoContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  margin-top: 5vw;
`

const VideoPlayer = styled.iframe`
  width: 100%;
  height: 80vh;
`

const Video = ({ url }) => {
  return (
    <VideoContainer>
      <VideoPlayer
        src={`https://www.youtube.com/embed/${url}`}
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></VideoPlayer>
    </VideoContainer>
  )
}

export default Video
