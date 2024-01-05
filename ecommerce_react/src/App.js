import { BrowserRouter, Routes, Route } from "react-router-dom";

//Route HomeLayout
import HomeLayout from "../src/components/layout/HomeLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/products/ProductPage";
import AboutPage from "./pages/about/AboutPage";
import SupportPage from "./pages/support/SupportPage";
import ContactPage from "./pages/contact/ContactPage";

//Route Login and Logout Layout
import LoginLayout from "../src/components/layout/LoginAndSigninLayout";
import LoginnPage from "./pages/login/LoginnPage";
import SignUpPage from "./pages/signUp/SignUpPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route  path="/" element={<LoginLayout />}>
          <Route path="login" element={<LoginnPage />} />  
          <Route path="signUp" element={<SignUpPage />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
