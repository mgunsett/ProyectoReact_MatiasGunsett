import { Flex } from "@chakra-ui/react";
import { AprobedPay } from "../components";


export const PostPayment = () => {
    return (
        <Flex
        paddingTop={40}
        marginTop={-16}
        backgroundColor={('gray.200', 'gray.700')}
        justifyContent={'center'}
        >
            <AprobedPay />
        </Flex>
    )
}