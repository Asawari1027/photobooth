'use client'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function PolaroidCamera({ mouseX }) {
  const ref = useRef()
  const { scene } = useGLTF('/polaroid.glb')

  useFrame(() => {
    if (ref.current) ref.current.rotation.y = mouseX * 0.002
  })

  return <primitive ref={ref} object={scene} scale={1.5} />
}
