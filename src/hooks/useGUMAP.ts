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
      console.log(dataTitle, numberOfGhosts)
      const response = await fetch(
        // `http://localhost:50018/gumap/?data=${dataTitle}&nGhosts=${numberOfGhosts}`
        // `http://localhost:50018/umap`
        `${dataTitle}_response_16.json`
      )
      const data: GhostUMAPResponse = await response.json()
      console.log(data)

      setData(data)
    }
    fetchData()
  }, [trigger])
  return { data }
}
