import { BrowserRouter, Routes, Route } from "react-router-dom";

//Route HomeLayout
import HomeLayout from "../src/components/layout/HomeLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/products/ProductPage";
import ProductCatagoryPage from "./pages/products/ProductCatagoryPage";
import ProductSearch from "./pages/products/ProductSearch";
import AboutPage from "./pages/about/AboutPage";
import SupportPage from "./pages/support/SupportPage";
import ContactPage from "./pages/contact/ContactPage";
import QuickView from "./pages/quick_view/QuickViewPage";
import CartPage from "./pages/shopping_cart/CartPage";
import WishlistPage from "./pages/wishlish/WishlistPage";
import  ProfilePage from "./components/cusprofile/ProfilePage";
import OrderPage from "./pages/orderPage/OrderPage";


// Admin Pages
import DashBoard from "./components/admin/dashboard/DashBoard";
import Employee from "./components/admin/employees/Employee";
import Profile from "./components/admin/profile/Profile";
import Product from "./components/admin/products/Product";
import Customer from "./components/admin/customers/Customer";
import Role from "./components/admin/role/Role";
import RolePermission from "./components/admin/role/RolePermission";
import Permission from "./components/admin/role/Permission";
import Brand from "./components/admin/products/Brand";
import Category from "./components/admin/products/Category";
import Order from "./components/admin/orders/Order";
import OrderStatus from "./components/admin/orders/OrderStatus";
import OrderDetail from "./components/admin/orders/OrderDetail";
import PaymentMethod from "./components/admin/orders/PaymentMethod";

//Route Login and Logout Layout
import LoginLayout from "../src/components/layout/LoginAndSigninLayout";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import ErrorPage from "./components/error/ErrorPage";
import AdminLayout from "./components/layout/AdminLayout";
import CustomerAddress from "./components/admin/customers/CustomerAddress";

function App() {
  return (
    <BrowserRouter>
      {/* Customer Layout */}
      <Routes>
        <Route path="/" element={<HomeLayout />}>
        <Route path="customerprofile" element={<ProfilePage />} />
        <Route path="order" element={<OrderPage />} />
          <Route path="" element={<HomePage />} />
          <Route path="product/:txtsearch?" element={<ProductPage />} />
          <Route path="productCategory/:category?" element={<ProductCatagoryPage />} />
          <Route path="productSearch" element={<ProductSearch />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="quickView/:productId" element={<QuickView />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<DashBoard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customerAddress" element={<CustomerAddress />} />
          <Route path="product" element={<Product />} />
          <Route path="brand" element={<Brand />} />
          <Route path="category" element={<Category />} />
          <Route path="role" element={<Role />} />
          <Route path="rolePermission" element={<RolePermission />} />
          <Route path="permission" element={<Permission />} />
          <Route path="order" element={<Order />} />
          <Route path="orderStatus" element={<OrderStatus />} />
          <Route path="order/orderDetail" element={<OrderDetail />} />
          <Route path="paymentmethod" element={<PaymentMethod />} />
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
