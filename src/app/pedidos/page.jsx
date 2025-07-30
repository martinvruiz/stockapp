import Container from "@/components/Container";
import TotalOrders from "@/components/TotalOrders";
import React from "react";

export default function page() {
  return (
    <Container>
      <div className="flex flex-col items-center bg-red-700 p-4 rounded-md min-w-xs md:min-w-md mx-auto">
        <h2>Pedidos</h2>
        <TotalOrders />
      </div>
    </Container>
  );
}
