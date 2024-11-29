import React from 'react';
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
  } from '@chakra-ui/react';
  import logo_2 from '../../assets/logo_2.png';
  import { Link } from "react-router-dom";
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
    return (
        <Box bg={'black'} color={'white'} padding={'30px'}>
        <Flex align={'center'} justifyContent={'space-between'}>
            <Box>
                <Link to='/'>   
                    <img width={'70px'} height={'70px'} src={logo_2} alt="Logo principal" />
                </Link>
            </Box>
            <Text>© 2024 BeReal. Todos los Derechos Reservados.</Text>
            <Stack direction={'row'} spacing={6}>
                <Button 
                    label={'Twitter'} 
                    boxSize={'35px'}
                    _hover={{
                        bg: 'linear-gradient(40deg, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2)',
                        color: 'white'
                    }}
                >
                    <Link to={'https://twitter.com/'} target='_blank'>
                        <FaTwitter />
                    </Link>
                </Button>
                <Button 
                    label={'YouTube'} 
                    boxSize={'35px'}
                    _hover={{ 
                        bg: 'linear-gradient(40deg, #FF0000, #FF0000, #FF0000, #FF0000, #FF0000, #FF0000)',
                        color: 'white'
                    }}
                >
                    <Link to={'https://www.youtube.com/'} target='_blank'>
                        <FaYoutube />
                    </Link>
                </Button>
                <Button 
                    label={'Instagram'} 
                    _hover={{ 
                        bg: 'linear-gradient(40deg, #405DE6 , #5851DB, #833AB4, #C13584,#E1306C, #FD1D1D)',
                        color: 'white'
                    }}
                    boxSize={'35px'}
                >
                    <Link to={'https://www.instagram.com/bereal.sf/'} target='_blank'>
                        <FaInstagram />
                    </Link>
                </Button>
            </Stack>
        </Flex>
        </Box>
    )
}