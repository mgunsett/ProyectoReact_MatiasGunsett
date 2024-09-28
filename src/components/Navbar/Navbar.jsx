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


export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const { items } = useItemsCollection("categories");

    return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='sticky' top={0}  zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link to='/'>
            <img width={'70px'} height={'70px'} src={logoBeReal} alt="Logo principal" />
            </Link>
          </Box>
          <Box>
            <Menu>
              {/* <Link to= {'/events'} style={{marginRight: 30}}>Eventos</Link> */}
              <MenuButton as={Link} cursor="pointer">
                Productos    
              </MenuButton>
              <MenuList height={"300px"} overflowY={"scroll"}>
                {items.map((category) => (
                  <MenuItem key={category.slug}>
                    <Link to={`/category/${category.slug}`}>{category.name}</Link>
                  </MenuItem>
                ))}
              </MenuList>
          </Menu>
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
