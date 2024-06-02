import React from 'react'
import {
  Box,
  Flex,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer
} from '@chakra-ui/react'

interface ModeSelectorProps {
  setMode: (mode: TMode) => void
  setUnstablePoint: (idx: number) => void
}

type TMode = 'normal' | 'instability'

const ModeSelector: React.FC<ModeSelectorProps> = ({
  setMode,
  setUnstablePoint
}) => {
  console.log(setMode)
  return (
    <Box
      p={3}
      borderWidth={1}
      borderRadius={8}
      mt={2}
      w="full"
      alignItems={'center'}
    >
      <Flex direction="row" w="full" alignItems={'center'}>
        <FormLabel m={0} ps={1}>
          Unstable Point
        </FormLabel>
        <Spacer />
        <NumberInput
          defaultValue={0}
          onChange={(value) => setUnstablePoint(Number(value))}
          min={0}
          w={40}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      {/* <Flex direction="row" w="full" alignItems={'center'} pt={3}>
        <FormLabel m={0} ps={1}>
          Mode
        </FormLabel>
        <Spacer />
        <Select
          value={'normal'}
          onChange={(e) => setMode(e.target.value as TMode)}
          w={40}
        >
          <option value="normal">Normal</option>
          <option value="instability">Instability</option>
        </Select>
      </Flex> */}
    </Box>
  )
}

export default ModeSelector
