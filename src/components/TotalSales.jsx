"use client";

import useSales from "@/hooks/useSales";

export default function TotalSales() {
  const { sales, loading, error } = useSales();

  if (loading) return <p className="text-center py-6">Cargando ventas...</p>;
  if (error)
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;

  if (sales.length === 0) {
    return <p className="text-center py-6">No hay ventas registradas aún.</p>;
  }

  return (
    <div className="w-full min-h-full mx-auto p-4">
      <h2 className="text-2xl text-red-700 font-bold pb-4 text-center">
        Ventas totales
      </h2>
      <ul className="divide-y divide-gray-300 border rounded">
        {sales.map(({ id, quantity, total, date, productTitle, price }) => (
          <li
            key={id}
            className="flex justify-between items-center p-4 bg-white text-black"
          >
            <div>
              <p className="font-semibold text-red-700">{productTitle}</p>
              <p className="text-gray-600">Cantidad: {quantity}</p>
              <p className="text-gray-600">Precio: ${price.toFixed(2)}</p>
              <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
            </div>
            <div className="text-sm text-gray-400">
              {date ? date.toDate().toLocaleDateString() : "Sin fecha"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
