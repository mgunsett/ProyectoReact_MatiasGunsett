  import { ChakraProvider} from '@chakra-ui/react'
  // import MainLayout from './layout/MainLayout';
  import { MainRouter } from "./routes";
  import './App.css'
  import { CartProvider, AuthProvider } from './context';


  function App() {
    return (
      <ChakraProvider>
        <CartProvider>
          <AuthProvider>
            <MainRouter />
          </AuthProvider>
        </CartProvider>
      </ChakraProvider>
    );
  }
  export default App;

  //! ---------- Ejemplo de uso de una promesa -------------

  // function myPromise() {
  //   return new Promise((resolve, reject) => {
  //     const number = 5;
  //     if (number === 5) {
  //       resolve("El número es 5");
  //     } else {
  //       reject("El número no es 5");
  //     }
  //   });
  // }
  //? renderizaria esto: 
          // <Button
          //   onClick={() => {
          //     setState(state + 1);
          //   }}
          //   colorScheme={'teal'} variant={'outline'} margin={'3px'}
          // >
          //   Cambio de Estado 1
          // </Button>
          // <Button
          //   onClick={() => {
          //     setStateTwo(stateTwo + 1);
          //   }}
          //   colorScheme={'teal'} variant={'outline'} margin={'3px'}
          // >
          //   Cambio de Estado 2
          // </Button>


  //!--------------- useState() y useEffect() -----------
    // const [state, setState] = useState(0);
    // const [stateTwo, setStateTwo] = useState(0);

    //useEffect = hook que se ejecuta despues de que el componente se renderiza, sirve para controlar efectos secundarios en el ciclo de vida del componente.
    //Se va a ejecutar SIEMPRE aunque sea una vez (la primera vez que se renderiza el componente).

    //1 - useEffect Feo - useEffect sin control
    // useEffect(() => {
    //   console.log("Se renderizó el componente App - useEffect sin control");
    // });

    //2 - useEffect ideal - useEffect controlado -- useEffect con dependencias vacias (Es el mas comun)
    // useEffect(() => {
      // llamada a la api para traer todos mis productos
    //   console.log("Me rendericé por primera vez - useEffect dependencias vacias");
    // }, []);

    //3 - useEffect con dependencias - useEffect controlado
    // useEffect(() => {
    //   console.log("Me rendericé por primera vez - useEffect con dependencias");
    // }, [state]);


  //! -------- Codigo bloqueante -----------------
    // function ejecutarTareaBloqueante(){
    //   const start = Date.now();
    //   while(Date.now() - start < 3000){
    //--- Esperar 3 segundos
    //   }
    //   console.log("Tarea bloqueante terminada");
    // }

    // console.log("Inicio de tarea");
    // ejecutarTareaBloqueante();
    // console.log("Fin de tarea");

    //? --------- Codigo no bloqueante
    // function ejecutarTareaNoBloqueante(){
    //     setTimeout(() => {
    //       console.log("Tarea no bloqueante terminada");
    //     }, 3000);
    // }

    // console.log("Inicio de tarea");
    // ejecutarTareaNoBloqueante();
    // console.log(2 + 2);
    // console.log("Fin de tarea");
    // myPromise()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => {
    //     console.log("Promesa finalizada");
    //   });
  //!------------------------------------------------------------------------

  //! CONTADOR 👇 -----------------------------------------------------------
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
