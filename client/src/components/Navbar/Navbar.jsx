import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  useBreakpointValue,
  Icon,
  Stack,
  Divider
} from "@chakra-ui/react";
import { CartWidget } from "../../components";
import logoBeReal from "../../assets/logo-BeReal.png";
import { Link } from "react-router-dom";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useItemsCollection } from "../../hooks";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const { items } = useItemsCollection("categories");
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [navClass, setNavClass] = useState("navbar");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavClass("navbar scrolled");
      } else {
        setNavClass("navbar");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isMobile = useBreakpointValue({ base: true, sm: true, md: false });

  return (
    <Box className={navClass} px={4} position="sticky" top={0} zIndex={10}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box flex={1} display={isMobile ? ('flex') : ('none')} justifyContent= "flex-start">
          <Link to="/">
            <img width={"70px"} height={"70px"} src={logoBeReal} alt="Logo principal" />
          </Link>
        </Box>
        {isMobile ? (
          <Flex gap={4} alignItems={"center"}>
          <CartWidget />
          <IconButton
            icon={<HamburgerIcon />}
            colorScheme="whiteAlpha"
            onClick={onOpen}
            variant="outline"
          />
          </Flex>
        ) : (
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Box flex={1} display="flex" justifyContent= "flex-start">
              <Link to="/">
                <img width={"70px"} height={"70px"} src={logoBeReal} alt="Logo principal" />
              </Link>
            </Box>
            <Menu>
              <MenuButton className="menuButton" as={Link} color={"white"}>
                Productos <ChevronDownIcon />
              </MenuButton>
              <MenuList backgroundColor={"gray.700"} border={"1px solid white"}>
                {items.map((category) => (
                  <MenuItem key={category.slug} backgroundColor={"gray.700"}>
                    <Link to={`/category/${category.slug}`} className="menuButton2">
                      {category.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Link to="/contacto" className="menuButton">
              Contacto
            </Link>
          </Box>
        )}
  
        {!isMobile && (
          <Flex alignItems={"center"} gap={4}>
            {user && (
              <Flex alignItems={"center"} gap={1}>
                <Box color="white" mr={4}>
                  {user.displayName}
                </Box>
                <Icon boxSize={3} as={CloseIcon} onClick={logout} color={"white"} _hover={{ cursor: "pointer", color: "red.500" }} />
              </Flex>
            )}
            <CartWidget />
          </Flex>
        )}
      </Flex>

      {isMobile && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent 
            backgroundColor="rgba(74, 85, 104, 0.35)" 
            backdropFilter="blur(10px)"
            color="white"
            fontFamily={'"Lacquer", system-ui, sans-serif'}
          >
            <DrawerHeader
              fontFamily={'"Lacquer", system-ui, sans-serif'}
              color={"rgba(237, 237, 78, 0.737)"}
              fontSize={'25px'}
              m={0}
            >
                Menú 👇
            </DrawerHeader>
            <DrawerCloseButton color="white" />
            <DrawerBody textAlign={'left'}>
            <Accordion allowToggle ml={'-15px'} paddingBottom={'10px'}>
                <AccordionItem>
                  <AccordionButton color={'white'} mt={'10px'}>
                    <Box flex="1" textAlign="left">
                      Productos
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel backgroundColor="rgba(74, 85, 104, 0.35)">
                    {items.map((category) => (
                      <Stack key={category.slug} spacing={2}>
                        <Link
                          to={`/category/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </Stack>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton color={'white'} mt={'10px'}>
                  <Link to="/contacto">
                    Contacto
                  </Link>
                  </AccordionButton>
                </AccordionItem>
              </Accordion>
              {user && (
                <Flex 
                  alignItems={"center"} 
                  mt={3} 
                >
                  <Box color="white" mr={4}>
                    {user.displayName}
                  </Box>
                  <Icon boxSize={3} as={CloseIcon} onClick={logout} color={"white"} _hover={{ cursor: "pointer", color: "red.500" }} />
                </Flex>
              )}
            </DrawerBody>
            
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

// import {
//   Box,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Button,
//   Icon
// } from "@chakra-ui/react";
//   import {CartWidget} from '../../components';
//   import logoBeReal from '../../assets/logo-BeReal.png';
//   import { Link } from "react-router-dom";
//   import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
//   import { useItemsCollection } from "../../hooks";
//   import { useEffect, useState } from "react";
//   import { useAuth } from "../../context/AuthContext";
//   import './Navbar.css';

// export const Navbar = () => {
//     const { items } = useItemsCollection("categories");
//     const { user, logout } = useAuth();

//     const [navClass, setNavClass] = useState("navbar");

//   //Funcion para cambiar el color del navbar al hacer scroll
//     useEffect(() => {
//       const handleScroll = () => {
//         if (window.scrollY > 50) {
//           setNavClass("navbar scrolled");
//         } else {
//           setNavClass("navbar");
//         }
//       };
//       window.addEventListener("scroll", handleScroll);
//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);
// //------------------------------------------------------------//
//     return (
//     <>
//       <Box 
//        className={navClass}
//        px={4} 
//        position='sticky' 
//        top={0}  
//        zIndex={1}
//        >
//         <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//           <Box display={'flex'} alignItems={'center'} gap={4}>
//             <Link to='/'>
//             <img width={'70px'} height={'70px'} src={logoBeReal} alt="Logo principal" />
//             </Link>
//             <Menu>
//               <MenuButton className="menuButton"
//               as={Link} 
//               cursor="pointer"
//               color={'white'}
//               > Productos 
//                 <ChevronDownIcon/>
//               </MenuButton>
//               <MenuList 
//                 overflow={'visible'} 
//                 backgroundColor={('gray.200', 'gray.700')} 
//                 border={'1px solid white'}
//                 boxShadow={'lg'}
//                 transition={'all 0.3s'}
//               >
//                 {items.map((category) => (
//                   <MenuItem 
//                     key={category.slug} 
//                     backgroundColor={('gray.200', 'gray.700')}
//                   >
//                     <Link 
//                       to={`/category/${category.slug}`}
//                       className="menuButton2"
//                     >{category.name}
//                     </Link>
//                   </MenuItem>
//                 ))}
//               </MenuList>   
//             </Menu>
//             <Link to='/contacto' className="menuButton">
//               Contacto
//             </Link> 
//           </Box>
//           <Flex alignItems={'center'} justifyContent={'space-between'} gap={4}> 
//             {user && (
//               <Flex alignItems={'center'} justifyContent={'center'} gap={1}>
//                 <Box color="white" mr={4}>
//                   {user.displayName}
//                 </Box>  
//                 <Icon 
//                   boxSize={3}
//                   as={CloseIcon} 
//                   onClick={logout}
//                   color={'white'}
//                   _hover={{ 
//                     cursor: "pointer", 
//                     color: "red.500"
//                   }}
//                 />
//               </Flex>
//             )}
//               <CartWidget />
//           </Flex>
//         </Flex>
//       </Box>
//     </>
//     )
// };
