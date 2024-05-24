type Ttitle = 'mnist' | 'fmnist' | 'kmnist'

interface IPoint {
  i: number
  x: number
  y: number
  l: number | string | null
}

interface IProjection {
  points: IPoint[]
}

interface IGhostProjection {
  projections: IProjection[]
}

interface GhostUMAPResponse {
  projection: IProjection
  ghostProjection: IGhostProjection
  ghostInices: number[]
}

interface IPixels {
  [key: number]: number[]
}

interface PixelResponse {
  pixel: IPixels
}

// interface UMAPResponse {
//   projection: IProjection
// }

export type {
  Ttitle,
  IPoint,
  IProjection,
  GhostUMAPResponse,
  IPixels,
  PixelResponse
}
