import {
  Home,
  DollarSign,
  Menu as MenuIcon,
  ShoppingCart,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ open, setOpen }) {

  const menus = [
    {
      text: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      text: "Transaksi",
      icon: <DollarSign size={20} />,
      path: "/dashboard/transaksi",
    },
    {
      text: "Menu",
      icon: <MenuIcon size={20} />,
      path: "/dashboard/menu",
    },
    {
      text: "Stok",
      icon: <ShoppingCart size={20} />,
      path: "/dashboard/stok",
    },
  ];

  return (
    <>
      {/* ================= MOBILE ================= */}

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#5c3a32]
          text-white
          transition-transform duration-300

          md:hidden

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="p-4 border-b border-[#3b1f1a] flex justify-between items-center">
          <h1 className="font-abhaya text-lg">
            Mesombang Cafe
          </h1>

          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <ul className="mt-4 px-2 space-y-2">

          {menus.map((item, index) => (
            <MenuItem
              key={index}
              to={item.path}
              icon={item.icon}
              text={item.text}
              mobile
              setOpen={setOpen}
            />
          ))}

        </ul>

      </aside>

      {/* ================= DESKTOP ================= */}

      <aside
        className={`
          hidden md:flex
          fixed top-0 left-0
          flex-col
          bg-[#5c3a32]
          text-white
          h-screen
          transition-all duration-300
          overflow-hidden
          z-40

          ${open ? "w-64" : "w-20"}
        `}
      >

        {/* HEADER */}
        <div className="p-4 border-b border-[#3b1f1a] h-[73px] flex items-center">

          {open ? (
            <h1 className="font-abhaya text-lg whitespace-nowrap">
              Mesombang Cafe
            </h1>
          ) : (
            <div className="w-full flex justify-center text-lg">
              ☕
            </div>
          )}

        </div>

        {/* MENU */}
        <ul className="mt-4 px-2 space-y-2">

          {menus.map((item, index) => (
            <MenuItem
              key={index}
              to={item.path}
              icon={item.icon}
              text={open ? item.text : ""}
            />
          ))}

        </ul>

      </aside>
    </>
  );
}

function MenuItem({
  to,
  icon,
  text,
  mobile = false,
  setOpen
}) {

  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      onClick={() => {
        if (mobile) {
          setOpen(false);
        }
      }}
      className={({ isActive }) =>
        `
          flex items-center gap-3
          p-3 rounded-lg
          transition-all duration-200
          whitespace-nowrap

          ${
            isActive
              ? "bg-[#3b1f1a]"
              : "hover:bg-[#3b1f1a]"
          }
        `
      }
    >
      <div className="min-w-[20px]">
        {icon}
      </div>

      {text && (
        <span>{text}</span>
      )}
    </NavLink>
  );
}

export default Sidebar;