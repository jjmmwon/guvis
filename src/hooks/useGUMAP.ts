import { useEffect, useState } from 'react'
import { GhostUMAPResponse } from '@shared/types'

type Title = 'mnist' | 'fmnist' | 'kmnist'

export default function useGUMAP(
  init: boolean,
  trigger: boolean,
  dataTitle: Title | null,
  numberOfGhosts: number | null
) {
  // const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GhostUMAPResponse | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!init) return
      const response = await fetch(
        `https://localhost:50015/gumap?data=${dataTitle}&n_ghosts=${numberOfGhosts}`
      )
      const data: GhostUMAPResponse = await response.json()
      console.log(data)

      setData(data)
    }
    fetchData()
  }, [trigger])
  return { data }
}
