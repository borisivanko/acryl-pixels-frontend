import React from 'react'
import {Colors} from '../App'

interface PixelProps {
  color: Colors
  currentColor: Colors
  pixels: Colors[]
  setPixels: (pixels: Colors[])=>void
  id: number
}

const Pixel: React.FC<PixelProps> = ({
  color,
  currentColor,
  pixels,
  setPixels,
  id
}) => {


  const handleClick = () => {
    let newArr = [...pixels]
    newArr[id] = currentColor

    setPixels(newArr)
  }

  return <span className={'pixel ' + color} onClick={handleClick}></span>
}

export default Pixel
