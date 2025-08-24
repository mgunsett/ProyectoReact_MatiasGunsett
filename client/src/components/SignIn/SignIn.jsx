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
      p={{ base: 7, sm: 6}}
      pt={{ base: 4, sm: 3}}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      maxWidth="700px"
      mx="auto"
      boxSize={{ base: "80%", sm: "md", md: 'lg'}}
      color={"white"}
      background={"rgba(33, 33, 65, 0.621)"}
      borderRadius={8}
      backdropFilter={"blur(2px)"}
      boxShadow={"1px 2px 19px -8px rgba(0,0,0,0.75)"}
    >
      <Heading
        as="h1"
        mb={6}
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "20px", sm: "20px", lg: "30px" }}
        fontFamily={'"Lacquer", system-ui'}
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
            />
          </FormControl>
        )}
        <Button 
          type="submit" 
          colorScheme="teal" 
          width="full"
          size={{ base: "sm", sm: "md"}}
        >
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </Button>
        <Button
          size={{ base: "sm", sm: "md"}}
          type="button"
          variant="outline"
          width="full"
          mt={4}
          mb={4}
          bg="#000000"
          color="white"
          borderColor="#000000"
          _hover={{ bg: "#222222", borderColor: "#222222" }}
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
        >
          {isRegistering
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes una cuenta? Regístrate"}
        </Button>
      </Box>
    </Flex>
  );
};
