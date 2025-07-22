import { Box } from "@chakra-ui/react";
import { AprobedPay } from "../components";
import './Styles/PostPayment.css';

export const PostPayment = () => {
    return (
        <Box
        paddingTop={16}
        marginTop={-16}
        backgroundColor={('gray.200', 'gray.700')}
        >
            <Box
            className="post-payment"
            overflow="auto"
            >
                <AprobedPay />
            </Box>
        </Box>
    )
}