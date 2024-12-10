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
import { auth } from '../../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    updateProfile
} from 'firebase/auth';
import googlrIcon from '../../assets/googlrIcon.svg';
import { InicialLogin } from '../InicialLogin';


export const SignIn = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado
    const [welcomeMessage, setWelcomeMessage] = useState(''); // Mensaje de bienvenida

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            setIsAuthenticated(true);
            setWelcomeMessage(`${userCredential.user.displayName}`);
        } catch (error) {
            alert('Usuario o contraseña incorrectos');   
            console.error(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            console.log(userCredential.user);
            setIsAuthenticated(true);
            setWelcomeMessage(`${userCredential.user.displayName}`);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log({ token, user });
            setIsAuthenticated(true);
            setWelcomeMessage(`${user.displayName}`);
        } catch (error) { 
            alert(error.message);
        }
    };
    if (isAuthenticated) {
        return <InicialLogin welcomeMessage={welcomeMessage} />;
    }

    return (
        <Flex 
        className='signInContainer'
        p={4} 
        justifyContent="center"
        flexDirection="column" 
        alignItems="center"
        maxWidth="700px" 
        mx="auto"
        boxSize={'lg'}
        color={'white'}
        background={'rgba(33, 33, 65, 0.621)'}
        borderRadius={8}
        backdropFilter={'blur(2px)'}
        boxShadow={'1px 2px 19px -8px rgba(0,0,0,0.75)'}
        >
            <Heading 
            as="h1" 
            mb={6}
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "10px", sm: "20px", lg: "30px" }}
            fontFamily={'"Lacquer", system-ui'}
            >
            {isRegistering ? 'Registrarse' : 'Ingresar'} 
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
                {isRegistering && (
                    <FormControl id="username" mb={4}>
                        <FormLabel>Username:</FormLabel>
                        <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required={isRegistering} />
                    </FormControl>
                )}
                <Button type="submit" colorScheme="teal" width="full">
                    {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                </Button> 
                <Button 
                    type="button" 
                    variant='outline' 
                    width="full"
                    mt={4} mb={4}   
                    bg= '#4285F4'
                    color='white' 
                    borderColor= '#4285F4'     
                    _hover={{ 
                        bg: '#357ae8', 
                        borderColor: '#357ae8'
                    }}
                    onClick={handleGoogleSignIn}
                >
                    <Image 
                        src={googlrIcon} 
                        alt="Google Icon" 
                        w={5} h={5} mr={3}                    
                    />
                    Iniciar con Google
                </Button>
            </form>
            <Box mt={4}>
                <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                </Button>
            </Box>
        </Flex>
    );
};


