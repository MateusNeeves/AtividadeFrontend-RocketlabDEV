import { useState, useContext, useRef } from "react";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import products from "../../data/products.json";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Convert cart to an array with product details
  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.products.find((p) => p.id === Number(id));
      return { id: Number(id), quantity, product };
    })
    .filter((item) => item.product);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, { quantity, product }) => sum + product.price * quantity,
    0
  );

  const getPopupPosition = () => {
    if (!cartRef.current) return "left-[-20px]";
    const rect = cartRef.current.getBoundingClientRect();
    return rect.x + 320 > window.innerWidth ? "right-[-20px]" : "left-[-20px]";
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="flex h-[80px] justify-center rounded-b-lg fixed top-0 left-0 w-full z-50 bg-[#0c525b]">
          <div className="flex w-3/5 justify-between items-center">
            <a href="/" className="flex items-center p-1.5 pb-3">
              <h1 className="italic font-extrabold text-3xl relative" style={{ color: "#dae8de" }}>
                rocket
                <span className="absolute bottom-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 6" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M2 3 Q60 -2 116 3" stroke="#06d0a2" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h1>  
              <h1 className="italic font-extrabold text-base ms-0.5 mt-[-20px]" style={{ color: "#dae8de" }}>LAB</h1>
              <h1 className="italic font-extrabold text-3xl" style={{ color: "#dae8de" }}>shop</h1>
            </a>
            <div
			        ref={cartRef}
              className="relative z-50" 
              onMouseEnter={() => setShowCartPopup(true)} 
              onMouseLeave={() => setShowCartPopup(false)}
            >
              <div
                className={`absolute top-[-20px] flex flex-col  rounded-lg transition-all duration-500 overflow-hidden items-between ${
                  showCartPopup ? "w-[320px] h-[400px] p-4 bg-[#a3b6a8]" : "w-[40px] h-[40px] p-1.5 bg-[#dae8de]"
                } ${getPopupPosition()}`}
                aria-label="Shopping Cart"
              >
                <BsCart4 className={`w-7 h-7 text-[#0c525b] ${showCartPopup ? "hidden" : "block"}`}/>
                <div className={`${showCartPopup ? "block" : "hidden"} relative h-full`}>
                  <h3 className="text-lg font-bold border-b pb-2 mb-2">Your Cart</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-sm">No items added.</p>
                  ) : (
                    <ul className="max-h-[calc(100%-120px)] overflow-y-auto pe-3">
                      {cartItems.map(({ id, quantity, product }) => (
                        <li key={id} className="flex items-center gap-3 mb-3">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-12 h-12 object-contain rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.title}</p>
                            <p className="text-xs text-gray-600">${product.price}</p>
                            <p className="text-xs">Quantity: {quantity}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => addToCart(product.id)}
                              className="px-2 py-1 bg-[#0c525b] hover:bg-[#337b85] text-white rounded transition-all text-sm active:scale-95 active:bg-[#06343a] active:shadow-inner"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="px-2 py-1 bg-[#8a8888] hover:bg-[#707070] text-white rounded transition-all text-xs active:scale-95 active:bg-[#525252] active:shadow-inner"
                            >
                              -
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="absolute bottom-0 left-0 w-full border-t pt-2">
                    <div className="text-right font-semibold text-sm">
                      Total: ${totalPrice.toFixed(2)}
                    </div>
                    <Link
                      to="/cart"
                      className="block mt-2 text-center px-3 py-2 bg-[#0c525b] text-white rounded hover:bg-[#337b85] transition-all text-sm active:scale-95 active:bg-[#06343a] active:shadow-inner"
                    >
                      Go to Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
