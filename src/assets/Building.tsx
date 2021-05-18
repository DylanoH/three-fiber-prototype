/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    StrijpS_Gebouw_02: THREE.Mesh
  }
  materials: {
    M_Building2: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(
    '/assets/StrijpS_Gebouw_02.glb'
  ) as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.StrijpS_Gebouw_02.geometry}
        material={materials.M_Building2}
        position={[144.373352, 0, -55.8524]}
        rotation={[Math.PI, -0.69813182, Math.PI]}
        userData={{ name: 'StrijpS_Gebouw_02' }}
      />
    </group>
  )
}

useGLTF.preload('/assets/StrijpS_Gebouw_02.glb')
