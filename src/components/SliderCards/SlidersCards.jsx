import {
    Heading,
    Box,
    Card,
    Stack,
    CardBody,
    Divider,
    CardFooter,
    ButtonGroup,
    Image,
    Text,
    Flex,
    IconButton,
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import './SliderCards.css';

export const SlidersCards = ({ products }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 300;

  // Función para desplazar a la izquierda
  const scrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - scrollAmount);   
  };

  // Función para desplazar a la derecha
  const scrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition + scrollAmount);
  };

  useEffect(() => {
    const container = document.querySelector('.cardsContainer');
    if (container) {
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  return (
    <Box position="relative" display="flex" alignItems="center">
        <IconButton
          aria-label="Scroll Left"
          icon={<ChevronLeftIcon />}
          onClick={scrollLeft}
          position="absolute"
          left="0"
          zIndex="1"
          fontSize="2xl"
          backgroundColor="rgba(0,0,0,0.3)"
          _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />

        <Flex
          className="cardsContainer"
          overflowX="hidden" // Oculta el overflow
          gap="1rem"
          padding="1rem"
          maxW="100%"
        >
          {products.map((product) => (
            <Card 
            className='sliders-fotos'
            key={product.id} 
            maxW="md" 
            minW="250px" 
            flex="0 0 auto">
              <CardBody>
                <Link to={`/item/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    borderRadius="md"
                    boxSize="250px"
                    objectFit="cover"
                    maxW={"20rem"}
                  />
                </Link>
                <Stack textAlign={"left"} mt="6" spacing="2">
                  <Heading size="sm">{product.title}</Heading>
                  <Text maxW={"16rem"}>{product.description}</Text>
                  <Text
                    color="blue.500"
                    fontSize="2xl"
                    fontFamily={"fantasy"}
                    fontWeight={"100"}
                  >
                    ${product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="3" _hover={{
                    backgroundColor: "rgba(237, 237, 78, 0.737)",
                    transform: "scale(1.1)",
                    borderRadius: "2px",
                    height: "25px",
                    width: "110px",
                    color: "black",
                    paddingLeft: "10px",
                  }}>
                  <Link to={`/item/${product.id}`}>Ir a Detalle</Link>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Flex>
        <IconButton
          aria-label="Scroll Right"
          icon={<ChevronRightIcon />}
          onClick={scrollRight}
          position="absolute"
          right="0"
          zIndex="1"
          fontSize="2xl"
          backgroundColor="rgba(0,0,0,0.3)"
          _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />
      </Box>
  );
}