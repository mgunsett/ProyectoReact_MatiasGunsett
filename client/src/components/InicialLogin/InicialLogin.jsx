import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useAuth } from "../../context/AuthContext";
import "./InicialLogin.css"

export const InicialLogin = () => {
    const { user, logout } = useAuth();

    return (
    <Flex
    className="InicialLogin"
    p={4} 
    justifyContent="center"
    flexDirection="column" 
    alignItems="center"
    maxWidth="700px" 
    mx="auto"
    mb={{ base: "2", md: "0"}}
    boxSize={{ base: "70%", sm: "md", md: 'lg'}}
    color={'black'}
    background={'rgb(255, 255, 255)'}
    >
        <Heading 
        fontWeight={{ base: "400", sm: "600", lg: "600" }}
        fontSize={{ base: "35px", sm: "30px", lg: "80px" }}
        fontFamily={'"Bebas Neue", system-ui'}
        color={'black'}
        >
        Bienvenido
        </Heading>
        <Text
        mb={2}
        fontWeight={600}
        fontSize={{ base: "20px", sm: "20px", lg: "30px" }}
        fontFamily={'"Bebas Neue", system-ui'}
        color={'black'}
        >{user.displayName || "Usuario"}</Text>
        <Button 
        bg="transparent"
        color="black"
        border="1px solid black"
        _hover={{ 
            bg: "rgba(244, 66, 66, 0.6)", 
            border: "none",
          }}
        onClick={logout}
        size={{ base: "xs", sm: "md", md: "lg" }} 
        >
            Cerrar sesión
        </Button>
    </Flex>
    );
}
