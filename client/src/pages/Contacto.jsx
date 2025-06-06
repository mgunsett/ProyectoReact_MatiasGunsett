import {
  Flex,
  Box,
  Heading,
  Text,
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
  MdPhone,
  MdEmail,
  MdLocationOn,
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
    backgroundColor={('gray.200', 'gray.700')}
    >
      <Box 
      className='contacto'
      overflow= 'auto'
      >
        <Flex
          className='contacto-container'
          w={{ base: '90%', sm: '90%', md: '60%'}}
          margin={'60px auto'}
          p={{ base: 5, sm: 5, md: 10, lg: 10 }}
          direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
          alignItems="center"
          justifyContent={{ base: 'center', sm: 'center', md: 'space-evenly'}}
        >
          <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={6}
              paddingTop={5}
              marginLeft={{base:'-15px'}}
            >
            <Heading
              fontSize={{ base: '2xl', sm: '4xl', md: '4xl', lg: '5xl' }}
              color="white"
              fontFamily={'"Lacquer", system-ui, sans-serif'}
            >
              Contacto
            </Heading>
            <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
              Nuestros medios de Contacto:
            </Text>
            
              <Button
                size={{ base: 'md', sm: 'lg' }}
                variant="ghost"
                color="#DCE2FF"
                _hover={{
                  bg: 'transparent'
                }}
                leftIcon={<MdPhone color="rgb(240, 240, 42)" size="20px"/>}
              >
                +54-342-111-1111
              </Button>
              <Button
                size="md"
                variant="ghost"
                color="#DCE2FF"
                _hover={{
                  bg: 'transparent'
                }}
                leftIcon={<MdEmail color="rgb(240, 240, 42)" size="20px" />}
              >
                be-realclothes@gmail.com
              </Button>
              <Button
                size="md"
                variant="ghost"
                color="#DCE2FF"
                _hover={{
                  bg: 'transparent'
                }}
                leftIcon={<MdLocationOn color="rgb(240, 240, 42)" size="20px" />}
              >
                Santa Fe, Argentina
              </Button>

            <HStack
              mt={{ lg: 10, md: 8, base: 6 }}
              mb={{base: 10}}
              spacing={5}
              px={5}
              alignItems="flex-start"
            >
              <Link to='https://www.facebook.com/' target='_blank'>
                <IconButton
                  color='white'
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
                  color='white'
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
                  color='white'
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
            bg="white"
            p={7}
            w={{ base: '280px', sm: '50%' }}
            h={'auto'}
          >
              <VStack spacing={3}>
                <FormControl id="name">
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
                  <Button variant="solid" bg="#0D74FF" color="white" _hover={{ bg: '#1C6FEB' }}>
                    Enviar Mensaje
                  </Button>
                </FormControl>
              </VStack>
          </Box> 
        </Flex>
      </Box>
    </Box>
  )
}