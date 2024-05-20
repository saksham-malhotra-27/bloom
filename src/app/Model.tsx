'use client';
import * as THREE from 'three'
import { ThreeElements, useFrame, useThree } from '@react-three/fiber'
import {useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

useGLTF.preload('/doc.glb')
export default function Model(props: ThreeElements['mesh'] ){
   const group = useRef<Group>(null)
   const {nodes, materials, animations, scene} = useGLTF("/doc.glb")
   const {camera} = useThree()
   camera.position.set(0,0.5,2)
   const [rotationSpeed, setRotationSpeed] = useState(0.01); // Adjust rotation speed

   useFrame(() => {
     if(group.current){
      group.current.rotation.y += rotationSpeed;
     }
   });

  return (
     <group ref={group}>
         <primitive object={scene}/>
     </group>
    )
  }