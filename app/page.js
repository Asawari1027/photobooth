// app/page.js
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'

// Dynamically import models to avoid SSR issues
const VintageCamera = dynamic(() => import('../components/VintageCamera'), { ssr: false })
const PolaroidCamera = dynamic(() => import('../components/PolaroidCamera'), { ssr: false })
const PhotoBooth = dynamic(() => import('../components/PhotoBooth'), { ssr: false })

export default function HomePage() {
  const [currentModel, setCurrentModel] = useState(1)
  const [mouseX, setMouseX] = useState(0)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setCurrentModel((prev) => Math.max(1, prev - 1))
    } else if (e.key === 'ArrowRight') {
      setCurrentModel((prev) => Math.min(3, prev + 1))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={(e) => setMouseX(e.clientX)}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/anime.mp4" type="video/mp4" />
      </video>

      {/* 3D Model Display */}
      <div className="absolute z-10 w-full h-full flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5] }} style={{ width: '60vw', height: '60vh' }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            {currentModel === 1 && <VintageCamera mouseX={mouseX} />}
            {currentModel === 2 && <PolaroidCamera mouseX={mouseX} />}
            {currentModel === 3 && <PhotoBooth mouseX={mouseX} />}
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Model Label */}
      <div className="absolute bottom-10 w-full text-center z-20 text-white text-xl font-bold">
        {currentModel === 1 && 'Vintage Camera'}
        {currentModel === 2 && 'Polaroid'}
        {currentModel === 3 && 'Photobooth'}
      </div>
    </div>
  )
}