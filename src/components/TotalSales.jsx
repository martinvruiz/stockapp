"use client";

import useSales from "@/hooks/useSales";
import { useState } from "react";
import Modal from "./Modal";
import ViewSale from "./ViewSale";
import { ToastConfirm } from "./ToastConfirm";

export default function TotalSales() {
  const { sales: data, deleteSale, loading, error } = useSales();
  const [sale, setSale] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading)
    return <p className="text-center py-6 text-red-700">Cargando ventas...</p>;
  if (error)
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;

  if (data.length === 0) {
    return (
      <p className="text-center py-6 text-red-700">
        No hay ventas registradas aún.
      </p>
    );
  }

  const handleViewProduct = (product) => {
    setSale(product);
    setModalOpen(true);
  };

  const handleDeleteSale = async (id) => {
    ToastConfirm("¿Eliminar venta?", async () => {
      const success = await deleteSale(id);
      if (success) {
        setSale(null);
        setModalOpen(false);
        return true;
      } else {
        alert("Error al eliminar la venta");
        return false;
      }
    });
  };

  return (
    <div className="w-full min-h-full mx-auto p-4 bg-red-700 rounded-md">
      <h2 className="text-2xl text-white font-bold pb-4 text-center">
        Ventas totales
      </h2>
      <ul className="divide-y divide-gray-300 border rounded">
        {data.map((sale) => (
          <button
            key={sale.id}
            className="flex text-start justify-between items-center p-4 bg-white text-black w-full cursor-pointer"
            onClick={() => handleViewProduct(sale)}
          >
            <div>
              <p className="font-semibold text-red-700">{sale.productTitle}</p>
              <p className="text-gray-600">Cantidad: {sale.quantity}</p>
              <p className="text-gray-600">Precio: ${sale.price.toFixed(2)}</p>
              <p className="text-gray-600">Total: ${sale.total.toFixed(2)}</p>
            </div>
            <div className="text-sm text-gray-400">
              {sale.date
                ? sale.date.toDate().toLocaleDateString()
                : "Sin fecha"}
            </div>
          </button>
        ))}
      </ul>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ViewSale sale={sale} onDelete={handleDeleteSale} />
      </Modal>
    </div>
  );
}
