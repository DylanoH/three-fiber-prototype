import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const Container = styled.div``

const SidebarContainer = styled.div`
  opacity: 1;
  transition: 1s ease-in-out;
  position: fixed;
  left: 0px;
  padding: 20px;
  width: 350px;
  top: 0;
  z-index: 5;
  height: 100vh;
  background-color: grey;
`

const Sidebar = ({ title, body, img }) => {
  console.log('title', title)
  console.log('body', body)
  const sidebarRef = useRef()

  const [open, setOpen] = useState(false)
  console.log('img', img)
  return (
    <SidebarContainer ref={sidebarRef}>
      <p>{title}</p>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} children={body} />
      {img && <img src={img} alt={''} />}
    </SidebarContainer>
  )
}

export default Sidebar
