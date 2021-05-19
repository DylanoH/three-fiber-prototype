/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/StrijpS_Gebouw_01_BlokErOnder.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.StrijpS_Gebouw_01_BlokErOnder.geometry}
        material={materials.M_Gebouw_01_BlokErOnder}
        position={[-119.545135, 6.07, -93.12509]}
        rotation={[0, -0.49498606, 0]}
        userData={{ name: 'StrijpS_Gebouw_01_BlokErOnder' }}
      />
    </group>
  )
}

useGLTF.preload('/assets/StrijpS_Gebouw_01_BlokErOnder.glb')
