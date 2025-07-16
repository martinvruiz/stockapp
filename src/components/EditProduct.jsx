"use client";

import { useForm } from "react-hook-form";

export default function EditProduct({ product, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: product.title,
      stock: product.stock,
      price: product.price,
      revenue: product.revenue,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-6 rounded"
    >
      <h2 className="text-xl font-semibold text-center">Editar Producto</h2>

      <div>
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          {...register("title", { required: "Campo obligatorio" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Stock</label>
        <input
          type="number"
          {...register("stock", { required: true, min: 0 })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Costo</label>
        <input
          type="number"
          step="any"
          {...register("price", { required: true, min: 0 })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Ganancia</label>
        <input
          type="number"
          step="any"
          {...register("revenue", { required: true, min: 0 })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-500"
      >
        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
      </button>
    </form>
  );
}
