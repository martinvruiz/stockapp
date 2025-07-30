"use client";

import { useState } from "react";
import useSales from "@/hooks/useSales";
import Modal from "./Modal";
import { es } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";

const getMonthlyProfitData = (sales) => {
  const data = {};

  sales.forEach((sale) => {
    if (!sale.date) return;
    const date = sale.date.toDate();

    const monthKey = formatInTimeZone(date, timeZone, "yyyy-MM");

    const profit = (sale.price - sale.cost) * sale.quantity;

    if (!data[monthKey]) {
      data[monthKey] = { profit: 0, sales: [], date };
    }

    data[monthKey].profit += profit;
    data[monthKey].sales.push(sale);
  });

  return data;
};

export default function MonthlyProfitsWithDetail() {
  const { sales, loading, error } = useSales();
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error al cargar ventas: {error}</p>;

  const data = getMonthlyProfitData(sales);
  const sortedMonths = Object.keys(data).sort().reverse();

  const selectedSales = selectedMonth ? data[selectedMonth].sales : [];

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        Ganancia por mes
      </h2>

      <ul className="space-y-3">
        {sortedMonths.map((monthKey) => {
          return (
            <li
              key={monthKey}
              className="bg-white shadow-sm border rounded p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 gap-2"
              onClick={() => setSelectedMonth(monthKey)}
            >
              <span className="text-gray-700 font-medium">
                {formatInTimeZone(data[monthKey].date, timeZone, "MMMM yyyy", {
                  locale: es,
                })}
              </span>
              <span className="text-green-700 font-semibold">
                ${data[monthKey].profit.toLocaleString("es-AR")}
              </span>
            </li>
          );
        })}
      </ul>

      <Modal isOpen={!!selectedMonth} onClose={() => setSelectedMonth(null)}>
        <h3 className="text-xl font-bold mb-4 text-red-700">
          Ventas de{" "}
          {new Date(`${selectedMonth}-01`).toLocaleDateString("es-AR", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
          {selectedSales.map((sale) => (
            <li
              key={sale.id}
              className="border-b pb-2 text-sm text-gray-800 last:border-0"
            >
              <p>
                <strong>{sale.productTitle}</strong> – {sale.quantity}u
              </p>
              <div className="flex gap-2">
                <p>Precio: ${sale.price.toLocaleString("es-AR")}</p>
                <p>Total: ${sale.total.toLocaleString("es-AR")}</p>
              </div>
              <div className="flex gap-2">
                <p>Costo: ${sale.cost.toLocaleString("es-AR")}</p>
                <p>
                  Costo total: $
                  {(sale.cost * sale.quantity).toLocaleString("es-AR")}
                </p>
                <p>
                  Ganancia: $
                  {((sale.price - sale.cost) * sale.quantity).toLocaleString(
                    "es-AR"
                  )}
                </p>
              </div>
              <p className="text-gray-500">
                {sale.date.toDate().toLocaleString("es-AR")}
              </p>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
