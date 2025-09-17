import {
  Flex,
  Box,
  Heading,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react'
import {
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsInstagram, BsWhatsapp, BsPerson } from 'react-icons/bs'
import './Styles/Contacto.css'
import { Link } from 'react-router-dom'
import './Styles/Mediaquerys.css'

export const Contacto = () => {
  return (
    <Box 
    paddingTop={16}
    marginTop={-16}
    backgroundColor={'white'}
    height={'86vh'}
    mt={8}
    mb={{base:'116px', md: 6}}
    >
          <Flex
          className='contacto-container'
          w={{ base: '90%', sm: '90%', md: '60%'}}
          h={'640px'}
          mx="auto"
          p={{ base: 5, md: 10}}
          direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
          alignItems="center"
          justifyContent={{ base: 'center', sm: 'center', md: 'space-evenly'}}
        >
          <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              paddingTop={3}
              marginLeft={{base:'-15px'}}
            >
            <Heading
              fontSize={{ base: '80px',md: "90px", lg: "100px" }}
              fontWeight={400}
              color="black"
              fontFamily= {'"Bebas Neue", system-ui, sans-serif'}
              alignSelf={'center'}
            >
              Contacto
            </Heading>
            <HStack
              mt={{ lg: 10, md: 8, base: 2 }}
              mb={{base: 10}}
              spacing={5}
              px={10}
            >
              <Link to='https://www.facebook.com/' target='_blank'>
                <IconButton
                  color='black'
                  aria-label="facebook"
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#0D74FF' }}
                  icon={<MdFacebook size="24px" />}
                />
              </Link>
              <Link to='https://www.instagram.com/bereal.sf/' target='_blank'>
                <IconButton
                  color='black'
                  aria-label="instagram"
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: 'linear-gradient(40deg, #405DE6 , #5851DB, #833AB4, #C13584,#E1306C, #FD1D1D)' }}
                  icon={<BsInstagram size="24px" />}
                />
              </Link>
              <Link to='https://wa.link/oyoj7s' target='_blank'>
                <IconButton
                  color='black'
                  aria-label="discord"
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#25D366' }}
                  icon={<BsWhatsapp size="24px" />}
                />
              </Link>
            </HStack>
          </Flex>
          <Box
            className='contacto-form'
            p={7}
            w={{ base: '280px', sm: '50%' }}
            h={'auto'}
          >
              <VStack spacing={3}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <BsPerson color="gray.800" />
                    </InputLeftElement>
                    <Input type="text" size="md" />
                  </InputGroup>
                </FormControl>
                <FormControl id="name">
                  <FormLabel>Mail</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineEmail color="gray.800" />
                    </InputLeftElement>
                    <Input type="text" size="md" />
                  </InputGroup>
                </FormControl>
                <FormControl id="name">
                  <FormLabel>Consulta</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    _hover={{
                      borderRadius: 'gray.300',
                    }}
                    placeholder="message"
                  />
                </FormControl>
                <FormControl id="name" float="right">
                  <Button 
                    variant="solid" 
                    bg="#000000" 
                    color="white" 
                    _hover={{ bg: '#222222' }}
                  >
                    Enviar Mensaje
                  </Button>
                </FormControl>
              </VStack>
          </Box> 
        </Flex>
      </Box>
  )
}