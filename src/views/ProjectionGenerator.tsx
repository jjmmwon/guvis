import React, { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Spacer
} from '@chakra-ui/react'
import { Ttitle } from '@shared/types'

interface ProjectionGeneratorProps {
  onRun: (dataTitle: Ttitle, numberOfGhosts: number) => void
}

const ProjectionGenerator: React.FC<ProjectionGeneratorProps> = ({ onRun }) => {
  const [dataTitle, setDataTitle] = useState<Ttitle>('mnist')
  const [numberOfGhosts, setNumberOfGhosts] = useState<number>(8)

  const handleSubmit = () => {
    onRun(dataTitle, numberOfGhosts)
  }

  return (
    <Flex p={3} borderWidth={1} borderRadius={8}>
      <Box w="400px">
        {/* <Text fontSize="xl" fontWeight="bold" px={2} pb={2}>
          {'GhostUMAP Generator'}
        </Text> */}
        <Flex direction="row" w="full" alignItems={'center'}>
          <FormLabel m={0} ps={1}>
            Data Title
          </FormLabel>
          <Spacer />
          <Select
            value={dataTitle}
            onChange={(e) => setDataTitle(e.target.value as Ttitle)}
            w={40}
          >
            <option value="mnist">MNIST</option>
            <option value="fmnist">FMNIST</option>
            <option value="kmnist">KMNIST</option>
          </Select>
        </Flex>
        <Flex direction="row" w="full" alignItems={'center'} py={3}>
          <FormLabel my={0} me={8} ps={1}>
            Number of Ghosts
          </FormLabel>
          <Spacer />
          <NumberInput
            value={numberOfGhosts}
            onChange={(value) => setNumberOfGhosts(Number(value))}
            min={1}
            max={20}
            w={40}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
        <Button colorScheme="teal" onClick={handleSubmit} w="full">
          Run
        </Button>
      </Box>
    </Flex>
  )
}

export default ProjectionGenerator
