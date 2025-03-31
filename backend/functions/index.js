import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

const db = getFirestore();

export const actualizarStockDespuesDeOrden = onDocumentCreated(
  "orders/{orderId}",
  async (event) => {
    const orderData = event.data?.data();
    if (!orderData) return;

    const updates = orderData.items.map(async (item) => {
      const productRef = db.doc(`products/${item.productId}`);
      const fieldName = `sizesStock.sizes.${item.selectedSize}`;

      return db.runTransaction(db, async (transaction) => {
        const productDoc = await transaction.get(productRef);
        if (!productDoc.exists) {
          throw new Error(`El producto ${item.productId} no existe.`);
        }

        const productData = productDoc.data();
        const currentStock =
          productData.sizesStock?.sizes?.[item.selectedSize] || 0;

        if (currentStock < item.quantity) {
          throw new Error(
            `No hay suficiente stock para el producto ${item.productId}`
          );
        }

        transaction.update(productRef, {
          [fieldName]: FieldValue.increment(-item.quantity),
        });
      });
    });

    return Promise.all(updates);
  }
);
