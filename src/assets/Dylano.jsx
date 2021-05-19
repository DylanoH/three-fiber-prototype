/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef(null)
  const { nodes, materials } = useGLTF('/assets/compressed-dylano.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dylano.geometry}
        material={materials['Material #282']}
        position={[105.1739, 0, -183.56001]}
        userData={{ name: 'Dylano', body: 'Dylano doos' }}
      />
    </group>
  )
}

useGLTF.preload('/assets/compressed-dylano.glb')
