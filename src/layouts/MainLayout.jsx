import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#d6ccc2]">

  {/* Sidebar */}
  <Sidebar open={open} />

  {/* Main */}
  <div
    className={`flex-1 flex flex-col transition-all duration-300 ${
      open ? "ml-64" : "ml-16"
    }`}
  >
    <Navbar toggleSidebar={() => setOpen(!open)} />
    <Header />

    <main className="flex-1 px-6 py-4">
      <Outlet />
    </main>

    <Footer />
  </div>

</div>
  );
}

export default MainLayout;