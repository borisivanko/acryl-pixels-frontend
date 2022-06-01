import React from 'react'
import StaticPixel from './StaticPixel'
import {Colors} from '../App'

interface ArtworkProps {
  content: Colors[];
}

const Artwork: React.FC<ArtworkProps> = ({content}) => {
  return (
    <div className="artwork">
      {content.slice(0, 64).map((pixel: any, index: number) => {
        return <StaticPixel key={index} color={content[index]}/>
      })}
    </div>
  )
}

export default Artwork
