import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#d6ccc2] items-stretch">

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">

        <Navbar toggleSidebar={() => setOpen(true)} />

        <main className="flex-1 px-4 md:px-6 py-4">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
}

export default MainLayout;