import { Heading, Text, Button, Flex, Box } from '@chakra-ui/react'
import { MdOutlineWhatsapp } from 'react-icons/md'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import './AprobedPay.css'

export const AprobedPay = () => {
  return (
    <Flex
    className='aprobed-pay'
    textAlign="center" 
    p={'110px'}  
    mb={'32vh'}
    direction={'column'}
    gap={12}
    alignItems={'center'}
    >
      <Box>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading 
          as="h2" 
          size="xl" 
          mt={6} 
          mb={2}
          color={'white'}
        >
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
        background={'#25d365a7'}
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