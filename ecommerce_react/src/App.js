import { BrowserRouter, Routes, Route } from "react-router-dom";

//Route HomeLayout
import HomeLayout from "../src/components/layout/HomeLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/products/ProductPage";
import AboutPage from "./pages/about/AboutPage";
import SupportPage from "./pages/support/SupportPage";
import ContactPage from "./pages/contact/ContactPage";
import QuickView from "./pages/quick_view/QuickViewPage";
import CartPage from "./pages/shopping_cart/CartPage";

// Admin Pages
import DashBoard from "./components/admin/dashboard/DashBoard";
import Employee from "./components/admin/employees/Employee";
import ProfilePage from "./components/admin/profile/ProfilePage";

//Route Login and Logout Layout
import LoginLayout from "../src/components/layout/LoginAndSigninLayout";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import ErrorPage from "./components/error/ErrorPage";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      {/* Customer Layout */}
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="quickView" element={<QuickView />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<DashBoard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="profile" element={<ProfilePage />} />

        </Route>

        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<LoginLayout />}></Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signUp" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
