// const { onDocumentCreated } = require("firebase-functions/v1/firestore");
// const { getApps, initializeApp, getFirestore } = require("firebase-admin/app");
// const { FieldValue } = require("firebase-admin/firestore");

// // Inicializar Firebase Admin si aún no está inicializado
// if (!getApps().length) {
//   initializeApp();
// }

// const db = getFirestore();

// exports.actualizarStockDespuesDeOrden = onDocumentCreated(
//   "orders/{orderId}",
//   async (event) => {
//     try {
//       const orderData = event.data?.data();
//       if (!orderData) {
//         console.error("No se encontraron datos de la orden.");
//         return;
//       }
//       console.log(" Procesando orden:", orderData);

//       const updates = orderData.items.map(async (item) => {
//         const productRef = db.doc(`products/${item.productId}`);
//         const fieldName = `sizesStock.sizes.${item.selectedSize}`;

//         return db.runTransaction(async (transaction) => {
//           const productDoc = await transaction.get(productRef);

//           if (!productDoc.exists) {
//             throw new Error(`El producto ${item.productId} no existe.`);
//           }

//           const productData = productDoc.data();
//           const currentStock = productData.sizesStock?.sizes?.[item.selectedSize] || 0;

//           if (currentStock < item.quantity) {
//             throw new Error(
//               `No hay suficiente stock para el producto ${item.productId}`
//             );
//           }

//           console.log(
//             ` Actualizando stock de ${item.productId} (${item.selectedSize}): ${currentStock} -> ${currentStock - item.quantity}`
//           );

//           transaction.update(productRef, {
//             [fieldName]: transaction.increment(-item.quantity),
//           });
//         });
//       });

//       await Promise.all(updates);
//       console.log(" Stock actualizado exitosamente");
//     } catch (error) {
//       console.error(" Error al actualizar stock:", error);
//       throw error;
//     }
//   }
// );
