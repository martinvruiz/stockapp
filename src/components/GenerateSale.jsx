"use client";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/db/firestore.js";
import useSales from "@/hooks/useSales";

export default function GenerateSale() {
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const { addSale, loading, error } = useSales();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(firestore, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    await addSale({
      productId: data.productId,
      quantity: Number(data.quantity),
      price: Number(data.price),
    });

    reset();
  };

  const selectedProduct = products.find((p) => p.id === watch("productId"));

  useEffect(() => {
    if (selectedProduct) {
      const finalPrice = selectedProduct.price * selectedProduct.revenue;
      setValue("price", finalPrice);
    }
  }, [selectedProduct, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 my-2 rounded space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Generar venta</h2>

      <div>
        <label className="block mb-1">Producto</label>
        <select
          {...register("productId", { required: true })}
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
      </div>

      <div>
        <label className="block mb-1">Cantidad</label>
        <input
          type="number"
          step="1"
          min="1"
          max={selectedProduct?.stock || undefined}
          {...register("quantity", { required: true, min: 1 })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Precio</label>
        <input
          type="number"
          step="any"
          min="0.01"
          {...register("price", { required: true, min: 0.01 })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-400"
      >
        {loading ? "Registrando..." : "Registrar Venta"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
