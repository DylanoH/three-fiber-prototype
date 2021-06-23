import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Header from 'components/Header/Header'
import Description from 'components/Description/Description'
import Video from 'components/Video/Video'

const ComponentContainer = styled.div``

const InfoContainer = styled.div`
  display: ${props => (props.focus ? 'block' : 'none')};
  transition: 1s ease-in-out;
  position: relative;
  left: 0px;
  /* padding: 20px; */
  width: 100vw;
  top: 0;
  z-index: 5;
  /* height: 100vh; */
  background-color: white;
`

const Nav = styled.nav`
  width: 100vw;
  height: 70px;
  background-color: white;
  box-shadow: 0 0 5px #d6d6d6;
  /* position: fixed; */
  /* bottom: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  .navContainer {
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Info = ({ components, focus }) => {
  const renderComponent = (component, i) => {
    const { titel, image, text, url } = component
    console.log('compo', component)
    switch (component.acf_fc_layout) {
      case 'header':
        return <Header title={titel} image={image?.sizes?.medium} text={text} />
      case 'description':
        return (
          <Description
            id={i}
            title={titel}
            image={image?.sizes?.medium}
            text={text}
          />
        )
      case 'videoplayer':
        return <Video id={i} url={url} />
      default:
        return null
    }
  }

  return (
    <InfoContainer focus={focus}>
      {components?.map((component, i) => {
        return (
          <React.Fragment key={i}>
            {renderComponent(component, i)}
          </React.Fragment>
        )
      })}

      <Nav>
        <div className='navContainer'>
          <p>Haasje over</p>
          <p>---> 02</p>
        </div>
      </Nav>
    </InfoContainer>
  )
}

export default Info
