type Ttitle = 'mnist' | 'fmnist' | 'kmnist'

interface IPoint {
  i: number
  x: number
  y: number
  l: number | string | null
}

interface IProjection {
  projection: IPoint[]
}

interface IGhostProjection {
  projections: IProjection[]
}

interface GhostUMAPResponse {
  projection: IPoint[]
  ghostProjections: IGhostProjection
  ghostIndices: number[]
  instabilityRanks: number[]
  instabilities: number[]
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
  IGhostProjection,
  GhostUMAPResponse,
  IPixels,
  PixelResponse
}
