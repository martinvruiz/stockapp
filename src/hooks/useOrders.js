import { useEffect, useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  writeBatch,
  Timestamp,
  increment,
} from "firebase/firestore";
import { firestore } from "@/db/firestore.js";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ordersCollection = collection(firestore, "orders");

    const unsubscribe = onSnapshot(
      ordersCollection,
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addOrder = async (restockList) => {
    setLoading(true);
    setError(null);

    try {
      for (const item of restockList) {
        const productRef = doc(firestore, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          throw new Error(`Producto no encontrado: ${item.title || item.id}`);
        }
      }

      const batch = writeBatch(firestore);

      const orderRef = doc(collection(firestore, "orders"));
      batch.set(orderRef, {
        createdAt: Timestamp.now(),
        items: restockList.map(({ id, title, quantity, cost }) => ({
          productId: id,
          productTitle: title,
          quantity,
          cost,
        })),
      });

      restockList.forEach(({ id, quantity, cost }) => {
        const productRef = doc(firestore, "products", id);
        batch.update(productRef, {
          stock: increment(quantity),
          price: cost,
        });
      });

      await batch.commit();
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error al registrar la orden:", err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const deleteOrder = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      await deleteDoc(doc(firestore, "restockOrders", id));
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  return { addOrder, deleteOrder, loading, error, orders, setError };
}
