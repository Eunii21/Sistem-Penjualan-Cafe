import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#d6ccc2] min-h-screen">

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* CONTENT */}
      <div
        className={`
          flex flex-col min-h-screen
          transition-all duration-300

          md:ml-20
          ${open ? "md:ml-64" : "md:ml-20"}
        `}
      >

        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* MAIN */}
        <main className="flex-1 px-4 md:px-6 py-4">
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}

export default MainLayout;