import Menu from "../components/Menu";
import products from "../../data/products.json";
import { BsSearch, BsFilter, BsArrowDownUp } from "react-icons/bs";
import { useState, useContext, useRef } from "react";
import { CartContext } from "../../context/CartContext";

export const Home = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tag, setTag] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const sortRef = useRef<HTMLDivElement>(null);

  // Extrai categorias e tags únicas
  const categories = Array.from(
    new Set(
      products.products
        .map(p => p.category)
        .filter(Boolean)
        .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
    )
  );
  const tags = Array.from(
    new Set(
      products.products
        .flatMap(p => p.tags || [])
        .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1))
    )
  );

  let filteredProducts = products.products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category.toLowerCase() ? product.category === category.toLowerCase() : true;
    const matchesMinPrice = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    const matchesTag = tag.toLowerCase() ? (product.tags || []).includes(tag.toLowerCase()) : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesTag
    );
  });

  if (sortField) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      let aValue, bValue;
      if (sortField === "title") {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      } else if (sortField === "price") {
        aValue = a.price;
        bValue = b.price;
      } else if (sortField === "rating") {
        aValue = a.rating;
        bValue = b.rating;
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const getFilterPosition = () => {
    if (!sortRef.current) return "left-[-90px]";
    const rect = sortRef.current.getBoundingClientRect();
    return rect.x + 250 > window.innerWidth ? "right-[50px] z-30" : "left-[-90px] z-40";
  };

  const getSortPosition = () => {
    if (!sortRef.current) return "left-[-40px]";
    const rect = sortRef.current.getBoundingClientRect();
    return rect.x + 250 > window.innerWidth ? "right-[0px] z-40" : "left-[-40px] z-30";
  };

  return (
    <>
      <Menu />
      <div className="flex justify-center mt-[100px]">
        <div
          className="flex flex-col w-[98%] h-[calc(100vh-120px)] rounded-lg overflow-y-auto bg-[#0c525b] fixed">
          <div className="flex items-center mb-4 justify-center pt-8">
            <div className="flex items-center bg-[#dae8de] rounded-lg px-3 py-2 shadow w-[320px] me-[100px]">
              <BsSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none bg-transparent text-base"
              />
            </div>
            {/* Collapse de filtros */}
            <div
              className="relative"
              onMouseEnter={() => setShowFilters(true)}
              onMouseLeave={() => setShowFilters(false)}
            >
              <div
                className={`absolute top-[-20px] flex flex-col rounded-lg transition-all duration-300 overflow-hidden ${
                  showFilters ? "w-[300px] h-[250px] p-4 bg-[#a3b6a8]" : "w-[40px] h-[40px] p-1.5 bg-[#dae8de]"
                }  ${getFilterPosition()}`}
                aria-label="Filters"
              >
                <BsFilter className={`w-7 h-7 text-[#0c525b] ${showFilters ? "hidden" : "block"}`} />
                <div className={`${showFilters ? "block" : "hidden"}`}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value="">All</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Min Price</label>
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          value={minPrice}
                          onChange={e => setMinPrice(e.target.value)}
                          min={0}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Max Price</label>
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          value={maxPrice}
                          onChange={e => setMaxPrice(e.target.value)}
                          min={0}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tag</label>
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                      >
                        <option value="">All</option>
                        {tags.map(t => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Collapse de ordenação */}
            <div
              ref={sortRef}
              className="relative"
              onMouseEnter={() => setShowSort(true)}
              onMouseLeave={() => setShowSort(false)}
            >
              <div
                className={`absolute top-[-20px] flex flex-col bg-[#dae8de] rounded-lg transition-all duration-300 overflow-hidden ${
                  showSort ? "w-[300px] h-[170px] p-4 bg-[#a3b6a8]" : "w-[40px] h-[40px] p-1.5 bg-[#dae8de]"
                }  ${getSortPosition()}`}
                aria-label="Sort"
              >
                <BsArrowDownUp className={`w-7 h-7 text-[#0c525b] ${showSort ? "hidden" : "block"}`} />
                <div className={`${showSort ? "block" : "hidden"}`}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sort by</label>
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={sortField}
                        onChange={e => setSortField(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="title">Name (A-Z/Z-A)</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Order</label>
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 p-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#dae8de] text-black rounded-lg shadow-md p-4 w-64 flex flex-col items-center hover:shadow-lg hover:bg-[#a3b6a8] transition-colors duration-300 justify-between"
              >
                <a href={`/product/${product.id}`} className="w-full flex flex-col items-center ">
                  <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-contain mb-2 rounded" />
                  <h2 className="font-bold text-lg text-center">{product.title}</h2>
                  <p className="text-gray-900 text-sm text-center mb-2">{product.brand}</p>
                  <span className="font-semibold text-[#0c525b] text-xl mb-1">${product.price}</span>
                  <p className="text-sm text-yellow-500 font-bold text-center">★ {product.rating}</p>
                </a>
                <div className="mt-2 flex gap-2 items-center">
                  {cart[product.id] > 0 ? (
                    <>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="px-2 py-1 bg-[#8a8888] text-white rounded hover:bg-[#707070] transition-all text-sm active:scale-95 active:bg-[#525252] active:shadow-inner"
                      >
                        -
                      </button>
                      <p className="text-sm font-medium">{cart[product.id]}</p>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="px-2 py-1 bg-[#0c525b] text-white rounded hover:bg-[#37808a] transition-all text-sm active:scale-95 active:bg-[#06343a] active:shadow-inner"
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="px-2 py-1 bg-[#0c525b] text-white rounded hover:bg-[#37808a] transition-all text-sm active:scale-95 active:bg-[#06343a] active:shadow-inner"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;