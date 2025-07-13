import { Heading, Text, Button, Flex, Box } from '@chakra-ui/react'
import { MdOutlineWhatsapp } from 'react-icons/md'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const AprobedPay = () => {
  return (
    <Flex
    textAlign="center" 
    py={6} 
    px={6}  
    background={'transparent'}
    h={'72vh'}
    direction={'column'}
    gap={12}
    alignItems={'center'}
    //border={'1px solid white'}
    >
      <Box>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Muchas Gracias por tu compra!
        </Heading>
        <Text color={'gray.500'}>
          Tu pago fue realizado con éxito! 
        </Text>
        <Text color={'gray.500'}>
          Comunicate con uno de nosotros para coordinar tu envio 👇
        </Text>
      </Box>
      <Flex  justifyContent="center" alignItems="center">
        <Link to='https://wa.link/oyoj7s' target='_blank'>
        <Button
        px={4}
        fontSize={'sm'}
        rounded={'full'}
        color={'white'}
        background={'transparent'}
        border={'1px solid white'}
        _hover={{ bg: '#25D366' }}
        gap={2}
        >   
            <MdOutlineWhatsapp size={'20px'}/>
            Enviar mensaje...
        </Button>
      </Link>
    </Flex>
    </Flex>
  )
}