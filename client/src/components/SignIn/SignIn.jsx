import "./SignIn.css";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Image,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import googlrIcon from "../../assets/googlrIcon.svg";
import { InicialLogin } from "../InicialLogin";

export const SignIn = () => {
  const { user, login, register, loginWithGoogle } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegistering) {
        await register(email, password, username);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return <InicialLogin />;
  }

  return (
    <Flex
      className="sign-in"
      p={{ base: 7, sm: 2}}
      pt={{ base: 4, sm: 2}}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      maxWidth="700px"
      mx="auto"
      mb={6}
      boxSize={{ base: "80%", sm: "md", md: 'xl'}}
      color={"black"}
      background={"rgba(255, 255, 255, 0.9)"}     
    >
      <Heading
        as="h1"
        mb={6}
        lineHeight={1.2}
        fontWeight={400}
        fontSize={{ base: "30px", sm: "40px", lg: "50px" }}
        fontFamily={'"Bebas Neue", system-ui'}
      >
        {isRegistering ? "Registrarse" : "Ingresar"}
      </Heading>
      {error && <Box color="red.500" mb={4}>{error}</Box>}
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel fontSize={{ base: "12px", sm: "20px"}}>Email:</FormLabel>
          <Input
            size={{ base: "xs", sm: "md"}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            focusBorderColor="black"
            placeholder="Ingrese su email"
            _placeholder={{ color: "gray.500" }}
            
          />
        </FormControl>
        <FormControl id="password" mb={6}>
          <FormLabel fontSize={{ base: "12px", sm: "20px"}}>Password:</FormLabel>
          <Input
            size={{ base: "xs", sm: "md"}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingrese su contraseña"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        {isRegistering && (
          <FormControl id="username" mb={4}>
            <FormLabel fontSize={{ base: "12px", sm: "20px"}}>Username:</FormLabel>
            <Input
              size={{ base: "xs", sm: "md"}}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nombre de usuario"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
        )}
        <Button 
          type="submit" 
          bg="transparent"
          color="white"
          background="rgba(0, 0, 0, 0.95)"
          _hover={{ 
              bg: "rgba(247, 240, 141, 0.88)", 
              color: "black",
            }}
          width="full"
          size={{ base: "sm", sm: "md"}}
        >
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </Button>
        <Button
          size={{ base: "sm", sm: "md"}}
          type="button"
          width="full"
          mt={4}
          mb={4}
          bg="transparent"
          color="black"
          border="1px solid black"
          _hover={{ 
              bg: "rgba(66, 133, 244, 0.6)", 
              border: "none",
            }}
          onClick={loginWithGoogle}
        >
          <Image 
            size={{base:'sm', sm:'md'}}
            src={googlrIcon} 
            alt="Google Icon" 
            w={5} 
            h={5} 
            mr={3} 
          />
          Iniciar con Google
        </Button>
      </form>
      <Box mt={4}>
        <Button 
          fontSize={{ base: "12px", sm: "20px"}}
          variant="link" 
          onClick={() => setIsRegistering(!isRegistering)}
          color="black"
        >
          {isRegistering
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes una cuenta? Regístrate"}
        </Button>
      </Box>
    </Flex>
  );
};
