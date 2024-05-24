import React, { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Text
} from '@chakra-ui/react'
import { Ttitle } from '@shared/types'

interface AttributeSelectorProps {
  onRun: (dataTitle: Ttitle, numberOfGhosts: number) => void
}

const AttributeSelector: React.FC<AttributeSelectorProps> = ({ onRun }) => {
  const [dataTitle, setDataTitle] = useState<Ttitle>('mnist')
  const [numberOfGhosts, setNumberOfGhosts] = useState<number>(8)

  const handleSubmit = () => {
    onRun(dataTitle, numberOfGhosts)
  }

  return (
    <Box p={4} borderWidth={1} borderRadius={5} boxShadow="lg">
      <Flex>
        <Text>Data</Text>
        <Select
          value={dataTitle}
          onChange={(e) => setDataTitle(e.target.value as Ttitle)}
        >
          <option value="mnist">MNIST</option>
          <option value="fmnist">FMNIST</option>
          <option value="kmnist">KMNIST</option>
        </Select>
      </Flex>

      <Flex id="numberOfGhosts" mb={4}>
        <Text>Number of Ghosts</Text>
        <NumberInput
          value={numberOfGhosts}
          onChange={(value) => setNumberOfGhosts(Number(value))}
          defaultValue={8}
          min={1}
          max={20}
        >
          <NumberInputField />
        </NumberInput>
      </Flex>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Run
      </Button>
    </Box>
  )
}

export default AttributeSelector
