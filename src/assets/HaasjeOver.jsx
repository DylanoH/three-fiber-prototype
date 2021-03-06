/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from 'three'
import React, { useRef, useState, useEffect, useContext, } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { ApiContext } from '../utils/ApiContextProvider'
import { linkPost } from '../utils/linkPost'

export default function Model(props) {
  const [active, setActive] = useState(false)
  const { posts } = useContext(ApiContext)
  const [post, setPost] = useState()

  useEffect(() => {
    document.body.style.cursor = active ? 'pointer' : 'auto'
  }, [active])

  useEffect(() => {
    setPost(linkPost(posts, group.current.userData.name))
  }, [posts])

  const group = useRef(null)
  // const { nodes, materials } = useGLTF('/assets/StrijpS_Gebouw_01.glb')
  const { nodes, materials } = useGLTF('/assets/compressed-haasjeover.glb')

  let position
  if (group.current !== null) position = group.current.position
  return (
    <group {...props} dispose={null}>
      <group
        ref={group}
        // position={props.position}
        position={[-114.292229, 0, -72.47771]}
        rotation={[0, -0.4974189, 0]}
        userData={{
          name: 'Haasjeover',
          components: post?.acf.components
        }}
        onClick={() =>
          props.playFocusAnimations(position.x, position.y, position.z)
        }
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrijpS_Gebouw_01_1.geometry}
          material={materials.M_Gebouw_01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrijpS_Gebouw_01_2.geometry}
          material={materials.M_5060Faces_directUnwrap_Windows}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/compressed-haasjeover.glb')
