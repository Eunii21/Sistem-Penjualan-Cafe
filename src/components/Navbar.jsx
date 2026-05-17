import { Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#d6ccc2] shadow sticky top-0 z-30">

      <button onClick={toggleSidebar}>
        <Menu
          size={24}
          className="text-[#3b1f1a] cursor-pointer"
        />
      </button>

      <div></div>

    </div>
  );
}

export default Navbar;