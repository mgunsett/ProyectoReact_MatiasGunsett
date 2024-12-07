import './SignIn.css';
import { 
    Flex, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Heading,
    Image,
    Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { auth } from '../../firebase/config';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithPopup, 
//     GoogleAuthProvider 
// } from 'firebase/auth';
import googlrIcon from '../../assets/googlrIcon.svg';


export const SignIn = () => {
    // const [isRegistering, setIsRegistering] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const auth = getAuth();

    // const handleSignIn = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY', {
    //             email,
    //             password,
    //             returnSecureToken: true
    //         });
    //         alert('Inicio de sesión exitoso');
    //         console.log(response.data);
    //     } catch (error) {
    //         alert(error.response.data.error.message);
    //     }
    // };

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY', {
    //             email,
    //             password,
    //             returnSecureToken: true
    //         });
    //         alert('Registro exitoso');
    //         console.log(response.data);
    //     } catch (error) {
    //         alert(error.response.data.error.message);
    //     }
    // };

    // const handleGoogleSignIn = async () => {
    //     const provider = new GoogleAuthProvider();
    //     try {
    //         const result = await signInWithPopup(auth, provider);
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         const user = result.user;
    //         alert('Inicio de sesión con Google exitoso');
    //         console.log({ token, user });
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

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
           
            {/* {isRegistering ? 'Registrarse' : 'Ingresar'} */}
            </Heading>
            <form onSubmit={isRegistering ? handleRegister : handleSignIn}>
                <FormControl id="email" mb={4}>
                    <FormLabel>Email:</FormLabel>
                    <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormControl>
                <FormControl id="password" mb={6}>
                    <FormLabel>Password:</FormLabel>
                    <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full">
                    {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                </Button> 
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
                    // onClick={handleGoogleSignIn}
                >
                    <Image 
                        src={googlrIcon} 
                        alt="Google Icon" 
                        w={5} h={5} mr={3}                        
                    />
                    Iniciar con Google
                </Button>
            </form>
            {/* <Box mt={4}>
                <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                </Button>
            </Box> */}
        </Flex>
    );
};


