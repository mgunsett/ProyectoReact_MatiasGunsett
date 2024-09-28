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
                <Button label={'Twitter'} href={'#'}>
                    <FaTwitter />
                </Button>
                <Button label={'YouTube'} href={'#'}>
                    <FaYoutube />
                </Button>
                <Button label={'Instagram'} href={'#'}>
                    <FaInstagram />
                </Button>
            </Stack>
        </Flex>
        </Box>
    )
}