import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense, useEffect } from 'react'
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree,
} from '@react-three/fiber'
import Box from './Box'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'

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
  const [test, setTest] = useState(false)
  const [out, setOut] = useState(false)

  const displayData = (object) => {
    const { userData } = object

    console.log(object)
    const text = document.querySelector('.container')
    const sidebar = document.querySelector('.sidebar')

    if (userData === {}) {
      text.style.visibility = 'hidden'
      text.style.opacity = '0'
      sidebar.style.left = '-390px'
    } else {
      text.style.visibility = 'visible'
      text.style.opacity = '1'
      sidebar.style.left = '0'
      text.innerHTML = userData.name
      sidebar.innerHTML = userData.body
    }
  }

  const myCamera = useRef(null)
  const myControls = useRef(null)

  useEffect(() => {
    if (myCamera.current !== null) {
      animations()
    }
  }, [test, out])

  useEffect(() => {
    setOut(false)
  }, [test])
  useEffect(() => {
    setTest(false)
  }, [out])

  const animations = () => {
    if (test) {
      // focus anims
      gsap.to(myCamera.current.position, {
        duration: 0.5,
        x: 20,
        y: 20,
        z: 20,
        onUpdate: () => {
          myCamera.current.updateProjectionMatrix()
        },
      })
      gsap.to(myControls.current.target, {
        duration: 0.5,
        x: -114.292229,
        y: 0,
        z: -72.47771,
        onUpdate: function () {
          myControls.current.update()
        },
      })
    }
    if (out) {
      // back anims
      gsap.to(myCamera.current.position, {
        duration: 0.5,
        x: 250,
        y: 200,
        z: 250,
        onUpdate: () => {
          myCamera.current.updateProjectionMatrix()
        },
      })
      gsap.to(myControls.current.target, {
        duration: 0.5,
        x: 0,
        y: 0,
        z: 0,
        onUpdate: function () {
          myControls.current.update()
        },
      })
    }
  }

  return (
    <>
      <Canvas>
        {/* {!test && <CameraController  test={test}/>} */}
        {/* { !test && <OrbitControls ref={testRef} enableZoom autoRotate autoRotateSpeed={0.5}/>} */}

        {/* <Timeline target={testRef}></Timeline> */}
        <PerspectiveCamera
          ref={myCamera}
          makeDefault
          position={[250, 200, 250]}
        />
        <OrbitControls
          ref={myControls}
          camera={myCamera.current}
          autoRotate={!test}
          autoRotateSpeed={0.5}
          enabled={!test}
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
          <HaasjeOver setTest={setTest} test={test} />
          <Ground />
          <Dylano setTest={setTest} test={test} />
          <Block />
          <Building onClick={(e) => displayData(e.object)} />
          <Marker />
          <Auto />
        </Suspense>
        <Box />
      </Canvas>
      <div className='sidebar'></div>
      <div className='container'>
        <span className='title'>Test threejs</span>
      </div>
      <div
        style={{
          width: 200,
          height: 80,
          backgroundColor: 'green',
          position: 'fixed',
          bottom: 20,
          left: 20,
        }}
        onClick={() => setOut(true)}
      ></div>
    </>
  )
}

export default App

// https://gltf.pmnd.rs/
// npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d
