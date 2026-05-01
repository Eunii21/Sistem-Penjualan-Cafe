import { Home, DollarSign, Menu as MenuIcon, ShoppingCart } from "lucide-react";

function Sidebar({ open }) {
  return (
   <div
  className={`fixed top-0 left-0 h-screen bg-[#5c3a32] text-white transition-all duration-300 z-50 ${
    open ? "w-64" : "w-16"
  }`}
>
      {/* Logo */}
      <div className="p-4 border-b border-[#3b1f1a]">
        {open ? (
          <h1 className="font-abhaya text-lg">Mesombang Cafe</h1>
        ) : (
          <span className="text-center block">☕</span>
        )}
      </div>

      {/* Menu */}
      <ul className="mt-4 space-y-3 px-2">
        <li className="flex items-center gap-3 p-2 hover:bg-[#3b1f1a] rounded cursor-pointer">
          <Home />
          {open && <span>Dashboard</span>}
        </li>

        <li className="flex items-center gap-3 p-2 hover:bg-[#3b1f1a] rounded cursor-pointer">
          <DollarSign />
          {open && <span>Transaksi</span>}
        </li>

        <li className="flex items-center gap-3 p-2 hover:bg-[#3b1f1a] rounded cursor-pointer">
          <MenuIcon />
          {open && <span>Menu</span>}
        </li>

        <li className="flex items-center gap-3 p-2 hover:bg-[#3b1f1a] rounded cursor-pointer">
          <ShoppingCart />
          {open && <span>Stok</span>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;