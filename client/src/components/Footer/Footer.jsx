import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    Image
  } from '@chakra-ui/react';
import logo_2 from '../../assets/logo_2.png';
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
    const [isAtPageEnd, setIsAtPageEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const reachedEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
            setIsAtPageEnd(reachedEnd);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <Box bg={'black'} color={'white'} padding={'30px'}>
            <Flex 
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'center', md: 'center' }} 
                justifyContent={'space-between'}
                gap={6}
            >
                <Box>
                    <Link to='/'>   
                        <Image width={'70px'} height={'70px'} src={logo_2} alt="Logo principal" />
                    </Link>
                </Box>
                <Text textAlign={'center'}> 2024 BeReal. Todos los Derechos Reservados.</Text>
                <Stack direction={'row'} spacing={6} mt={{ base: 4, md: 0 }}>
                    <Button 
                        label={'Twitter'} 
                        boxSize={'35px'}
                        _hover={{
                            bg: 'linear-gradient(40deg, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2, #1DA1F2)',
                            color: 'white'
                        }}
                    >
                        <Link to={'https://twitter.com/'} target='_blank'>
                            <FaTwitter size={'20px'}/>
                        </Link>
                    </Button>
                    <Button 
                        label={'Instagram'} 
                        _hover={{ 
                            bg: 'linear-gradient(40deg, #405DE6 , #5851DB, #833AB4, #C13584,#E1306C, #FD1D1D)',
                            color: 'white'
                        }}
                        boxSize={'35px'}
                        mr={16}
                    >
                        <Link to={'https://www.instagram.com/bereal.sf/'} target='_blank'>
                            <FaInstagram size={'20px'}/>
                        </Link>
                    </Button>
                    <Button 
                        transition={'all 0.3s ease-in-out'}
                        label={'WhatsApp'} 
                        boxSize={isAtPageEnd ? '35px' : '45px'}
                        _hover={{ 
                            bg: 'linear-gradient(40deg, #25D366, #25D366, #25D366, #25D366, #25D366, #25D366)',
                            color: 'white'
                        }}
                        position={'fixed'}
                        right={{base: isAtPageEnd ? '110px' : '28px', md: '30px'}}
                        bottom={{base: isAtPageEnd ? '31px' : '28px', md: '47px'}}
                        bg={isAtPageEnd ? undefined : '#25D366'}
                        color={isAtPageEnd ? undefined : 'white'}
                        boxShadow={isAtPageEnd ? 'md' : '0 0 0 3px rgba(37,211,102,0.35)'}
                        transform={isAtPageEnd ? 'scale(1.06)' : 'none'}
                        opacity={isAtPageEnd ? 0.95 : 1}
                    >
                        <Link to={'https://wa.link/oyoj7s'} target='_blank'>
                            <FaWhatsapp size={isAtPageEnd ? '20px' : '25px'}/>
                        </Link>
                    </Button>
                </Stack>
            </Flex>
        </Box>
    )
}