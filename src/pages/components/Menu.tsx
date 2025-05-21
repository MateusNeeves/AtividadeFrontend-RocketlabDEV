import { BsCart4 } from "react-icons/bs";

const Menu: React.FC = () => {
  return (
        <>
            <div className="flex h-[80px] justify-center rounded-b-lg" style={{ backgroundColor: "#e8e4e4" }}>
                <div className="flex w-3/5 justify-between items-center">
                    <a href="/" className="flex items-center p-1.5 pb-3 hover:bg-[#c5c5c5] rounded-lg transition-colors">
                        <h1 className="italic font-extrabold text-3xl relative" style={{ color: "#303cf3" }}>
                            rocket
                            <span className="absolute bottom-0 flex items-center justify-center">
                                <svg viewBox="0 0 120 6" xmlns="http://www.w3.org/2000/svg" className="w-full">
                                    <path d="M2 3 Q60 -2 116 3" stroke="#06d0a2" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </h1>  
                        <h1 className="italic font-extrabold text-base ms-0.5 mt-[-20px]" style={{ color: "#303cf3" }}>LAB</h1>
                        <h1 className="italic font-extrabold text-3xl" style={{ color: "#303cf3" }}>shop</h1>
                    </a>
                    <div className="flex items-center">
                        <a href="/cart" className="flex p-1.5 bg-[#c5c5c5] hover:bg-[#aaa8a8] rounded-lg transition-colors" aria-label="Carrinho de compras">
                            <BsCart4 className="w-7 h-7 text-[#303cf3]" />
                        </a>
                    </div>
                </div>
            </div>
        </>

  );
};

export default Menu;
