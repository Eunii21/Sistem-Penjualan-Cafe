import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transaksi from "./pages/Transaksi";
import Menu from "./pages/Menu";
import Stok from "./pages/Stok";

function App() {
  return (
   <Routes>
   <Route path="/landing-page" element={<LandingPage />}/>
   <Route path="/dashboard" element={<MainLayout />}>
    <Route index element={<Dashboard />}/>
    <Route path="transaksi" element={<Transaksi />}/>
    <Route path="menu" element={<Menu />}/>
    <Route path="stok" element={<Stok />}/>
    </Route>
   </Routes>
  );
}

export default App;