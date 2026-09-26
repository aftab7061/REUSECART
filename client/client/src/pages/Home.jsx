

import { useState, useEffect, useCallback } from 'react';
import * as productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';

const Home = () => {
  const { showToast } = useToast();
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '', // Added subcategory support
    condition: '',
    minPrice: '',
    maxPrice: '',
  });
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(filters.search, 450);

  // Helper to handle filter updates and reset page to 1 seamlessly
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        ...filters,
        search: debouncedSearch,
        page,
        limit: 12,
      });
      setProducts(data.products || []);
      setPagination(data.pagination || { pages: 1, total: 0 });
    } catch (err) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearch,
    filters.category,
    filters.subcategory,
    filters.condition,
    filters.minPrice,
    filters.maxPrice,
    page,
    showToast,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
    });
    setPage(1);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Listings</h1>
        </div>

        <SearchFilter
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {loading ? (
          <Loader label="Loading listings..." />
        ) : products.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No products found"
            message="Try adjusting your search or filters."
            actionLabel="Reset Filters"
            onAction={handleReset}
          />
        ) : (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Pagination
              page={pagination.page || page}
              pages={pagination.pages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;





// // ---------------------1-------------
// import { useState, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import * as productService from '../services/productService';
// import ProductCard from '../components/ProductCard';
// import SearchFilter from '../components/SearchFilter';
// import Pagination from '../components/Pagination';
// import Loader from '../components/Loader';
// import EmptyState from '../components/EmptyState';
// import { useDebounce } from '../hooks/useDebounce';
// import { useToast } from '../hooks/useToast';

// const Home = () => {
//   const { showToast } = useToast();
//   const [searchParams] = useSearchParams();

//   // URL Query se location get karein
//   const locationParam = searchParams.get('location') || '';

//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     subcategory: '',
//     condition: '',
//     minPrice: '',
//     maxPrice: '',
//     location: locationParam,
//   });

//   const [page, setPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);

//   // URL param badalne par location state refresh karein
//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       location: locationParam,
//     }));
//     setPage(1);
//   }, [locationParam]);

//   const debouncedSearch = useDebounce(filters.search, 450);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await productService.getProducts({
//         ...filters,
//         search: debouncedSearch,
//         location: filters.location, // Location param explicitly passed
//         page,
//         limit: 12,
//       });
//       setProducts(data.products || []);
//       setPagination(data.pagination || { pages: 1, total: 0 });
//     } catch (err) {
//       showToast('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     debouncedSearch,
//     filters.category,
//     filters.subcategory,
//     filters.condition,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.location,
//     page,
//     showToast,
//   ]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   const handleReset = () => {
//     setFilters({
//       search: '',
//       category: '',
//       subcategory: '',
//       condition: '',
//       minPrice: '',
//       maxPrice: '',
//       location: '',
//     });
//     setPage(1);
//   };

//   return (
//     <div className="page">
//       <div className="container">
//         <div className="page-header">
//           <h1>
//             {filters.location
//               ? `Products in "${filters.location}"`
//               : 'Browse Listings'}
//           </h1>
//         </div>

//         <SearchFilter
//           filters={filters}
//           onChange={handleFilterChange}
//           onReset={handleReset}
//         />

//         {loading ? (
//           <Loader label="Loading listings..." />
//         ) : products.length === 0 ? (
//           <EmptyState
//             icon="🔍"
//             title="No products found"
//             message={
//               filters.location
//                 ? `No products listed for location: ${filters.location}`
//                 : 'Try adjusting your search or filters.'
//             }
//             actionLabel="Reset Filters"
//             onAction={handleReset}
//           />
//         ) : (
//           <>
//             <div className="product-grid">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//             <Pagination
//               page={pagination.page || page}
//               pages={pagination.pages}
//               onPageChange={setPage}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


// ---------------------------2------------------

// import { useState, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import * as productService from '../services/productService';
// import ProductCard from '../components/ProductCard';
// import SearchFilter from '../components/SearchFilter';
// import Pagination from '../components/Pagination';
// import Loader from '../components/Loader';
// import EmptyState from '../components/EmptyState';
// import { useDebounce } from '../hooks/useDebounce';
// import { useToast } from '../hooks/useToast';

// const Home = () => {
//   const { showToast } = useToast();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Extract location directly from URL
//   const locationParam = searchParams.get('location') || '';

//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     subcategory: '',
//     condition: '',
//     minPrice: '',
//     maxPrice: '',
//     location: locationParam,
//   });

//   const [page, setPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);

//   // Sync local filters state whenever URL location param changes (e.g. from Navbar search)
//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       location: locationParam,
//     }));
//     setPage(1);
//   }, [locationParam]);

//   const debouncedSearch = useDebounce(filters.search, 450);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await productService.getProducts({
//         ...filters,
//         search: debouncedSearch,
//         location: filters.location,
//         page,
//         limit: 12,
//       });
//       setProducts(data.products || []);
//       setPagination(data.pagination || { pages: 1, total: 0 });
//     } catch (err) {
//       showToast('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     debouncedSearch,
//     filters.category,
//     filters.subcategory,
//     filters.condition,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.location,
//     page,
//     showToast,
//   ]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1);

//     // Update URL query string safely using URLSearchParams mutation
//     if (newFilters.location !== locationParam) {
//       const updatedParams = new URLSearchParams(searchParams);
//       if (newFilters.location) {
//         updatedParams.set('location', newFilters.location);
//       } else {
//         updatedParams.delete('location');
//       }
//       setSearchParams(updatedParams);
//     }
//   };

//   const handleReset = () => {
//     // Clear URL query parameters completely
//     setSearchParams({});

//     setFilters({
//       search: '',
//       category: '',
//       subcategory: '',
//       condition: '',
//       minPrice: '',
//       maxPrice: '',
//       location: '',
//     });
//     setPage(1);
//   };

//   return (
//     <div className="page">
//       <div className="container">
//         <div className="page-header">
//           <h1>
//             {filters.location
//               ? `Products in "${filters.location}"`
//               : 'Browse Listings'}
//           </h1>
//         </div>

//         <SearchFilter
//           filters={filters}
//           onChange={handleFilterChange}
//           onReset={handleReset}
//         />

//         {loading ? (
//           <Loader label="Loading listings..." />
//         ) : products.length === 0 ? (
//           <EmptyState
//             icon="🔍"
//             title="No products found"
//             message={
//               filters.location
//                 ? `No products listed for location: ${filters.location}`
//                 : 'Try adjusting your search or filters.'
//             }
//             actionLabel="Reset Filters"
//             onAction={handleReset}
//           />
//         ) : (
//           <>
//             <div className="product-grid">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//             <Pagination
//               page={pagination.page || page}
//               pages={pagination.pages}
//               onPageChange={setPage}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;