import { Flex, Text } from "@chakra-ui/react"; 
import { CgShoppingCart } from "react-icons/cg";
import { CartContext } from "../../context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const CartWidget = () => {

    const { cartState } = useContext(CartContext);

    const qtyTotalItems = cartState.reduce((acc, item) => acc + item.qtyItem, 0);
    // .reduce permite sumar todos los elementos del array, recibe dos argumentos (acc, item) //

    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <CgShoppingCart 
            size={'25px'} 
            color={'black'}
            />
            <Link to='/checkout'>
            <Text 
            padding={'5px'}
            color={'black'}
            >{qtyTotalItems}</Text>
            </Link>
        </Flex>
    )
};