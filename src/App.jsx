import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense, useEffect } from 'react'
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree
} from '@react-three/fiber'
import Box from './Box'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import Stats from 'stats.js'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Loader from './Loader'
import HaasjeOver from './assets/HaasjeOver'
import { Vector3 } from 'three'
import Ground from './assets/Ground'
import Dylano from './assets/Dylano'
import Block from './assets/Block'
import Auto from './assets/Auto'
import Building from './assets/Building'
import Marker from './assets/Marker'

import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'

import { gsap } from 'gsap'

const App = () => {
  const myCamera = useRef(null)
  const myControls = useRef(null)
  const mySideBar = useRef(null)
  const myContainer = useRef(null)
  const stats = new Stats()
  stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom)

  const [orbit, setOrbit] = useState(false)
  const [cameraPos, setCameraPos] = useState(new Vector3(0, 0, 0))

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
    const container = myContainer.current
    const sidebar = mySideBar.current

    if (userData === {}) {
      container.style.visibility = 'hidden'
      container.style.opacity = '0'
      sidebar.style.left = '-390px'
    } else {
      container.style.visibility = 'visible'
      container.style.opacity = '1'
      sidebar.style.left = '0'
      container.innerHTML = userData.name
      sidebar.innerHTML = userData.body
    }
  }

  useEffect(() => {
    console.log(cameraPos)
  }, [cameraPos])

  const playFocusAnimations = (x, y, z) => {
    setCameraPos(
      new Vector3(
        myCamera.current.position.x,
        myCamera.current.position.y,
        myCamera.current.position.z
      )
    )
    gsap.to(myCamera.current.position, {
      duration: 4,
      x: 20,
      y: 20,
      z: 20,
      ease: 'expo',
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      }
    })
    gsap.to(myControls.current.target, {
      duration: 4,
      x: x,
      y: y + 30,
      z: z,
      ease: 'expo',
      onUpdate: function() {
        myControls.current.update()
      }
    })

    setOrbit(true)
  }

  const playBackAnimations = () => {
    // back anims
    gsap.to(myCamera.current.position, {
      duration: 0.5,
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      }
    })
    gsap.to(myControls.current.target, {
      duration: 0.5,
      x: 0,
      y: 0,
      z: 0,
      onUpdate: function() {
        myControls.current.update()
      }
    })

    setOrbit(false)
  }
  // const array = []

  // // performance test
  // const gridSize = 15
  // for (let x = 0; x < gridSize; x++)
  //   for (let y = 0; y < gridSize; y++)
  //     for (let z = 0; z < gridSize; z++) {
  //       array.push({
  //         x: -gridSize / 2 + x,
  //         y: -gridSize / 2 + y,
  //         z: -gridSize / 2 + z
  //       })
  //     }

  return (
    <>
      <Canvas>
        <PerspectiveCamera
          ref={myCamera}
          makeDefault
          position={[250, 200, 250]}
        />
        <OrbitControls
          ref={myControls}
          camera={myCamera.current}
          autoRotate={!orbit}
          autoRotateSpeed={0.5}
          enabled={!orbit}
        />
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
          <HaasjeOver playFocusAnimations={playFocusAnimations} />
          <Ground />
          <Dylano
            playFocusAnimations={playFocusAnimations}
            onClick={e => displayData(e.object)}
          />

          <Building
            onClick={e => displayData(e.object)}
            playFocusAnimations={playFocusAnimations}
          />
          <Block />
          <Marker />
          <Auto />
        </Suspense>

        <Box />
      </Canvas>
      <div className='sidebar' ref={mySideBar}></div>
      <div className='container' ref={myContainer}>
        <span className='title'>Test threejs</span>
      </div>
      <div
        style={{
          width: 200,
          height: 80,
          backgroundColor: 'green',
          position: 'fixed',
          bottom: 20,
          left: 20
        }}
        onClick={() => playBackAnimations()}
      ></div>
    </>
  )
}

export default App

// https://gltf.pmnd.rs/
// npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d
