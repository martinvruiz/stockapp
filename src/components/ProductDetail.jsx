"use client";
import Image from "next/image";

const ProductDetail = ({ product, onClickButton }) => {
  const { img, title, price, stock, revenue } = product;

  return (
    <div className="max-w-sm mx-auto rounded-xl overflow-hidden p-4">
      <div className="relative w-full h-48 mb-4">
        <Image
          alt={`image of ${title}`}
          src={`https://drive.google.com/uc?export=view&id=${img}`}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700 text-lg">Costo: ${price}</p>
      <p className="text-gray-700 text-lg">Ganancia: x{revenue}</p>
      <p className="text-gray-700 text-lg">
        Total: {(price * revenue).toFixed(2)}
      </p>
      <p
        className={`text-sm my-2 ${
          stock > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {stock > 0 ? `Stock: ${stock}` : "Sin stock"}
      </p>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        onClick={onClickButton}
      >
        Editar producto
      </button>
    </div>
  );
};

export default ProductDetail;
