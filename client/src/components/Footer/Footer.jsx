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
import { FaInstagram, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

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
        <Box bg={'black'} color={'white'} padding={'30px'} >
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
                <Flex 
                direction={'column'} 
                alignItems={'center'} 

                gap={2}
                mt={{ base: 4, md:2 }}
                >
                    <Text textAlign={'center'}> 2021 BeReal Clothes. Todos los Derechos Reservados.</Text>
                    <Flex direction={'row'} alignItems={'center'} gap={2}>
                    <Text>
                        Desarrollo Web -  
                    </Text>
                        <Link to={'https://www.linkedin.com/in/matiasgunsett/'} target='_blank'>
                            <Flex 
                            direction={'row'}
                            alignItems={'center'}
                            gap={2}
                            _hover={{ 
                                color: 'blue.600'
                            }}
                            >      
                                Matías Gunsett  <FaLinkedin size={'20px'}/>
                            </Flex>
                        </Link>
                        
                    </Flex>
                </Flex>
                <Stack direction={'row'} spacing={6} mt={{ base: 4, md: 0 }}>
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
                        transition={'all 0.4s ease-in-out'}
                        label={'WhatsApp'} 
                        boxSize={isAtPageEnd ? '35px' : '45px'}
                        _hover={{ 
                            bg: 'linear-gradient(40deg, #25D366, #25D366, #25D366, #25D366, #25D366, #25D366)',
                            color: 'white',
                            transform: 'scale(1.1)',
                        }}
                        position={'fixed'}
                        right={{base: isAtPageEnd ? '130px' : '28px', md: '30px'}}
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