import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
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
    <Container 
    className='contacto'
    maxW="full" 
    mt={0} 
    centerContent 
    overflow="hidden">
        <Flex
          className='contacto-container'
          >
          <Box p={4}>
            <Wrap 
            spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}
            >
              <WrapItem>
                <Box>
                  <Heading fontSize={{ base: '2xl', sm: '4xl', md: '4xl', lg: '5xl' }}>Contacto</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                    Nuestros medios de Contacto:
                  </Text>
                  <Box className='contacto-info'> 
                      <Button
                        size="md"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="rgb(240, 240, 42)" size="20px" />}>
                        +54-342-111-1111
                      </Button>
                      <Button
                        size="md"
                       
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="rgb(240, 240, 42)" size="20px" />}>
                        be-realclothes@gmail.com
                      </Button>
                      <Button
                        size="md"
                       
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="rgb(240, 240, 42)" size="20px" />}>
                        Santa Fe, Argentina
                      </Button>
                  </Box>

                  <HStack
                    mt={{ lg: 10, md: 8, sm: 6 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                      <Link to='https://www.facebook.com/' target='_blank'>
                    <IconButton
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
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#25D366'}}
                      icon={<BsWhatsapp size="24px" />}
                    />
                    </Link>
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
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
                        <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                          Enviar Mensaje
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>
    </Container>
  )
}