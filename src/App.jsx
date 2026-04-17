import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist.jsx";
import CategoryPage from "./pages/CategoryPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />        {/* ← outside <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:category/:type" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;