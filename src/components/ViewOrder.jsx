import React from "react";

export default function ViewOrder({ order, onDelete }) {
  if (!order) return null;

  return (
    <div className="bg-white rounded p-4 w-full max-w-md mx-auto mb-4">
      <h2 className="text-lg font-semibold text-red-700 mb-2">
        Detalle de pedido
      </h2>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Fecha:</span>{" "}
          {order.createdAt.toDate().toLocaleDateString()}
        </p>
        {order.items.map((item, i) => (
          <div key={i} className="text-sm text-gray-700 ml-2">
            • {item.productTitle} - {item.quantity}u - ${item.cost}
          </div>
        ))}
        <button
          className="w-full bg-red-700 mt-4 p-4 rounded-md hover:bg-red-600"
          onClick={async (e) => {
            e.stopPropagation();
          }}
        >
          <span className="text-white w-full">Borrar pedido</span>
        </button>
      </div>
    </div>
  );
}
