import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../src/components/layout/HomeLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
