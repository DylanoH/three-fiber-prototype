import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'


const HeaderContainer = styled.div`
background-color: black;
display: flex;
justify-content: center;
align-items: center;
padding: 10vw;

h1{
  font-size: 100px;
  width: 20px;
  color: white
}

h2{
  color: white;
}

p{
  width: 35vw;
  color: white;
}
`

const InfoContainer = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-between;
`

const StatsContainer = styled.div`
  width: 60vw;
  display: flex;
  margin-top: 8vw;
  justify-content: space-between;
`

const Info = styled.div`
  width: 16vw;
  display: flex;
  flex-direction: column;
`

const Line = styled.hr`
  width: 16vw;
  display: flex;
  flex-direction: column;
`


const Header = ({ title, image, text }) => {
  console.log('img', image)
  return (
    <HeaderContainer>
      <div>
        <InfoContainer>
          <div>
            <h1>{title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />
          </div>
          
          <img src={image} alt='' />
        </InfoContainer>


        <StatsContainer>
          <Info>
            <p>Gebruiksoort</p>
            <Line></Line>
            <h2>Bedrijfsruimte</h2>
          </Info>

          <Info>
            <p>Oppervlakte</p>
            <Line></Line>
            <h2>102 m2</h2>
          </Info>

          <Info>
            <p>Prijs</p>
            <Line></Line>
            <h2>€ 140,- per m2 </h2>

          </Info>
        </StatsContainer>
      </div>
    </HeaderContainer>
  )
}

export default Header
