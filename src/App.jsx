import React, { useRef, useState, Suspense, useEffect, useContext } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Sky } from '@react-three/drei/core/Sky'
import Stats from 'stats.js'
import Loader from './Loader'
import HaasjeOver from './assets/HaasjeOver'
import { Vector3 } from 'three'
import Ground from './assets/Ground'
import Dylano from './assets/Dylano'
import Block from './assets/Block'
import Auto from './assets/Auto'
import Building from './assets/Building'
import Marker from './assets/Marker'
import Environment from './assets/Environment'
import ApiContextProvider from './utils/ApiContextProvider'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as dat from 'dat.gui'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ApiContext } from './utils/ApiContextProvider'

import Info from 'components/Info/Info'

const App = () => {
  const [focus, setFocus] = useState(false)
  const [cameraPos, setCameraPos] = useState(new Vector3(0, 0, 0))
  const [title, setTitle] = useState('')
  const [infoComponents, setInfoComponents] = useState()

  let passed = false

  // const { posts } = useContext(ApiContext)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true })
    }
  }, [cameraPos])

  const handleScroll = () => {
    const position = window.pageYOffset
    if (position > 200) {
      passed = true
    }
    if (passed && position < 50) {
      playBackAnimations()
    }
  }

  const myCamera = useRef(null)
  const myControls = useRef(null)
  const stats = new Stats()
  stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
  // document.body.appendChild(stats.dom)

  const gui = new dat.GUI()

  stats.begin()
  stats.end()

  function animate() {
    stats.begin()

    // monitored code goes here
    stats.end()
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)

  const displayData = object => {
    const { userData } = object

    setTitle(userData.name)
    setInfoComponents(userData.components)
  }

  const playFocusAnimations = (x, y, z) => {
    setCameraPos(
      new Vector3(
        myCamera.current.position.x,
        myCamera.current.position.y,
        myCamera.current.position.z
      )
    )
    gsap.to(myCamera.current.position, {
      duration: 2,
      x: 20,
      y: 20,
      z: 20,
      ease: 'expo',
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      }
    })
    gsap.to(myControls.current.target, {
      duration: 2,
      x: x,
      y: y + 30,
      z: z,
      ease: 'expo',
      onUpdate: () => {
        myControls.current.update()
      }
    })
    setFocus(true)
  }

  const playBackAnimations = () => {
    // back anims
    gsap.to(myCamera.current.position, {
      duration: 2,
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      ease: 'expo',
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      }
    })
    gsap.to(myControls.current.target, {
      duration: 2,
      x: 0,
      y: 0,
      z: 0,
      ease: 'expo',
      onUpdate: () => {
        myControls.current.update()
      },
      onComplete: () => {
        setFocus(false)
      }
    })
  }

  return (
    <>
      <Canvas>
        <fog attach='fog' color='white' near={600} far={800} />
        <PerspectiveCamera
          ref={myCamera}
          makeDefault
          position={[250, 200, 250]}
          zoom={1.5}
        />
        <OrbitControls
          ref={myControls}
          camera={myCamera.current}
          autoRotate={!focus}
          autoRotateSpeed={0.5}
          enabled={!focus}
          enableZoom={false}
        />
        {/* <EffectComposer>
          {focus && (
            <DepthOfField
              ref={test}
              focusDistance={0.1} // where to focus
              focalLength={0.5} // focal length
              bokehScale={4} // bokeh size
            />
          )}
        </EffectComposer> */}
        <ambientLight />
        <hemisphereLight color={0xffffff} intensity={0.4} />
        <directionalLight
          color={0xffffff}
          intensity={0.7}
          position={new Vector3(250, 400, 100)}
          castShadow
        />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Loader />}>
          <ApiContextProvider>
            <Environment background />
            <HaasjeOver
              playFocusAnimations={playFocusAnimations}
              onClick={e => displayData(e.object.parent)}
            />
            <Ground />
            {/* <Dylano
              playFocusAnimations={playFocusAnimations}
              onClick={e => displayData(e.object)}
            /> */}

            <Building
              onClick={e => displayData(e.object)}
              playFocusAnimations={playFocusAnimations}
            />
            <Block />
            <Marker />
            <Auto />
          </ApiContextProvider>
        </Suspense>
      </Canvas>
      {/* <Info focus={focus} title={title} body={body} img={img} /> */}
      <Info components={infoComponents} title={title} focus={focus} />
    </>
  )
}

export default App

// https://gltf.pmnd.rs/
// npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d
