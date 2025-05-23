import Menu from "../components/Menu";
import products from "../../data/products.json";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.products.find((p) => String(p.id) === id);

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(
    product?.images && product.images.length > 0 ? product.images[0] : ""
  );

  // Cart context
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const cartQty = cart && product ? cart[product.id] || 0 : 0;

  if (!product) {
    return (
      <>
        <Menu />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h2 className="text-2xl font-bold text-red-600">
            Product not found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Menu />
      <div className="max-w-3xl mx-auto p-6 bg-[#e8e4e4] rounded-lg shadow mt-[100px] h-[calc(100vh-120px)] overflow-y-auto fixed-top">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Images */}
          <div className="flex flex-col items-center gap-2">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.title}
                className="w-48 h-48 object-contain rounded border"
              />
            )}
            <div className="flex gap-2 flex-wrap justify-center mt-2">
              {product.images?.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.title + " " + (idx + 1)}
                  className={`w-16 h-16 object-contain rounded border cursor-pointer transition-all ${
                    selectedImage === img
                      ? "ring-2 ring-[#303cf3] border-[#303cf3]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-[#e8e4e4] px-2 py-1 rounded text-xs">
                {product.category}
              </span>
              {product.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-[#303cf3] text-white px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-[#303cf3] text-xl">
                ${product.price}
              </span>
              <span className="ml-4 text-yellow-500 font-bold">
                ★ {product.rating}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-700">
                Brand: {product.brand}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-700">
                Weight: {product.weight}g
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-700">
                Dimensions:{" "}
                {product.dimensions?.width ?? "-"} x{" "}
                {product.dimensions?.height ?? "-"} x{" "}
                {product.dimensions?.depth ?? "-"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-700">
                Stock: {product.stock}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-700">
                Status: {product.availabilityStatus}
              </span>
            </div>
            {/* Cart actions */}
            <div className="flex items-center gap-3 mt-4">
              <button
                className="px-3 py-1 bg-[#303cf3] text-white rounded-lg text-lg font-bold hover:bg-[#2329b6] transition-colors"
                onClick={() => addToCart(product.id)}
              >
                +
              </button>
              <span className="text-lg font-semibold">{cartQty}</span>
              <button
                className="px-3 py-1 bg-[#aaa8a8] text-white rounded-lg text-lg font-bold hover:bg-[#888] transition-colors disabled:opacity-50"
                onClick={() => removeFromCart(product.id)}
                disabled={cartQty === 0}
              >
                -
              </button>
              <span className="text-sm text-gray-600 ml-2">in cart</span>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Reviews</h2>
          <div className="flex flex-col gap-4">
            {product.reviews?.length ? (
              product.reviews.map((review: any, idx: number) => (
                <div
                  key={idx}
                  className="border rounded p-3 bg-[#f7f7f7]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500 font-bold">
                      ★ {review.rating}
                    </span>
                    <span className="text-sm text-gray-700">
                      {review.reviewerName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{review.comment}</p>
                  <span className="text-xs text-gray-400">
                    {review.reviewerEmail}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-gray-500">No reviews.</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;