// Cargar la lista de productos
export const products = [
  {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    imageUrl:
      "https://i.pinimg.com/564x/fa/bf/b0/fabfb075bfd6cbcca5b57bf8c7f939bd.jpg",
    createdAt: "timestamp",
    category: "bermudas",
  },
  {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 100,
    imageUrl: "../assets/Bermudas/bermuda2.jpg",
    reatedAt: "timestamp",
    category: "bermudas",
  },
  {
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 100,
    imageUrl: "../assets/Bermudas/bermuda3.jpg",
    reatedAt: "timestamp",
    category: "bermudas",
  },
  {
    title: "Producto 4",
    description: "Descripción del producto 4",
    price: 100,
    imageUrl: "../assets/Bermudas/bermuda4.jpg",
    reatedAt: "timestamp",
    category: "bermudas",
  },
  {
    title: "Producto 5",
    description: "Descripción del producto 5",
    price: 100,
    imageUrl: "../assets/Bermudas/bermuda5.jpg",
    reatedAt: "timestamp",
    category: "bermudas",
  },
];

// Guardar la lista de productos en localStorage
localStorage.setItem("products", JSON.stringify(products));

return products;
