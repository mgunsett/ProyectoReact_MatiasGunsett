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
import { useState, useEffect , useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import './SliderCards.css';

export const SlidersCards = ({ products }) => {

  const containerRef = useRef(null); 
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 600;

  // Estados para drag/swipe
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Función para desplazar a la izquierda
  const scrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - scrollAmount);   
  };

  // Función para desplazar a la derecha
  const scrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition + scrollAmount);
  };

  useEffect(() => {
    if (containerRef.current) {  // Acceder al contenedor de forma directa
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  // Handlers de drag (mouse)
  const onMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startXRef.current; // distancia arrastrada
    if (Math.abs(walk) > 3) hasDraggedRef.current = true; // umbral pequeño
    containerRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  const endMouseDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // No hacemos nada más; hasDraggedRef se usa para bloquear clics si hubo arrastre
  };

  // Handlers de touch (mobile)
  const onTouchStart = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    const touch = e.touches[0];
    startXRef.current = touch.pageX - containerRef.current.offsetLeft;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const touch = e.touches[0];
    const x = touch.pageX - containerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 3) hasDraggedRef.current = true;
    containerRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Bloquear clics cuando se arrastró para evitar navegaciones accidentales
  const onClickCapture = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      // Reset para permitir próximos clics
      hasDraggedRef.current = false;
    }
  };

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
          color={'white'}
          backgroundColor="rgba(0,0,0,0.3)"
          _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />

        <Flex
          ref={containerRef}
          className="cardsContainer"
          overflowX="hidden" // Oculta el overflow
          gap="1rem"
          padding="1rem"
          maxW="100%"
          minW="100%"
          cursor={isDragging ? 'grabbing' : 'grab'}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endMouseDrag}
          onMouseLeave={endMouseDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClickCapture={onClickCapture}
        >
          {products.map((product) => (
            <Card 
            key={product.id}  
            minW={{ base: "140", sm: "160" , md: "210", lg: "260" }}
            height={{ base: "360", sm: "380px" , md: "430", lg: "480" }}
            flex="0 0 auto"
            backgroundColor={'rgba(0, 0, 0, 0.87)'}>
              <CardBody>
                <Link to={`/item/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    borderRadius="md"
                    boxSize={{ base: "130px", sm: "150px", md: "200px", lg: "250px" }}
                    objectFit="cover"
                    maxW={"20rem"}
                    transition={"transform 0.3s ease"}
                    _hover={{ transform: "scale(1.1)" }}
                  />
                </Link>
                <Stack textAlign={"left"} mt="6" spacing="2">
                  <Heading 
                    size="sm"  
                    color={'white'}
                    width={{ base: "130px", sm: "150px", md: "200px", lg: "250px" }}
                  >{product.title}</Heading>
                  <Text maxW={"16rem"} color={'white'}>{product.description}</Text>
                  <Text
                    color="white"
                    fontSize={{ base: "25px", sm: "22px", md: "26px", lg: "33px" }}
                    fontFamily={'"Bebas Neue", system-ui'}
                    fontWeight={"400"}
                  >
                    ${product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider color={'white'}/>
              <CardFooter>
                <ButtonGroup spacing="3" color={'white'} _hover={{
                    backgroundColor: "rgba(237, 237, 78, 0.737)",
                    transform: "scale(1.1)",
                    borderRadius: "2px",
                    height: "25px",
                    width: "110px",
                    color: "black",
                    paddingLeft: "10px",
                  }}>
                  <Link to={`/item/${product.id}`}>+ Ir a Detalle</Link>
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
          color={'white'}
          backgroundColor="rgba(0,0,0,0.3)"
          _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />
      </Box>
  );
}