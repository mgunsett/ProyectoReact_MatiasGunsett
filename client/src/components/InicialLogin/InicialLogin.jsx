import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useAuth } from "../../context/AuthContext";

export const InicialLogin = () => {
    const { user, logout } = useAuth();

    return (
    <Flex
    p={4} 
    justifyContent="center"
    flexDirection="column" 
    alignItems="center"
    maxWidth="700px" 
    mx="auto"
    boxSize={{ base: "70%", sm: "md", md: 'lg'}}
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
        fontSize={{ base: "15px", sm: "30px", lg: "40px" }}
        fontFamily={'"Lacquer", system-ui'}
        >Bienvenido</Heading>
        <Text
        mb={6}
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "18px", sm: "20px", lg: "30px" }}
        fontFamily={'"Lacquer", system-ui'}
        >{user.displayName || "Usuario"}!</Text>
        <Button 
        colorScheme="teal" 
        onClick={logout}
        size={{ base: "xs", sm: "md", md: "lg" }} 
        >
            Cerrar sesión
        </Button>
    </Flex>
    );
}
