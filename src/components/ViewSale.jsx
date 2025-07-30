import React from "react";

export default function ViewSale({ sale, onDelete }) {
  if (!sale) return null;

  return (
    <div className="bg-white rounded p-4 w-full max-w-md mx-auto mb-4">
      <h2 className="text-lg font-semibold text-red-700 mb-2">
        Detalle de Venta
      </h2>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Producto:</span> {sale.productTitle}
        </p>
        <p>
          <span className="font-medium">Cantidad:</span> {sale.quantity}
        </p>
        <p>
          <span className="font-medium">Nota:</span> {sale.note || "N/A"}
        </p>
        <p>
          <span className="font-medium">Costo:</span> ${sale.cost}
        </p>
        <p>
          <span className="font-medium">Costo Total:</span> $
          {sale.cost * sale.quantity}
        </p>
        <p>
          <span className="font-medium">Precio unitario:</span> ${sale.price}
        </p>
        <p>
          <span className="font-medium">Total:</span> ${sale.total}
        </p>
        <p>
          <span className="font-medium">Ganancia:</span> $
          {(sale.total - sale.cost * sale.quantity).toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Fecha:</span>{" "}
          {sale.date.toDate().toLocaleDateString()}
        </p>
        <button
          className="w-full bg-red-700 mt-4 p-4 rounded-md hover:bg-red-600"
          onClick={async (e) => {
            e.stopPropagation();
            await onDelete(sale.id);
          }}
        >
          <span className="text-white w-full">Borrar venta</span>
        </button>
      </div>
    </div>
  );
}
