import { Flex } from '@chakra-ui/react'
import { IPixels } from '@shared/types'
import PixelImage from './PixelImage'

interface IProp {
  points: number[]
  pixel: IPixels
  pixelSize: number
  // projection: IProjection
}

function Panel(prop: IProp) {
  // const { points, pixel, pixelSize, projection } = prop
  // console.log(points.map((p: number) => projection.points[p].l))
  const { points, pixel, pixelSize } = prop
  return (
    <Flex wrap="wrap" justifyContent={'center'}>
      <Flex wrap="wrap" w="400px">
        {points.map((p: number) => {
          return <PixelImage key={p} pixels={pixel[p]} pixelSize={pixelSize} />
        })}
      </Flex>

      {/* {points.map((p: number) => {
        return <div key={p}>{projection.points[p].l}</div>
      })} */}
    </Flex>
  )
}

export default Panel
