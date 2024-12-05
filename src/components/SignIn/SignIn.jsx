import './SignIn.css';
import { 
    Flex, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Heading,
    Image
} from '@chakra-ui/react';
import  googlrIcon  from '../../assets/googlrIcon.svg';

export const SignIn = () => {
    return (
        <Flex 
        className='signInContainer'
        p={4} 
        justifyContent="center"
        flexDirection="column" 
        alignItems="center"
        maxWidth="700px" 
        mx="auto"
        boxSize={'md'}
        color={'white'}
        background={'rgba(33, 33, 65, 0.621)'}
        borderRadius={8}
        backdropFilter={'blur(2px)'}
        >
            <Heading 
            as="h1" 
            mb={6}
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "10px", sm: "20px", lg: "30px" }}
            fontFamily={'"Lacquer", system-ui'}
            >
                Ingresar
            </Heading>
            <form>
                <FormControl id="email" mb={4}>
                    <FormLabel>Email:</FormLabel>
                    <Input type="email" name="email" required />
                </FormControl>
                <FormControl id="password" mb={6}>
                    <FormLabel>Password:</FormLabel>
                    <Input type="password" name="password" required />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full">Iniciar Sesión</Button>
                <Button 
                    type="button" 
                    variant='outline' 
                    width="full"
                    color={'gray.500'}
                    mt={4} mb={4}    
                    _hover={{ 
                        bg: '#4285F4', 
                        color: 'white', 
                        borderColor: '#4285F4',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <Image 
                        src={googlrIcon} 
                        alt="Google Icon" 
                        w={5} h={5} mr={3}                        
                    />
                    Iniciar con Google
                </Button>
            </form>
        </Flex>
    );
};


