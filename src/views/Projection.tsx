import { Box } from '@chakra-ui/react'
import { IProjection } from '@/shared/types'
import { getXScale, getYScale } from '@/shared/utils'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface IProp {
  projection: IProjection
  setPoints: (points: number[]) => void
  width: number
  height: number
}

export default function Projection(props: IProp) {
  const { projection, setPoints: setPoints, width, height } = props
  const svgRef = useRef<SVGSVGElement>(null)
  const gRef = useRef<SVGGElement>(null)
  const brushRef = useRef<SVGGElement>(null)

  useEffect(() => {
    console.log(svgRef)
    const svg = d3.select(svgRef.current)

    const xScale = getXScale(projection.points, width)
    const yScale = getYScale(projection.points, height)
    const colorScale = d3
      .scaleOrdinal(d3.schemeTableau10)
      .domain(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])

    const g = d3.select(gRef.current)

    g.selectAll('circle')
      .data(projection.points)
      .join('circle')
      .attr('cx', (d) => xScale(Number(d.x)))
      .attr('cy', (d) => yScale(Number(d.y)))
      .attr('r', 0.5)
      .attr('fill', (d) => colorScale(String(d.l)))
      .attr('id', (d) => `point-${d.i}`)

    // const legend = svg
    //   .append('g')
    //   .attr('id', 'legend')
    //   .attr('transform', `translate(${width - 100}, ${height - 200})`)

    // legend
    //   .selectAll('circle')
    //   .data(colorScale.domain())
    //   .join('circle')
    //   .attr('cx', 0)
    //   .attr('cy', (_, i) => i * 20)
    //   .attr('r', 5)
    //   .attr('fill', colorScale)

    // legend
    //   .selectAll('text')
    //   .data(colorScale.domain())
    //   .join('text')
    //   .attr('x', 10)
    //   .attr('y', (_, i) => i * 20)
    //   .attr('dy', '0.35em')
    //   .text((d) => d)

    const zoom = d3
      .zoom()
      .scaleExtent([1, 20])
      .filter((event) => event.type === 'wheel')
      .on('zoom', (event) => {
        if (event.transform.k <= 1) {
          event.transform.k = 1
          event.transform.x = 0
          event.transform.y = 0
        }
        g.transition().delay(10).attr('transform', event.transform)
      })

    svg.call(zoom)

    const brushG = d3.select(brushRef.current)
    const brush = d3
      .brush()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('end', (event) => {
        if (!event.selection) return
        const transform = d3.zoomTransform(g.node())

        const [[x0, y0], [x1, y1]] = [
          transform.invert(event.selection[0]),
          transform.invert(event.selection[1])
        ]
        // console.log(transform.invert([x0, y0]), transform.invert([x1, y1]))
        // const [ix0, iy0] = transform.invert([x0, y0])
        // const [ix1, iy1] = transform.invert([x1, y1])

        const selectedPoints = projection.points.filter(
          (point) =>
            xScale(Number(point.x)) >= x0 &&
            xScale(Number(point.x)) <= x1 &&
            yScale(Number(point.y)) >= y0 &&
            yScale(Number(point.y)) <= y1
        )
        console.log(selectedPoints)
        setPoints(selectedPoints.map((point) => point.i))
      })

    brushG.call(brush)
  }, [])

  return (
    <Box>
      <Box m="2rem">
        <svg
          ref={svgRef}
          id="projection-container"
          width={width}
          height={height}
        >
          <g ref={gRef} id="projection" />
          <g ref={brushRef} id="brush" />
        </svg>
      </Box>
    </Box>
  )
}
