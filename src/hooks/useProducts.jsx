import { useEffect, useState } from "react";
import { getAllProducts } from "../service/products.service";

export const useProducts = () => {

    //Generamos el estado donde vamos almacenar los Productos ----
    const [productsData, setProductsData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
            .then((res) =>{
            // y aca actualiamos el estado con la info de la API ------
            setProductsData(res.data.products)
        }) 
        .catch((err) =>{
            console.log(err)  
        })
        .finally(() => {
            // Cuando finalice mi promesa y se reenderice, deje de mostrar el spinner -----
            setLoading(false)
        })
    }, []);

    return { productsData, loading };
};