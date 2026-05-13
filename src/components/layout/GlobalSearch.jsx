import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ImageIcon, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const getAllProducts = useStore(state => state.getAllProducts);
  const products = getAllProducts();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return products
      .filter(product => product.name.toLowerCase().includes(term))
      .slice(0, 8); // Top 8 results
  }, [query, products]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleProductClick = (productId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/inventory?product=${productId}`);
  };

  return (
    <div className="relative hidden w-72 sm:block lg:w-96" ref={searchRef}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border border-gray-200 bg-transparent py-1.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (query) setIsOpen(true); }}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 mt-2 w-full origin-top-left rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-[#18181b] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-96 overflow-y-auto py-2">
            {filteredProducts.length > 0 ? (
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredProducts.map((product) => (
                  <li key={`${product.platformKey}-${product.id}`}>
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="flex w-full items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-5 w-5 m-auto mt-2.5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {product.platform}
                        </p>
                      </div>
                      <div className="ml-3 flex flex-col items-end flex-shrink-0">
                        {product.stock < 10 ? (
                          <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Low Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            In Stock ({product.stock})
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No products found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
