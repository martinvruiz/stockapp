"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "@/db/firestore.js";
import Container from "@/components/Container";
import { toast } from "react-toastify";
import { ToastConfirm } from "@/components/ToastConfirm";
import useOrders from "@/hooks/useOrders";

export default function page() {
  const { addOrder } = useOrders();
  const [products, setProducts] = useState([]);
  const [restockList, setRestockList] = useState([]);
  const { register, reset, watch, setValue } = useForm();

  useEffect(() => {
    const productsRef = collection(firestore, "products");
    const q = query(productsRef, orderBy("title"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      console.log(productsData);
    });
    return () => unsubscribe();
  }, []);

  const selectedProduct = products.find((p) => p.id === watch("productId"));

  useEffect(() => {
    const cost = selectedProduct ? selectedProduct.price : 0;
    setValue("cost", cost);
  }, [selectedProduct, setValue]);

  const selectedProductId = watch("productId");
  const quantity = Number(watch("quantity"));
  const cost = Number(watch("cost"));

  const addToRestockList = () => {
    if (!selectedProductId || !quantity || quantity <= 0 || cost <= 0) return;

    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    setRestockList((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          { id: product.id, title: product.title, quantity, cost },
        ];
      }
    });

    reset({ productId: "", quantity: "" });
  };

  const onSubmit = async () => {
    if (restockList.length === 0) {
      alert("No products added to restock.");
      return;
    }

    ToastConfirm("Confirmar pedido?", async () => {
      try {
        await addOrder(restockList);
        toast.success("Stock actualizado", {
          closeButton: false,
          autoClose: 1500,
          hideProgressBar: true,
        });
        setRestockList([]);
      } catch (error) {
        alert("Error updating stock");
      }
    });
  };

  return (
    <Container>
      <div className="max-w-md min-w-xs mx-auto p-4 bg-red-700 rounded-md flex flex-col items-center">
        <h2 className="text-xl text-center font-semibold mb-4">
          Cargar pedido
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addToRestockList();
          }}
          className="space-y-4 mb-6"
        >
          <div>
            <label className="block mb-1 text-center">Product</label>
            <select
              {...register("productId", { required: true })}
              className="w-full border rounded px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled className="text-black">
                Seleccionar
              </option>
              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  className="text-black"
                >
                  {product.title} (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-center">Cantidad</label>
            <input
              type="number"
              min="1"
              {...register("quantity", { required: true, min: 1 })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-center">Costo</label>
            <input
              type="number"
              min="1"
              {...register("cost", { required: true, min: 1 })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded w-full hover:bg-gray-400"
          >
            Agregar al pedido
          </button>
        </form>

        <h3 className="text-lg font-semibold mb-2">Pedido</h3>
        {restockList.length === 0 && <p>No hay productos agregados</p>}

        <ul className="mb-4 w-full">
          {restockList.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b py-1 w-full"
            >
              <span>{item.title}</span>
              <span>Cant: {item.quantity}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSubmit}
          disabled={restockList.length === 0}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Confirmar pedido
        </button>
      </div>
    </Container>
  );
}
