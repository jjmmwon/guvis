import { useEffect, useState } from 'react'
import { IPixels, PixelResponse, Ttitle } from '@shared/types'

export default function usePixel(
  init: boolean,
  trigger: boolean,
  dataTitle: Ttitle | null
) {
  const [pixels, setPixels] = useState<IPixels | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!init) return
      const response = await fetch(`${dataTitle}_pixel.json`)
      const pixels: PixelResponse = await response.json()
      console.log(pixels)

      setPixels(pixels.pixel)
    }
    fetchData()
  }, [trigger])
  return { pixels }
}
