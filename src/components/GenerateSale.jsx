"use client";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "@/db/firestore.js";
import useSales from "@/hooks/useSales";
import { ToastConfirm } from "./ToastConfirm";

export default function GenerateSale() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { addSale, loading, error } = useSales();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collection(firestore, "products");
    const q = query(productsRef, orderBy("title"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data) => {
    ToastConfirm("¿Generar venta?", async () => {
      await addSale({
        productId: data.productId,
        quantity: Number(data.quantity),
        price: Number(data.price),
        cost: Number(data.cost),
      });
      reset();
    });
  };

  const selectedProduct = products.find((p) => p.id === watch("productId"));

  useEffect(() => {
    if (selectedProduct) {
      const finalPrice = selectedProduct.price * selectedProduct.revenue;
      setValue("price", finalPrice);

      const cost = selectedProduct.price;
      setValue("cost", cost);
    }
  }, [selectedProduct, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 my-2 rounded-md space-y-4 bg-red-700"
    >
      <h2 className="text-xl font-semibold text-center">Generar venta</h2>

      <div className="flex flex-col items-center">
        <label className="block mb-1">Producto</label>
        <select
          {...register("productId", { required: "Selecciona un producto" })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="" className="text-black">
            Seleccionar producto
          </option>
          {products.map((product) => (
            <option className="text-black" key={product.id} value={product.id}>
              {product.title} (Stock: {product.stock})
            </option>
          ))}
        </select>
        {errors.productId && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
            {errors.productId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <label className="block mb-1">Cantidad</label>
        <input
          type="number"
          step="1"
          min="1"
          max={selectedProduct?.stock || undefined}
          {...register("quantity", {
            required: "Ingrese una cantidad valida",
            min: 1,
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.quantity && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <label className="block mb-1">Costo</label>
        <input
          type="number"
          step="any"
          min="0.01"
          {...register("cost", {
            required: "Ingrese un monto valido",
            min: 0.01,
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <label className="block mb-1">Precio Final</label>
        <input
          type="number"
          step="any"
          min="0.01"
          {...register("price", {
            required: "Ingrese un monto valido",
            min: 0.01,
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
            {errors.price.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-400"
      >
        {loading ? "Registrando..." : "Registrar Venta"}
      </button>

      {error && (
        <p className="text-red-700 p-2 rounded-md bg-red-200 text-center">
          {error}
        </p>
      )}
    </form>
  );
}
