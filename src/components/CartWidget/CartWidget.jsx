import { Flex, Text } from "@chakra-ui/react"; 
import { CgShoppingCart } from "react-icons/cg";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const CartWidget = () => {

    const { cartState } = useContext(CartContext);

    const qtyTotalItems = cartState.reduce((acc, item) => acc + item.qtyItem, 0);

    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <CgShoppingCart size={'25px'} />
            <Text padding={'5px'}>{qtyTotalItems}</Text>
        </Flex>
    )
};