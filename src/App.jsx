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

import { Controls, PlayState, Timeline, Tween } from 'react-gsap';
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
// extend({ OrbitControls })
// useFrame((state) => {
//   // console.log(props.test);
//   if(zoom) {
//   const step = 0.1
//   // state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
//   state.camera.position.lerp(vec.set(zoom ? 25 : 40, zoom ? 1 : 15, zoom ? 0 : 60), step)
//   state.camera.lookAt(-114.292229, 0, -72.47771);    
//   state.camera.updateProjectionMatrix()
//   }
// })
// const CameraController = (props) => {
//   const { camera, gl } = useThree()
//   console.log('test', props.test);
  
//   camera.position.set( 250, 200,250)
//   camera.lookAt(0,0,0)

//   useEffect(() => {
//     if(!props.test) {
//     const controls = new OrbitControls(camera, gl.domElement)
//     controls.maxPolarAngle = Math.PI / 2.5
//     controls.enableZoom = true
//     controls.enablePan = true
//     controls.autoRotateSpeed = 0.5
//     controls.autoRotate = true


//     return () => {
//       controls.dispose()
//     }
//   }
//   }, [camera, gl, props.test])
//   return null
// }

const App = () => {

  const [test, setTest] = useState(false)

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

  const myCamera = useRef()
  return (
    <>

      <Canvas>
         {/* {!test && <CameraController  test={test}/>} */}
         {/* { !test && <OrbitControls ref={testRef} enableZoom autoRotate autoRotateSpeed={0.5}/>} */}

         {/* <Timeline target={testRef}></Timeline> */}
         <PerspectiveCamera ref={myCamera} makeDefault position={[250, 200, 250]}/>
         <OrbitControls camera={myCamera.current}/>
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
          <Dylano setTest={setTest} test={test}/>
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