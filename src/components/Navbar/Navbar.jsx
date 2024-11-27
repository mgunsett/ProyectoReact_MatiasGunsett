import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
  import {CartWidget} from '../../components';
  import logoBeReal from '../../assets/logo-BeReal.png';
  import { Link } from "react-router-dom";
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import { useItemsCollection } from "../../hooks";
  import { useEffect, useState } from "react";
  import './Navbar.css';

export const Navbar = () => {
    const { items } = useItemsCollection("categories");

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

    return (
    <>
      <Box 
       className={navClass}
       px={4} 
       position='sticky' 
       top={0}  
       zIndex={1}
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
              color={'white'}
              > Productos 
                <ChevronDownIcon/>
              </MenuButton>
              <MenuList 
                overflow={'visible'} 
                backgroundColor={('gray.200', 'gray.700')} 
                border={'1px solid white'}
                boxShadow={'lg'}
                transition={'all 0.3s'}
              >
                {items.map((category) => (
                  <MenuItem 
                    key={category.slug} 
                    backgroundColor={('gray.200', 'gray.700')}
                  >
                    <Link 
                      to={`/category/${category.slug}`}
                      className="menuButton2"
                    >{category.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>   
            </Menu>
            <Link to='/contacto' className="menuButton">
              Contacto
            </Link> 
          </Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}> 
              <CartWidget />
          </Flex>
        </Flex>
      </Box>
    </>
    )
};
