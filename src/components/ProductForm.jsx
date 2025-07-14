"use client";
import Container from "@/components/Container";
import useDB from "@/hooks/useDB";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addDocument, error } = useDB();

  const onSubmit = async (data) => {
    const product = await addDocument(data);
    if (product) {
      console.log(product);
    } else {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">Agregar producto</h2>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("title", { required: "El título es requerido" })}
                placeholder="Título"
                className="w-full p-2 border rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
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
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
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
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
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
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("img", {
                  required: "La URL de la imagen es requerida",
                })}
                placeholder="URL de la imagen"
                className="w-full p-2 border rounded"
              />
              {errors.img && (
                <p className="text-red-500 text-sm">{errors.img.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black p-2 rounded hover:bg-gray-400"
            >
              Guardar Producto
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
