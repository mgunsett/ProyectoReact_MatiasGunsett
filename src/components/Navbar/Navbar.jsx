import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import {CartWidget} from '../../components';
  import logoBeReal from '../../assets/logo-BeReal.png';
  import { Link } from "react-router-dom";
  import { useItemsCollection } from "../../hooks";
  import './Navbar.css';

export const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const { items } = useItemsCollection("categories");

    return (
    <>
      <Box 
       className="navbar"
       bg={useColorModeValue('gray.100', 'gray.900')} 
       px={4} 
       position='sticky' 
       top={0}  
       zIndex={1}
       opacity={0.9}
       >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'} gap={4}>
            <Link to='/'>
            <img width={'70px'} height={'70px'} src={logoBeReal} alt="Logo principal" />
            </Link>
            <Menu>
              <MenuButton className="menuButton"
              as={Link} 
              cursor="pointer"
              > Productos 
              </MenuButton>
              <MenuList overflow={'visible'}>
                {items.map((category) => (
                  <MenuItem key={category.slug}>
                    <Link to={`/category/${category.slug}`}>{category.name}</Link>
                  </MenuItem>
                ))}
              </MenuList>   
          </Menu>
          <Link to='/contacto' className="menuButton">
            Contacto
          </Link> 
          {/* <Button onClick={() => createProductsFirestore("products")}>
            Crear productos
          </Button> */}
          </Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}> 
            <Stack direction={'row'} spacing={7}>
              <CartWidget /> 
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
    )
};
