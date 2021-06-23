import React, {useRef, useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
const DescriptionContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vw;

  .info{
    margin-left: 5vw;
    width: 40vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

const Description = ({ title, image, text, id }) => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    console.log(element);
    gsap.fromTo(
      element.querySelector(".title"+id),
      {
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top center+=100",
          scrub: false,
        }
      }
    );  
  }, []);

  return (
    <DescriptionContainer ref={ref}>
      <img className={`img${id}`} src={image} alt='' />

      <div className="info">
        <h1 className={`title${id}`} >{title}</h1>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />
      </div>
    </DescriptionContainer>
  )
}

export default Description
