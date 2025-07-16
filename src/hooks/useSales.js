import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/db/firestore.js";

export default function useSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const salesCollection = collection(firestore, "sales");

    const unsubscribe = onSnapshot(
      salesCollection,
      (snapshot) => {
        const salesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSales(salesList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addSale = async ({ productId, quantity, price }) => {
    setLoading(true);
    setError(null);

    try {
      const productRef = doc(firestore, "products", productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error("Producto no encontrado");
      }

      const productData = productSnap.data();

      if (productData.stock < quantity) {
        setError("Stock insuficiente");
        return;
      }

      await addDoc(collection(firestore, "sales"), {
        productId,
        productTitle: productData.title,
        quantity,
        price,
        total: quantity * price,
        date: new Date(),
      });

      await updateDoc(productRef, {
        stock: productData.stock - quantity,
      });
    } catch (err) {
      console.error("Error al registrar la venta:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addSale, loading, error, sales, setError };
}
