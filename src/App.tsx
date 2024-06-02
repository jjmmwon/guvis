import { Box, Center, Flex, Spacer } from '@chakra-ui/react'
import {
  ProjectionGenerator,
  Header,
  Panel,
  Projection,
  ModeSelector
} from '@/views'
import { useState } from 'react'
import { IPixels, Ttitle } from '@/shared/types'
import { useGUMAP, usePixel } from '@/hooks'

function App() {
  const [dataTitle, setDataTitle] = useState<Ttitle | null>('mnist')
  const [numberOfGhosts, setNumberOfGhosts] = useState<number>(8)
  const [init, setInit] = useState<boolean>(false)
  const [trigger, setTrigger] = useState<boolean>(false)
  const [unstablePoint, setUnstablePoint] = useState<number>(0)
  const [mode, setMode] = useState<string>('normal')

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
          <Box mx={5}>
            <ProjectionGenerator onRun={onRun} />

            <ModeSelector
              setMode={setMode}
              setUnstablePoint={setUnstablePoint}
            />

            {pixels && (
              <Box
                flex={'1'}
                borderWidth={1}
                borderRadius={8}
                p={3}
                mt={3}
                h={'70vh'}
                overflow={'auto'}
              >
                <Panel
                  points={points}
                  pixel={pixels as IPixels}
                  pixelSize={2}
                />
              </Box>
            )}
          </Box>
          <Spacer />

          {!data && <Box></Box>}
          {data && (
            <Flex direction="row" w="full" justifyContent="space-around">
              {/* <Text fontSize="xl" fontWeight="bold">
                {'GhostUMAP View'}
              </Text> */}

              <Projection
                projection={data.projection}
                ghostProjections={data.ghostProjections}
                ghostIndices={data.ghostIndices}
                instablityRanks={data.instabilityRanks}
                instabilities={data.instabilities}
                unstablePoint={unstablePoint}
                mode={mode}
                setPoints={setPoints}
                width={800}
                height={800}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Center>
  )
}

export default App
