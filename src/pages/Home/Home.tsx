import Menu from "../components/Menu";
import products from "../../data/products.json";
import { BsSearch, BsFilter, BsArrowDownUp } from "react-icons/bs";
import { useState, useContext } from "react";
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
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

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

  return (
    <>
      <Menu />
      <div className="flex justify-center mt-[20px]">
        <div
          className="flex flex-col w-[98%] h-[calc(100vh-120px)] rounded-lg overflow-y-auto"
          style={{ backgroundColor: "#e8e4e4" }}
        >
          <div className="flex items-center mb-4 justify-center pt-8">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow w-[320px]">
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
              className="relative z-40"
              onMouseEnter={() => setShowFilters(true)}
              onMouseLeave={() => setShowFilters(false)}
            >
              <div
                className={`absolute top-[-20px] left-[10px] flex flex-col bg-[#c5c5c5] rounded-lg transition-all duration-300 overflow-hidden ${
                  showFilters ? "w-[300px] h-[250px] p-4" : "w-[40px] h-[40px] p-1.5"
                }`}
                aria-label="Filters"
              >
                <BsFilter className={`w-6 h-6 text-[#303cf3] ${showFilters ? "hidden" : "block"}`} />
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
              className="relative z-30"
              onMouseEnter={() => setShowSort(true)}
              onMouseLeave={() => setShowSort(false)}
            >
              <div
                className={`absolute top-[-20px] left-[60px] flex flex-col bg-[#c5c5c5] rounded-lg transition-all duration-300 overflow-hidden ${
                  showSort ? "w-[300px] h-[170px] p-4" : "w-[40px] h-[40px] p-1.5"
                }`}
                aria-label="Sort"
              >
                <BsArrowDownUp className={`w-6 h-6 text-[#303cf3] ${showSort ? "hidden" : "block"}`} />
                <div className={`${showSort ? "block" : "hidden"}`}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sort by</label>
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={sortField}
                        onChange={e => setSortField(e.target.value)}
                      >
                        <option value="">Select</option>
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
                className="bg-white rounded-lg shadow-md p-4 w-64 flex flex-col items-center hover:shadow-lg hover:bg-[#c5c5c5] transition-colors duration-300 justify-between"
              >
                <a href={`/${product.id}`} className="w-full flex flex-col items-center">
                  <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-contain mb-2 rounded" />
                  <h2 className="font-bold text-lg text-center">{product.title}</h2>
                  <p className="text-gray-600 text-sm text-center mb-2">{product.brand}</p>
                  <span className="font-semibold text-[#303cf3] text-xl mb-1">${product.price}</span>
                  <p className="text-xs text-gray-500 text-center">{product.category}</p>
                </a>
                <div className="mt-2 flex gap-2 items-center">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                  >
                    Add
                  </button>
                    <p className="text-sm font-medium">{cart[product.id]}</p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Remove
                  </button>
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