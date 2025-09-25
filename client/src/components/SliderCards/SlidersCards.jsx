import {
    Heading,
    Box,
    Card,
    Stack,
    CardBody,
    CardFooter,
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
  const scrollAmount = 900;
  const animationRef = useRef(null);

  // Estados para drag/swipe
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Animación personalizada de scroll con duración controlable
  const animateScrollTo = (target, duration = 700) => {
    if (!containerRef.current) return;

    // Cancelar animación previa si existe
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const start = containerRef.current.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    // Easing: easeInOutQuad
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (now) => {
      // Detener si el usuario está arrastrando
      if (isDragging || !containerRef.current) return;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(t);
      containerRef.current.scrollLeft = start + change * eased;
      if (t < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

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
      animateScrollTo(scrollPosition, 900); // Ajusta 700ms a tu gusto (ej. 600-900)
    }
  }, [scrollPosition]);

  // Limpiar animación al desmontar
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Handlers de drag (mouse)
  const onMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
    // Cancelar animación si el usuario comienza a arrastrar
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
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
    // Cancelar animación si el usuario comienza a arrastrar con touch
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
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
          gap={2}
          padding={2}
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
          {products && products.filter(p => !(p.categories || []).includes('accesorios')).length > 0
            ? products
                .filter(p => !(p.categories || []).includes('accesorios'))
                .map((product) => (
            <Card 
            key={product.id}  
            minW={{ base: "160px", sm: "170px" , md: "210px", lg: "260px" }}
            height={{ base: "360px", sm: "380px" , md: "480px", lg: "500px" }}
            flex="0 0 auto"
            backgroundColor={'rgba(0, 0, 0, 0.87)'}
            >
              <CardBody
              p={{ base: "10px", sm: "1rem" , md: "1rem", lg: "1rem" }}
              >
                <Link to={`/item/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    borderRadius="md"
                    w={{ base: "160px", sm: "170px" , md: "210px", lg: "260px" }}
                    h={{ base: "220px", sm: "180px" , md: "250px", lg: "310px" }}
                    objectFit="cover"
                    maxW={"21rem"}
                    transition={"transform 0.3s ease"}
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Link>
                <Stack textAlign={"left"} mt={2} spacing={0}>
                <Link to={`/item/${product.id}`}>
                  <Heading 
                    fontSize={{ base: "18px", sm: "20px", md: "25px", lg: "33px" }} 
                    fontFamily={'"Bebas Neue", system-ui'}
                    fontWeight={400}
                    color={'white'}
                    width={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
                    _hover={{ color: "rgba(222, 230, 121, 0.8)" }}
                  >{product.title}</Heading>
                  </Link>
                  <Text maxW={"16rem"} color={'white'}>{product.description}</Text>
                </Stack>
              </CardBody>
              <CardFooter>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                >
                <Text
                  color="white"
                  fontSize={{ base: "25px", sm: "25px", md: "40px" }}
                  fontFamily={'"Bebas Neue", system-ui'}
                  fontWeight={400}
                > 
                  ${product.price}
                </Text>
                {product.prevprice ? (
                <Text
                  color={'red'}
                  fontSize={{ base: "20px", sm: "20px", lg: "35px" }}
                  fontFamily={'"Bebas Neue", system-ui'}
                  fontWeight={400}
                  textDecoration="line-through"
                  ml={4}
                >
                  ${product.prevprice}
                </Text>
                ) : ( null) }
                </Flex>
              </CardFooter>
            </Card>
          ))
            : (
            <Text color="white" textAlign="center" width="100%">
              No hay productos disponibles
            </Text>
          )}
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