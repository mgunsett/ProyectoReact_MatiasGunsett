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
    p={{ base: '70px', sm: '110px' }}  
    direction={'column'}
    gap={12}
    alignItems={'center'}
    backgroundColor='white'
    border={'1px solid black'}
    width={{ base: '85%', sm: '40%'}}
    margin={'0 auto 53px auto'}
    >
      <Box>
        <CheckCircleIcon 
          boxSize={{ base: '40px', sm: '50px' }} 
          color={'green.500'} 
        />
        <Heading 
          as="h2" 
          mt={6} 
          mb={2}
          color={'black'}
          lineHeight={'1'}
          fontFamily={'"Bebas Neue", system-ui, sans-serif'}
          fontWeight={'400'}
          fontSize={{ base: '50px', sm: '80px' }}
          width={{ base: '300px', sm: '600px' }}
          
        >
          Muchas Gracias <br />
          por tu compra!
        </Heading>
        <Text color={'black'}>
          Tu pago fue realizado con éxito! 
        </Text>
        <Text color={'black'}>
          Comunicate con uno de nosotros para coordinar tu envio 👇
        </Text>
      </Box>
      <Flex  justifyContent="center" alignItems="center">
        <Link to='https://wa.link/oyoj7s' target='_blank'>
        <Button
        px={4}
        fontSize={{ base: 'sm', sm: 'md' }}
        rounded={'full'}
        color={'black'}
        background={'#25d365a7'}
        border={'1px solid black'}
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