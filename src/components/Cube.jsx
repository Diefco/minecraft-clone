import { useStore } from '../hooks/useStore.js'
import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import * as textures from '../images/textures.js'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [removeCube] = useStore((state) => [state.removeCube])
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      onPointerMove={(event) => {
        event.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setIsHovered(false)
      }}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
        console.log(event.altKey)
        if (event.altKey) {
          removeCube(id)
        }
      }}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'gray' : 'white'}
        transparent
        map={activeTexture}
        attach="material"
      />
    </mesh>
  )
}
