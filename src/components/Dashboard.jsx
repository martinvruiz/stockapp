"use client";

import React from "react";
import useSales from "@/hooks/useSales";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function groupSalesByDate(sales) {
  const grouped = {};

  sales.forEach(({ date, total }) => {
    if (!date) return;

    const d = date.toDate ? date.toDate() : new Date(date);
    const dateStr = d.toISOString().split("T")[0]; // yyyy-mm-dd

    if (!grouped[dateStr]) grouped[dateStr] = 0;
    grouped[dateStr] += total;
  });

  return Object.entries(grouped).map(([date, totalSales]) => ({
    date,
    totalSales,
  }));
}

export default function Dashboard() {
  const { sales, loading, error } = useSales();

  if (loading) return <p className="text-center py-6">Cargando...</p>;
  if (error)
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;

  const data = groupSalesByDate(sales);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Dashboard de Ventas
      </h1>
      {data.length === 0 ? (
        <p className="text-center">No hay ventas para mostrar.</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis
                dataKey="date"
                type="category"
                name="Fecha"
                interval={Math.ceil(data.length / 5)}
                tick={{ fill: "#fff", fontSize: 12 }}
                stroke="#fff"
              />
              <YAxis
                dataKey="totalSales"
                type="number"
                name="Ventas"
                tick={{ fill: "#fff", fontSize: 12 }}
                stroke="#fff"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  color: "#000",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#000" }}
              />
              <Scatter name="Ventas totales" data={data} fill="#fff" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
