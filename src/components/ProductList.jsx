import { Autour_One } from "next/font/google";
import Image from "next/image";

export default function ProductList({ productsData, onClickProducts }) {
  return (
    <div className="mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-4">
        Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <Image
                width={300}
                height={300}
                className="w-full h-full object-cover"
                src={product.img}
                alt={product.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300?text=Imagen+no+disponible";
                }}
              />
            </div>

            <div className="p-4">
              <h3
                className="font-semibold text-lg mb-2 line-clamp-2 text-black"
                title={product.title}
              >
                {product.title}
              </h3>

              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-blue-600">
                  ${(product.price * product.revenue).toFixed(2)}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                </span>
              </div>

              <button
                onClick={() => onClickProducts(product)}
                className="w-full mt-2 bg-red-700 hover:bg-red-500 text-white py-2 px-4 rounded transition-colors duration-300"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
