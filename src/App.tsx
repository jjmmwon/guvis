import { Box, Center, Flex } from '@chakra-ui/react'
import { AttributeSelector, Header, Panel, Projection } from '@/views'
import { useState } from 'react'
import { IPixels, IProjection, Ttitle } from '@/shared/types'
import { useGUMAP, usePixel } from '@/hooks'

function App() {
  const [dataTitle, setDataTitle] = useState<Ttitle | null>('mnist')
  const [numberOfGhosts, setNumberOfGhosts] = useState<number>(8)
  const [init, setInit] = useState<boolean>(false)
  const [trigger, setTrigger] = useState<boolean>(false)

  const [points, setPoints] = useState<number[]>([])

  const { data } = useGUMAP(init, trigger, dataTitle, numberOfGhosts)
  const { pixels } = usePixel(init, trigger, dataTitle)

  const onRun = (dataTitle: Ttitle, numberOfGhosts: number) => {
    setInit(true)
    setDataTitle(dataTitle)
    setNumberOfGhosts(numberOfGhosts)
    setTrigger(!trigger)
  }

  return (
    <Center>
      <Flex direction="column" align="center" w="full">
        <Header />
        {/* {!data && (
          <Button colorScheme="blue" onClick={handleLoadData} mt={4}>
            Load Data
          </Button>
        )} */}
        <Flex direction="row" w="full" justifyContent="center">
          <AttributeSelector onRun={onRun} />
          {pixels && (
            <Box flex="1" p={2}>
              <Panel points={points} pixel={pixels as IPixels} pixelSize={3} />
            </Box>
          )}
        </Flex>

        {data && (
          <Flex direction="row" w="full" justifyContent="space-around" p={4}>
            <Box flex="1" p={2}>
              <Projection
                projection={data.projection as IProjection}
                setPoints={setPoints}
                width={800}
                height={800}
              />
            </Box>
            {/* <Box flex="1" p={2}>
              <Panel points={points} pixel={pixels as IPixels} pixelSize={3} />
            </Box> */}
          </Flex>
        )}
      </Flex>
    </Center>
  )
}

export default App
