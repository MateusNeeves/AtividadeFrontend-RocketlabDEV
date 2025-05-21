import Menu from "../components/Menu"
import products from "../../data/products.json"
import { BsSearch, BsFilter, BsArrowDownUp } from "react-icons/bs";
import { useState } from "react";

export const Home = () => {
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
  const categories = Array.from(new Set(products.products.map(p => p.category).filter(Boolean).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))));
  const tags = Array.from(new Set(products.products.flatMap(p => p.tags || []).map(tag => tag.charAt(0).toUpperCase() + tag.slice(1))));

  let filteredProducts = products.products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category ? product.category === category : true;
    const matchesMinPrice = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    const matchesTag = tag ? (product.tags || []).includes(tag) : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesTag
    );
  });

  // Ordenação
  if (sortField) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      let aValue, bValue;
      if (sortField === "title") {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
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
        <div className="flex flex-col w-[98%] h-[calc(100vh-120px)] rounded-lg overflow-y-auto" style={{ backgroundColor: "#e8e4e4" }}>
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
            <button
              className="ml-3 px-3 py-2 rounded-lg shadow bg-[#c5c5c5] hover:bg-[#aaa8a8] transition-colors"
              type="button"
              onClick={() => setShowFilters(true)}
            >
              <BsFilter className="w-6 h-6 text-[#303cf3]" />
            </button>
            <button
              className="ml-3 px-3 py-2 rounded-lg shadow bg-[#c5c5c5] hover:bg-[#aaa8a8] transition-colors"
              type="button"
              onClick={() => setShowSort(true)}
            >
              <BsArrowDownUp className="w-6 h-6 text-[#303cf3]" />
            </button>
          </div>

          {/* Popup de filtros */}
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                  onClick={() => setShowFilters(false)}
                  aria-label="Fechar"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-[#303cf3]">Filter Products</h2>
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
                        <option key={cat} value={cat}>{cat}</option>
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
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-[#303cf3] text-white rounded-lg hover:bg-[#2329b6] transition-colors"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Popup de ordenação */}
          {showSort && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                  onClick={() => setShowSort(false)}
                  aria-label="Fechar"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-[#303cf3]">Sort Products</h2>
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
                  <button
                    className="mt-2 px-4 py-2 bg-[#303cf3] text-white rounded-lg hover:bg-[#2329b6] transition-colors"
                    onClick={() => setShowSort(false)}
                  >
                    Apply Sort
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 p-6">
            {filteredProducts.map((product) => (
              <a
                href={"/" + product.id}
                className="bg-white rounded-lg shadow-md p-4 w-64 flex flex-col items-center hover:shadow-lg hover:bg-[#c5c5c5] transition-colors duration-300"
                key={product.id}
              >
                <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-contain mb-2 rounded" />
                <h2 className="font-bold text-lg text-center">{product.title}</h2>
                <p className="text-gray-600 text-sm text-center mb-2">{product.brand}</p>
                <span className="font-semibold text-[#303cf3] text-xl mb-1">${product.price}</span>
                <p className="text-xs text-gray-500 text-center">{product.category}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;