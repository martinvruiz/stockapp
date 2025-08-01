"use client";

import Container from "@/components/Container";
import React, { useState } from "react";
import ProductList from "@/components/ProductList";
import useDB from "@/hooks/useDB";
import ProductDetail from "@/components/ProductDetail";
import Modal from "@/components/Modal";
import EditProduct from "@/components/EditProduct";

export default function page() {
  const { data: products, updateDocument } = useDB();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <Container>
      {products.length > 0 ? (
        <div>
          <ProductList
            productsData={products}
            onClickProducts={handleViewProduct}
          />
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            {selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                onClickButton={() => setEditModal(true)}
              />
            )}
          </Modal>
          <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
            {selectedProduct && (
              <EditProduct
                product={selectedProduct}
                onSubmit={async (data) => {
                  await updateDocument(selectedProduct.id, data);
                  setEditModal(false);
                  setModalOpen(false);
                }}
              />
            )}
          </Modal>
        </div>
      ) : (
        <p className="text-xl font-bold text-center text-red-700">
          No hay datos para mostrar, inicia sesion si no lo hiciste.
        </p>
      )}
    </Container>
  );
}
