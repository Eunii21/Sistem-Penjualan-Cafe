import { Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#d6ccc2] shadow sticky top-0 z-30">

      <button onClick={toggleSidebar}>
        <Menu size={22} className="text-[#3b1f1a]" />
      </button>

      <h1 className="text-sm md:text-lg font-semibold text-[#3b1f1a]">
        
      </h1>

    </div>
  );
}

export default Navbar;