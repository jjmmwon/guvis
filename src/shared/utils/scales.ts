import * as d3 from 'd3'
import { IPoint } from '@shared/types'

const getXScale = (points: IPoint[], width: number) => {
  const xExtent: [number, number] = d3.extent<number>(
    points.map((d: IPoint) => Number(d.x))
  ) as [number, number]
  const [xMin, xMax] = [xExtent[0], xExtent[1]]

  return d3
    .scaleLinear()
    .domain([xMin * 1.1, xMax * 1.1])
    .range([0, width])
}
const getYScale = (points: IPoint[], height: number) => {
  const yExtent: [number, number] = d3.extent(
    points.map((d: IPoint) => Number(d.y))
  ) as [number, number]
  const [yMin, yMax]: number[] = [yExtent[0], yExtent[1]]

  return d3
    .scaleLinear()
    .domain([yMin * 1.1, yMax * 1.1])
    .range([height, 0])
}

export { getXScale, getYScale }
