import {
  Home,
  DollarSign,
  Menu as MenuIcon,
  ShoppingCart,
  X
} from "lucide-react";

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          bg-[#5c3a32] text-white z-50 transition-all duration-300

          /* MOBILE */
          fixed top-0 left-0 w-64 h-screen
          ${open ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP */
          md:static
          md:translate-x-0
          md:w-64
          md:h-auto
          md:min-h-screen
          md:overflow-y-auto
        `}
      >

        {/* HEADER */}
        <div className="p-4 border-b border-[#3b1f1a] flex justify-between items-center">
          <h1 className="font-abhaya text-lg">Mesombang Cafe</h1>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <ul className="mt-4 space-y-2 px-2">
          <Item icon={<Home />} text="Dashboard" />
          <Item icon={<DollarSign />} text="Transaksi" />
          <Item icon={<MenuIcon />} text="Menu" />
          <Item icon={<ShoppingCart />} text="Stok" />
        </ul>

      </aside>
    </>
  );
}

function Item({ icon, text }) {
  return (
    <li className="flex items-center gap-3 p-2 hover:bg-[#3b1f1a] rounded cursor-pointer">
      {icon}
      <span>{text}</span>
    </li>
  );
}

export default Sidebar;