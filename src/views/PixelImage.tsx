import { useRef, useEffect } from 'react'

interface IProp {
  pixels: number[]
  pixelSize: number
}

function PixelImage(prop: IProp) {
  const { pixels, pixelSize } = prop
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = 28 * pixelSize
    canvas.height = 28 * pixelSize

    // imageData는 28x28=784 길이의 배열이며, 각 원소는 0-255 사이의 그레이스케일 값을 가집니다.
    pixels.forEach((value, index) => {
      const x = index % 28
      const y = Math.floor(index / 28)
      const color = 255 - value // 흑백 반전을 위해 255에서 값을 뺍니다.

      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    })
  }, [pixels])

  return <canvas ref={canvasRef}></canvas>
}

export default PixelImage
