import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transaksi from "./pages/Transaksi";
import Menu from "./pages/Menu";
import Stok from "./pages/Stok";
import Login from "./pages/Login";
import LupaSandi from "./pages/LupaSandi";
import TambahMenu from "./pages/TambahMenu";
import UbahMenu from "./pages/UbahMenu";
import TambahStok from "./pages/TambahStok";
import UbahStok from "./pages/UbahStok";
import UbahSandi from "./pages/UbahSandi";
import Riwayat from "./pages/Riwayat";
import DetailRiwayat from "./pages/DetailRiwayat";

function App() {
  return (
    <Routes>
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lupasandi" element={<LupaSandi />} />
      <Route path="ubahsandi" element={<UbahSandi />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transaksi" element={<Transaksi />} />
        <Route path="menu" element={<Menu />} />
        <Route path="tambah-menu" element={<TambahMenu />} />
        <Route path="stok" element={<Stok />} />
        <Route path="ubah-menu/:id" element={<UbahMenu />} />
        <Route path="tambah-stok" element={<TambahStok />} />
        <Route path="ubah-stok" element={<UbahStok />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="detailriwayat" element={<DetailRiwayat />} />
      </Route>
    </Routes>
  );
}

export default App;