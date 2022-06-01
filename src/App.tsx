import React, {useEffect, useState} from 'react'
import Pixel from './components/Pixel'
import Artwork from './components/Artwork'

export type Colors = 'black' | 'purple' | 'blue' | 'lightBlue' | 'green' | 'red' | 'orange' | 'yellow' | 'white'

interface DataProps {
  pixels_id: string
  content: Colors[]
}

const App: React.FC = () => {
  const [pixels, setPixels] = useState<Colors[]>(new Array(64).fill('white'))
  const [data, setData] = useState<DataProps[]>({} as DataProps[])
  const [loading, setLoading] = useState(true)
  const [upload, setUpload] = useState(false)

  const [currentColor, setCurrentColor] = useState<Colors | undefined>(undefined)

  const handleSubmit = async () => {
    try {
      setUpload(true)
      const response = await fetch('https://acrylpixels.borisivanko.sk/api/acryl-pixels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pixels})
      })

      setUpload(false)
      window.location.reload()
    } catch ({message}) {
      console.error(message)
    }
  }

  const getData = async () => {
    try {
      const response = await fetch('https://acrylpixels.borisivanko.sk/api/acryl-pixels')
      const JSONdata = await response.json()

      JSONdata.sort((a: any, b: any) => b.pixels_id - a.pixels_id)

      setData(JSONdata)
      setLoading(false)
    } catch ({message}) {
      console.error(message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <header className="title">
        <h1>Acryl Pixels</h1>
      </header>
      <main className="container">
        <section className="selectors">
          <button
            onClick={() => setCurrentColor('black')}
            className="selector black"
          ></button>
          <button
            onClick={() => setCurrentColor('purple')}
            className="selector purple"
          ></button>
          <button
            onClick={() => setCurrentColor('blue')}
            className="selector blue"
          ></button>
          <button
            onClick={() => setCurrentColor('green')}
            className="selector green"
          ></button>
          <button
            onClick={() => setCurrentColor('yellow')}
            className="selector yellow"
          ></button>
          <button
            onClick={() => setCurrentColor('orange')}
            className="selector orange"
          ></button>
          <button
            onClick={() => setCurrentColor('red')}
            className="selector red"
          ></button>
          <button
            onClick={() => setCurrentColor('white')}
            className="selector white"
          ></button>
        </section>

        {currentColor ? (
          <>
            <section className="pixels">
              {pixels.slice(0, 64).map((pixel, index) => {
                return (
                  <Pixel
                    key={index}
                    id={index}
                    color={pixels[index]}
                    currentColor={currentColor}
                    pixels={pixels}
                    setPixels={setPixels}
                  />
                )
              })}
            </section>
            <section className="buttons">
              <button
                className="btn primary-btn"
                onClick={() => handleSubmit()}
                disabled={upload}
              >
                Publish
              </button>
              <button
                className="btn"
                onClick={() => setPixels(new Array(64).fill('white'))}
              >
                Refresh
              </button>
            </section>
          </>
        ) : (
          <h2 className="message start">Select a color!</h2>
        )}
        <hr/>

        <section>
          <h2 className="recent-title">Recent artworks</h2>
          {loading ? (
            <h2 className="message">Loading...</h2>
          ) : (
            <div className="artworks">
              {data.map((pixels: any) => {
                return (
                  <Artwork key={pixels.pixels_id} content={pixels.content}/>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App
