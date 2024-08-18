import { ChakraProvider, Box } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar';
import ItemsListContainer from './components/ItemsListContainer/ItemsListContainer.jsx'

function App() {

  return (
    <ChakraProvider>
      <Navbar />
      <Box>
        <ItemsListContainer title={'Be Real'} />
      </Box>
    </ChakraProvider>
  );
}

export default App;






//! CONTADOR 👇
// import { useState } from "react";
// const [count, setCount] = useState(0);
//count: es el valor de mi estado
//?setCount: es la función que me permite actualizar el valor de mi estado
//?const handleRemoveItem = () => {
//   setCount (count - 1) // count++ tmabien es valido! (pero tengo que si o si asignar un valor a 'useState()')
// };

// const handleAddItem = () => {
//   setCount (count + 1)
// };
// <Flex>
// <Button onClick={handleRemoveItem}>-</Button>
// <Text>
//   {count}
// </Text>
// <Button onClick={handleAddItem}>+</Button>
// </Flex>

//?Estados: un valor que le podemos brindar a mi componente
//?Hooks: funciones ya definidas por React que nos permiten realizar ciertas acciones en nuestros componentes. Por ejemplo crear un estado.
//?useState: Hook que nos permite crear un estado en un componente funcional
//!------------------------------------------------------------























// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
