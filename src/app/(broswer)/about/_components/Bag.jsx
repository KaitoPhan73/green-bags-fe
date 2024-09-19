import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Model(props) {
  const { nodes, materials } = useGLTF('/bag-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/bag-transformed.glb')
