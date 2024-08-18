import {
  Heading,
  Container,
  Button,
} from '@chakra-ui/react'


const ItemsListContainer = ({title}) => {
    return (
      <Container maxW={'3xl'} textAlign={'center'} padding={'20'}>
        <Heading fontFamily={'Bowlby One, sans-serif'} size={'lg'} fontSize={'130px'}>{title}</Heading>
        <Button size='lg' colorScheme='blue' mt='24px'>
          Comenzar!
        </Button>
      </Container>
    )
};
export default ItemsListContainer;
