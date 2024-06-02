import { Box } from '@chakra-ui/react'
import { IPoint, IGhostProjection } from '@/shared/types'
import { getInsScale, getXScale, getYScale } from '@/shared/utils'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface IProp {
  projection: IPoint[]
  ghostProjections: IGhostProjection
  ghostIndices: number[]
  instablityRanks: number[]
  instabilities: number[]
  unstablePoint: number
  mode: string
  setPoints: (points: number[]) => void
  width: number
  height: number
}

export default function Projection(props: IProp) {
  const {
    projection,
    ghostProjections,
    ghostIndices,
    instablityRanks,
    instabilities,
    unstablePoint,
    mode,
    setPoints,
    width,
    height
  } = props
  console.log(mode, unstablePoint)
  console.log(ghostIndices)

  const svgRef = useRef<SVGSVGElement>(null)
  const gRef = useRef<SVGGElement>(null)
  const brushRef = useRef<SVGGElement>(null)

  const xScale = getXScale(projection, width)
  const yScale = getYScale(projection, height)
  const colorScale = d3
    .scaleOrdinal(d3.schemeTableau10)
    .domain(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])

  useEffect(() => {
    const svg = d3.select(svgRef.current!)

    const g = d3.select(gRef.current!)

    g.selectAll('circle')
      .data(projection)
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
      .zoom<SVGSVGElement, unknown>()
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

    const brushG = d3.select(brushRef.current!)
    const brush = d3
      .brush()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('end', (event) => {
        if (!event.selection) return
        const transform = d3.zoomTransform(g.node() as SVGGElement)

        const [[x0, y0], [x1, y1]] = [
          transform.invert(event.selection[0]),
          transform.invert(event.selection[1])
        ]
        // console.log(transform.invert([x0, y0]), transform.invert([x1, y1]))
        // const [ix0, iy0] = transform.invert([x0, y0])
        // const [ix1, iy1] = transform.invert([x1, y1])

        const selectedPoints = projection.filter(
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

  useEffect(() => {
    console.log('mode')
    if (mode === 'instability') {
      const g = d3.select(gRef.current)
      const insColorScale = d3
        .scaleSequential(d3.interpolateViridis)
        .domain([0, 1])
      const insScale = getInsScale(instabilities)

      g.selectAll('circle')
        .data(projection)
        // .attr('fill', 'red')
        .attr('fill', (d) => {
          // console.log(instabilities[d.i])
          // console.log(insScale(instabilities[d.i]))
          return insColorScale(insScale(instabilities[d.i]))
        })
    } else {
      const g = d3.select(gRef.current)

      g.selectAll('circle')
        .data(projection)
        .attr('fill', (d) => colorScale(String(d.l)))
    }
  }, [mode])

  useEffect(() => {
    if (unstablePoint === 0) return
    const g = d3.select(gRef.current)
    const target = instablityRanks[unstablePoint - 1]

    g.selectAll('#original').remove()

    g.selectAll('#ghosts').remove()

    g.selectAll('#ghosts')
      .data(ghostProjections.projections.map((p) => p.projection[target]))
      .join('path')
      .attr('id', 'ghosts')
      .attr('d', d3.symbol().type(d3.symbolStar).size(120))
      .attr(
        'transform',
        (d) => `translate(${xScale(Number(d.x))}, ${yScale(Number(d.y))})`
      )
      .attr('fill', 'blue')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)

    g.selectAll('#original')
      .data([projection[target]])
      .join('path')
      .attr('id', 'original')
      .attr('d', d3.symbol().type(d3.symbolCross).size(120))
      .attr(
        'transform',
        (d) => `translate(${xScale(Number(d.x))}, ${yScale(Number(d.y))})`
      )
      .attr('fill', 'red')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
  }, [unstablePoint])

  return (
    <Box>
      <svg ref={svgRef} id="projection-container" width={width} height={height}>
        <g ref={gRef} id="projection" />
        <g ref={brushRef} id="brush" />
      </svg>
    </Box>
  )
}
