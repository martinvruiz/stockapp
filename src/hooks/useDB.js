import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/db/firestore";

const useDB = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const productRef = collection(firestore, "products");

    const q = query(productRef, orderBy("title"));

    const fetchData = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      fetchData();
    };
  }, []);

  const addDocument = async (data) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "products"), data);
      setLoading(false);
      return docRef.id;
    } catch (error) {
      setError(error);
      setLoading(false);
      return null;
    }
  };

  const updateDocument = async (id, updatedData) => {
    setLoading(true);
    try {
      await updateDoc(doc(firestore, "products", id), updatedData);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "products", id));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return { data, error, loading, addDocument, updateDocument, deleteDocument };
};

export default useDB;
