

// // components/Navbar.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { useTheme } from "../hooks/useTheme";
// import "./Navbar.css";

// const Navbar = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   return (
//     <header className="navbar">

//       <div className="container navbar-inner">
//         <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
//           <span className="logo-mark">RU</span>
//           <span className="logo-text">ReUseCart</span>
//         </Link>

//         <button
//           className="navbar-toggle"
//           onClick={() => setMenuOpen((o) => !o)}
//           aria-label="Toggle navigation menu"
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>

//         <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             Browse
//           </Link>

//           {isAuthenticated && (
//             <>
//               <Link to="/add-product" onClick={() => setMenuOpen(false)}>
//                 Sell Item
//               </Link>
//               <Link to="/my-listings" onClick={() => setMenuOpen(false)}>
//                 My Listings
//               </Link>
//               <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
//                 Wishlist
//               </Link>
//               {/* <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
//                 Sell Item
//               </Link> */}
//               <Link to="/my-orders" className="nav-link">
//                 My Orders
//               </Link>
//             </>
//           )}

//           <button
//             className="theme-toggle"
//             onClick={toggleTheme}
//             title="Toggle dark mode"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>

//           {isAuthenticated ? (
//             <div className="navbar-profile">
//               <Link
//                 to="/profile"
//                 className="navbar-avatar"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {user?.avatar ? (
//                   <img src={user.avatar} alt={user.name} />
//                 ) : (
//                   <span>{user?.name?.charAt(0).toUpperCase()}</span>
//                 )}
//               </Link>
//               <button className="btn btn-outline btn-sm" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="navbar-auth">
//               <Link
//                 to="/login"
//                 className="btn btn-outline btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="btn btn-primary btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;













// first
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { useTheme } from "../hooks/useTheme";
// import "./Navbar.css";

// const Navbar = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [locationSearch, setLocationSearch] = useState("");

//   const handleLogout = () => {
//     logout();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   // 🔍 Location API triggering handler
//   const handleLocationSubmit = (e) => {
//     e.preventDefault();
//     if (locationSearch.trim()) {
//       // Home/Browse page redirect - location parameter pass kar rahe hain
//       navigate(`/?location=${encodeURIComponent(locationSearch.trim())}`);
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <header className="navbar">
//       <div className="container navbar-inner">
//         <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
//           <span className="logo-mark">RU</span>
//           <span className="logo-text">ReUseCart</span>
//         </Link>

//         {/* 📍 Location Search Form */}
//         <form className="search" onSubmit={handleLocationSubmit}>
//           <input
//             type="text"
//             name="location"
//             className="search-input"
//             placeholder="Search products by location..."
//             value={locationSearch}
//             onChange={(e) => setLocationSearch(e.target.value)}
//           />
//         </form>

//         <button
//           className="navbar-toggle"
//           onClick={() => setMenuOpen((o) => !o)}
//           aria-label="Toggle navigation menu"
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>

//         <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             Browse
//           </Link>

//           {isAuthenticated && (
//             <>
//               <Link to="/add-product" onClick={() => setMenuOpen(false)}>
//                 Sell Item
//               </Link>
//               <Link to="/my-listings" onClick={() => setMenuOpen(false)}>
//                 My Listings
//               </Link>
//               <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
//                 Wishlist
//               </Link>
//               <Link
//                 to="/my-orders"
//                 className="nav-link"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 My Orders
//               </Link>
//             </>
//           )}

//           <button
//             className="theme-toggle"
//             onClick={toggleTheme}
//             title="Toggle dark mode"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>

//           {isAuthenticated ? (
//             <div className="navbar-profile">
//               <Link
//                 to="/profile"
//                 className="navbar-avatar"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {user?.avatar ? (
//                   <img src={user.avatar} alt={user.name} />
//                 ) : (
//                   <span>{user?.name?.charAt(0).toUpperCase()}</span>
//                 )}
//               </Link>
//               <button className="btn btn-outline btn-sm" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="navbar-auth">
//               <Link
//                 to="/login"
//                 className="btn btn-outline btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="btn btn-primary btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// --------------------  1 -----------------------------------------------------

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Submit hone par Location URL Query Param Update karein
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locationSearch.trim()) {
      navigate(`/?location=${encodeURIComponent(locationSearch.trim())}`);
      setMenuOpen(false);
    } else {
      navigate("/"); // Khali karne par pure listings dikhayega
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">RU</span>
          <span className="logo-text">ReUseCart</span>
        </Link>


        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Browse
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/add-product" onClick={() => setMenuOpen(false)}>
                Sell Item
              </Link>
              <Link to="/my-listings" onClick={() => setMenuOpen(false)}>
                My Listings
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>
              <Link
                to="/my-orders"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>
            </>
          )}

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {isAuthenticated ? (
            <div className="navbar-profile">
              <Link
                to="/profile"
                className="navbar-avatar"
                onClick={() => setMenuOpen(false)}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                )}
              </Link>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link
                to="/login"
                className="btn btn-outline btn-sm"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;














// // --------------------------2---------
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { useTheme } from "../hooks/useTheme";
// import "./Navbar.css";

// const Navbar = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [menuOpen, setMenuOpen] = useState(false);

//   // Sync input state with URL 'location' query param
//   const urlLocation = searchParams.get("location") || "";
//   const [locationSearch, setLocationSearch] = useState(urlLocation);

//   useEffect(() => {
//     setLocationSearch(urlLocation);
//   }, [urlLocation]);

//   const handleLogout = () => {
//     logout();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   // Submit handler preserve existing params while updating 'location'
//   const handleLocationSubmit = (e) => {
//     e.preventDefault();
//     const newParams = new URLSearchParams(searchParams);

//     if (locationSearch.trim()) {
//       newParams.set("location", locationSearch.trim());
//     } else {
//       newParams.delete("location");
//     }

//     // Reset pagination to page 1 on new location search
//     newParams.delete("page");

//     navigate(`/?${newParams.toString()}`);
//     setMenuOpen(false);
//   };

//   // Clear location parameter
//   const handleClearLocation = () => {
//     setLocationSearch("");
//     const newParams = new URLSearchParams(searchParams);
//     newParams.delete("location");
//     newParams.delete("page");

//     navigate(newParams.toString() ? `/?${newParams.toString()}` : "/");
//   };

//   return (
//     <header className="navbar">
//       <div className="container navbar-inner">
//         <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
//           <span className="logo-mark">RU</span>
//           <span className="logo-text">ReUseCart</span>
//         </Link>

//         {/* 📍 Location Search Form */}
//         <form className="search" onSubmit={handleLocationSubmit}>
//           <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
//             <input
//               type="text"
//               name="location"
//               className="search-input"
//               placeholder="Search products by location..."
//               value={locationSearch}
//               onChange={(e) => setLocationSearch(e.target.value)}
//               style={{ paddingRight: locationSearch ? "60px" : "35px" }}
//             />

//             {/* Clear (✕) Button */}
//             {locationSearch && (
//               <button
//                 type="button"
//                 onClick={handleClearLocation}
//                 style={{
//                   position: "absolute",
//                   right: "35px",
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   color: "#888",
//                   fontSize: "14px",
//                 }}
//                 title="Clear location"
//               >
//                 ✕
//               </button>
//             )}

//             {/* Search (🔍) Button */}
//             <button
//               type="submit"
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: "#555",
//               }}
//               title="Search"
//             >
//               🔍
//             </button>
//           </div>
//         </form>

//         <button
//           className="navbar-toggle"
//           onClick={() => setMenuOpen((o) => !o)}
//           aria-label="Toggle navigation menu"
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>

//         <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             Browse
//           </Link>

//           {isAuthenticated && (
//             <>
//               <Link to="/add-product" onClick={() => setMenuOpen(false)}>
//                 Sell Item
//               </Link>
//               <Link to="/my-listings" onClick={() => setMenuOpen(false)}>
//                 My Listings
//               </Link>
//               <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
//                 Wishlist
//               </Link>
//               <Link
//                 to="/my-orders"
//                 className="nav-link"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 My Orders
//               </Link>
//             </>
//           )}

//           <button
//             className="theme-toggle"
//             onClick={toggleTheme}
//             title="Toggle dark mode"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>

//           {isAuthenticated ? (
//             <div className="navbar-profile">
//               <Link
//                 to="/profile"
//                 className="navbar-avatar"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {user?.avatar ? (
//                   <img src={user.avatar} alt={user.name} />
//                 ) : (
//                   <span>{user?.name?.charAt(0).toUpperCase()}</span>
//                 )}
//               </Link>
//               <button className="btn btn-outline btn-sm" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="navbar-auth">
//               <Link
//                 to="/login"
//                 className="btn btn-outline btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="btn btn-primary btn-sm"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;