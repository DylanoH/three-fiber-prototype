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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Loader from './Loader'
import HaasjeOver from './assets/HaasjeOver'
import { Vector3 } from 'three'
import Ground from './assets/Ground'
import Dylano from './assets/Dylano'
import Block from './assets/Block'
import Auto from './assets/Auto'
import Building from './assets/Building'
import Marker from './assets/Marker'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls })

const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.maxPolarAngle = Math.PI / 2.5
    controls.enableZoom = true
    controls.enablePan = true
    controls.autoRotateSpeed = 0.5
    controls.autoRotate = true
    camera.position.set(250, 200, 250)
    camera.lookAt(0, 0, 0)

    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const App = () => {

  const displayData = (object) => {
    const { userData } = object;

    console.log(object);
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

  return (
    <>

      <Canvas>
        <CameraController />
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
          <HaasjeOver onClick={(e) => displayData(e.object)} />
          <Ground />
          <Dylano onClick={(e) => displayData(e.object)} />
          <Block />
          <Building onClick={(e) => displayData(e.object)} />
          <Marker />
          <Auto />
        </Suspense>
        <Box />
      </Canvas>
      <div className="sidebar">
      </div>
      <div className="container">
        <span className='title'>Test threejs</span>
      </div>
    </>
  )
}

export default App

// https://gltf.pmnd.rs/
// npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d