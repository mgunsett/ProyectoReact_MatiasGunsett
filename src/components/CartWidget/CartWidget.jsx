import { Flex, Text } from "@chakra-ui/react"; 
import { CgShoppingCart } from "react-icons/cg";


const CartWidget = () => {
    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <CgShoppingCart size={'25px'} />
            <Text padding={'5px'}>0</Text>
        </Flex>
    )
};
export default CartWidget;