import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Header from 'components/Header/Header'
import Description from 'components/Description/Description'

const ComponentContainer = styled.div``

const InfoContainer = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  transition: 1s ease-in-out;
  position: relative;
  left: 0px;
  padding: 20px;
  width: 100vw;
  top: 0;
  z-index: 5;
  /* height: 100vh; */
  background-color: grey;
`

const Info = ({ title, components }) => {
  console.log('title', title)
  console.log('components', components)
  const infoRef = useRef()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(title !== '')
  }, [title])

  const renderComponent = component => {
    console.log('one', component)

    if (component.acf_fc_layout === 'header') {
      console.log('sup')
      return (
        <Header
          title={component.titel}
          image={component.image.sizes.medium}
          text={component.text}
        />
      )
    }
    if (component.acf_fc_layout === 'description') {
      console.log('sup', component.text)
      return (
        <Description
          title={component.titel}
          image={component.image.sizes.medium}
          text={component.text}
        />
      )
    }
  }

  return (
    <InfoContainer ref={infoRef} open={open}>
      {/* <ReactMarkdown rehypePlugins={[rehypeRaw]} children={body} /> */}
      {/* {img && <img src={img} alt={''} />} */}

      {components?.map(component => {
        return (
          <>
            <ComponentContainer>
              {renderComponent(component)}
            </ComponentContainer>
          </>
        )
      })}
    </InfoContainer>
  )
}

export default Info
