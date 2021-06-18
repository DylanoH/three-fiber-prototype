import React, { useRef, useState, Suspense, useEffect, useContext } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import Box from './Box'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import Stats from 'stats.js'
import Loader from './Loader'
import HaasjeOver from './assets/HaasjeOver'
import { BoxHelper, Vector3 } from 'three'
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
import { ApiContext } from './utils/ApiContextProvider'

import Info from 'components/Info/Info'
import ResetButton from 'components/reset-button/ResetButton'

const App = () => {
  const { posts } = useContext(ApiContext)

  useEffect(() => {
    console.log('posts', posts)
  }, [posts])

  const myCamera = useRef(null)
  const myControls = useRef(null)
  const mySideBar = useRef(null)
  const myContainer = useRef(null)
  const stats = new Stats()
  stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
  // document.body.appendChild(stats.dom)

  const [focus, setFocus] = useState(false)
  const [cameraPos, setCameraPos] = useState(new Vector3(0, 0, 0))
  const [title, setTitle] = useState('')
  const [body, setBody] = useState()
  const [img, setImg] = useState()
  const [infoComponents, setInfoComponents] = useState()

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
    console.log('object', object)
    const { userData } = object

    console.log('data', userData)
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
      onUpdate: function() {
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
      onUpdate: function() {
        myControls.current.update()
      }
    })

    setFocus(false)
  }

  const bokeh = {
    focalLength: 0
  }

  // gui.add(bokeh, 'bokeh', 0, 1, 0.001)

  // const test = useRef()

  return (
    <>
      <Canvas>
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
        />
        {/* <EffectComposer>
          <DepthOfField

            focusDistance={0} // where to focus
            focalLength={bokeh.focalLength} // focal length
            bokehScale={2} // bokeh size
          />
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

        <Box />
      </Canvas>
      {/* <Info focus={focus} title={title} body={body} img={img} /> */}
      <Info components={infoComponents} title={title} />
      <ResetButton playBackAnimations={playBackAnimations} />
    </>
  )
}

export default App

// https://gltf.pmnd.rs/
// npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d
