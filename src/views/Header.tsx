// import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
// import { AiFillGithub } from "react-icons/ai";
// import { FiExternalLink } from "react-icons/fi";

import { Flex, Text, Button, Heading, Link } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'

function Header() {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justify="space-between"
      padding={2}
    >
      <Flex alignItems={'center'} mx={5}>
        <Heading size="md" variant={'layout'} alignItems="center">
          GUVIS
        </Heading>
      </Flex>
      <Flex pr={3}>
        <Flex alignItems={'center'} gap={4}>
          <Link href="https://idclab.skku.edu" isExternal>
            <Button
              variant={'layout'}
              leftIcon={<FiExternalLink />}
              p={0}
              m={0}
            >
              <Text
                variant={'layout'}
                fontFamily="Rajdhani"
                fontWeight={900}
                fontSize="lg"
              >
                IDC
              </Text>
              <Text
                variant={'layout'}
                fontFamily="Rajdhani"
                fontSize="lg"
                fontWeight={500}
              >
                Lab
              </Text>
            </Button>
          </Link>
          <Link href="https://github.com/jjmmwon" isExternal>
            <Button variant={'layout'} leftIcon={<AiFillGithub />} p={0} m={0}>
              GitHub
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header

// export default function Header() {
//   return (
//     <Flex
//       align="center"
//       justifyContent="space-between"
//       px={4}
//       py={2}
//       w="container.2xl"
//     >
//       <Flex alignItems={"center"}>
//         {/* <Icon as={IoIosBowtie} mr={1} boxSize={6} color="gray.500" /> */}
//         <Heading size="md" variant={"layout"} alignItems="center">
//           Shadow UMAP
//         </Heading>
//       </Flex>
//       <Flex alignItems={"center"} gap={4}>
//         <Link href="https://idclab.skku.edu" isExternal>
//           <Button variant={"layout"} leftIcon={<FiExternalLink />} p={0} m={0}>
//             <Text
//               variant={"layout"}
//               fontFamily="Rajdhani"
//               fontWeight={900}
//               fontSize="lg"
//             >
//               IDC
//             </Text>
//             <Text
//               variant={"layout"}
//               fontFamily="Rajdhani"
//               fontSize="lg"
//               fontWeight={500}
//             >
//               Lab
//             </Text>
//           </Button>
//         </Link>
//         <Link href="https://github.com/jjmmwon" isExternal>
//           <Button variant={"layout"} leftIcon={<AiFillGithub />} p={0} m={0}>
//             GitHub
//           </Button>
//         </Link>
//       </Flex>
//     </Flex>
//   );
// }
