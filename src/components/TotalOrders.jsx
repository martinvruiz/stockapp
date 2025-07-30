"use client";

import { useState } from "react";
import Modal from "./Modal";
import ViewOrder from "./ViewOrder";
import { ToastConfirm } from "./ToastConfirm";
import useOrders from "@/hooks/useOrders";

export default function TotalOrders() {
  const { orders, deleteOrder, loading, error } = useOrders();
  const [order, setOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading)
    return <p className="text-center py-6 text-red-700">Cargando pedidos...</p>;

  if (error)
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;

  if (orders.length === 0) {
    return (
      <p className="text-center py-6 text-red-700">
        No hay órdenes registradas aún.
      </p>
    );
  }

  const handleViewOrder = (order) => {
    setOrder(order);
    setModalOpen(true);
  };

  const handleDeleteOrder = async (id) => {
    ToastConfirm("¿Eliminar orden?", async () => {
      const success = await deleteOrder(id);
      if (success) {
        setOrder(null);
        setModalOpen(false);
        return true;
      } else {
        alert("Error al eliminar la orden");
        return false;
      }
    });
  };

  return (
    <div className="w-full min-h-full mx-auto p-4">
      <ul className="divide-y divide-gray-300 border rounded">
        {orders.map((order) => (
          <button
            key={order.id}
            className="flex flex-col text-start justify-between p-4 bg-white text-black w-full cursor-pointer"
            onClick={() => handleViewOrder(order)}
          >
            <div>
              <div className="text-black">
                {order.createdAt?.toDate().toLocaleString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <p className="font-semibold text-red-700">
                {order.items.length} producto(s)
              </p>
            </div>
          </button>
        ))}
      </ul>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ViewOrder order={order} onDelete={handleDeleteOrder} />
      </Modal>
    </div>
  );
}
