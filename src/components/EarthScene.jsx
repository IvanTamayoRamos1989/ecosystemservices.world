import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const meshRef = useRef()
  const pointsRef = useRef()

  // Generate points on a sphere to represent landmass/data points
  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const accentColor = new THREE.Color('#00ff9d')
    const dimColor = new THREE.Color('#1a3a2a')

    for (let i = 0; i < count; i++) {
      // Distribute points on sphere surface using fibonacci sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)

      const radius = 1.5
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random color between accent and dim
      const blend = Math.random()
      const color = blend > 0.7 ? accentColor : dimColor
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [])

  // Orbital rings
  const ringPoints = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.2
      positions[i * 3] = radius * Math.cos(angle)
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = radius * Math.sin(angle)
    }
    return positions
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.08
    }
  })

  return (
    <group>
      {/* Wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.48, 32, 32]} />
        <meshBasicMaterial
          color="#0a1f14"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Data points on sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} />
      </points>

      {/* Orbital ring */}
      <points rotation={[Math.PI * 0.3, 0, Math.PI * 0.1]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ringPoints.length / 3}
            array={ringPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#00ff9d" transparent opacity={0.3} />
      </points>

      {/* Second orbital ring */}
      <points rotation={[Math.PI * 0.6, Math.PI * 0.2, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ringPoints.length / 3}
            array={ringPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.012} color="#00ff9d" transparent opacity={0.15} />
      </points>

      {/* Ambient glow */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#00ff9d" transparent opacity={0.03} />
      </mesh>
    </group>
  )
}

function EarthScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Earth />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  )
}

export default EarthScene
