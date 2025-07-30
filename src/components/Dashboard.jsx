"use client";
import useOrders from "@/hooks/useOrders";
import useSales from "@/hooks/useSales";
import React from "react";
import TotalProfit from "./TotalProfit";

export default function Dashboard() {
  const { orders, loading, error } = useOrders();
  const { getMostSoldProduct, sales } = useSales();

  const { topProduct, totalSold } = getMostSoldProduct(sales);

  return (
    <div className="bg-red-700 p-4 flex flex-col items-center min-w-xs md:min-w-md rounded-md">
      <h2 className="text-xl font-semibold">Estadisticas</h2>
      <p className="text-center mt-4">
        Modelo más vendido: <strong>{topProduct}</strong> ({totalSold}{" "}
        unidad/es)
      </p>
      <TotalProfit />
    </div>
  );
}
