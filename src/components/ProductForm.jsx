"use client";
import Container from "@/components/Container";
import useDB from "@/hooks/useDB";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addDocument, error, loading } = useDB();

  const onSubmit = async (data) => {
    const product = await addDocument(data);
    if (product) {
      console.log(product);
    } else {
      console.log(error);
    }

    reset();
  };

  return (
    <Container>
      <div className="flex flex-col items-center p-6 bg-red-700 rounded-md min-w-xs">
        <h2 className="text-2xl font-bold mb-4">Agregar producto</h2>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center">
              <input
                {...register("title", { required: "El título es requerido" })}
                placeholder="Título"
                className="w-full p-2 border rounded"
              />
              {errors.title && (
                <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <input
                {...register("price", {
                  required: "El precio es requerido",
                  valueAsNumber: true,
                })}
                placeholder="Precio"
                type="number"
                className="w-full p-2 border rounded"
              />
              {errors.price && (
                <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <input
                {...register("revenue", {
                  required: "El precio es requerido",
                  valueAsNumber: true,
                })}
                placeholder="Ganancia"
                type="number"
                step="any"
                className="w-full p-2 border rounded"
              />
              {errors.price && (
                <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <input
                {...register("stock", {
                  required: "El stock es requerido",
                  valueAsNumber: true,
                })}
                placeholder="Stock"
                type="number"
                className="w-full p-2 border rounded"
              />
              {errors.stock && (
                <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm text-center inline-block mt-2">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <input
                {...register("img", {
                  required: "La URL de la imagen es requerida",
                })}
                placeholder="URL de la imagen"
                className="w-full p-2 border rounded"
              />
              {errors.img && (
                <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm  text-center inline-block mt-2">
                  {errors.img.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black p-2 rounded hover:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Guardando" : "Guardar Producto"}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
