/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useAnimations } from '@react-three/drei/core/useAnimations'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, useFrame } from 'react-three-fiber'

export default function Model(props) {
  const { nodes, materials, animations } = useGLTF('/assets/auto.glb')

  const { ref, actions, names } = useAnimations(animations)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]]
      .reset()
      .fadeIn(0.5)
      .play()
      .setLoop(THREE.LoopRepeat)
  }, [index, actions, names])

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          ref={ref}
          castShadow
          receiveShadow
          geometry={nodes.Box005.geometry}
          material={materials.M_Auto}
          position={[182.418655, 0, 57.63814]}
          rotation={[0, 0.674054, 0]}
          userData={{ name: 'Box005' }}
        />
      </group>
    </>
  )
}

useGLTF.preload('/auto.glb')
