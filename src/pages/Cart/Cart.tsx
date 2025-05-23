import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import products from "../../data/products.json";
import Menu from "../components/Menu";
import { CustomModal } from "../components/CustomModal";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.products.find((p) => p.id === Number(id));
      return { id: Number(id), quantity, product };
    })
    .filter((item) => item.product);

  const totalPrice = cartItems.reduce(
    (sum, { quantity, product }) => sum + product.price * quantity,
    0
  );

  const handleCheckout = () => {
    clearCart(); // Limpa o carrinho (o useEffect do Context já atualiza o localStorage)
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <Menu />
      <div className="container max-w-3xl mx-auto p-6 bg-[#e8e4e4] rounded-lg shadow mt-[100px] h-[calc(100vh-120px)] overflow-y-auto fixed-top">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map(({ id, quantity, product }) => (
                <li
                  key={id}
                  className="flex items-start gap-4 p-4 bg-white shadow rounded"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="text-gray-800 font-bold">${product.price}</p>
                    <div className="flex gap-2 mt-2 items-center">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="px-3 py-1 bg-[#303cf3] hover:bg-[#2329b6] text-white rounded"
                      >
                        +
                      </button>
                      <p className="text-sm">{quantity}</p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="px-3 py-1 bg-[#aaa8a8] hover:bg-[#888] text-white rounded"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-4 text-right">
          <Link
            to="/"
            className="px-5 py-2 bg-[#303cf3] text-white rounded hover:bg-[#2329b6] transition-colors h-[40px]"
          >
            Continue Shopping
          </Link>
          {cartItems.length > 0 && (
            <a
              onClick={handleCheckout}
              className="ms-5 px-5 py-2 bg-[#303cf3] text-white rounded hover:bg-[#2329b6] transition-colors h-[40px] cursor-pointer"
            >
              Checkout
            </a>
          )}
        </div>
      </div>
      {showModal && (
        <CustomModal
          message="Thank you for your purchase! Your order was successful."
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Cart;