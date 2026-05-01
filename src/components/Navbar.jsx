import { Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#d6ccc2] shadow">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          <Menu size={26} className="text-[#3b1f1a]" />
        </button>

        <h1 className="text-xl font-abhaya">DASHBOARD</h1>
      </div>
    </div>
  );
}

export default Navbar;