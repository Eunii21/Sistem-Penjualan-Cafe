import { Search, MoreVertical, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuData = [
  { name: "Kopi Hitam", price: "Rp 10.000", category: "Minuman" },
  { name: "Kopi susu", price: "Rp 12.000", category: "Minuman" },
  { name: "Tubruk Hitam", price: "Rp 10.000", category: "Minuman" },
  { name: "Tubruk susu", price: "Rp 14.000", category: "Minuman" },
  { name: "Americano", price: "Rp 15.000", category: "Minuman" },

  { name: "Vietnam Drip", price: "Rp 10.000", category: "Minuman" },
  { name: "Gula Aren", price: "Rp 15.000", category: "Minuman" },
  { name: "Teh Manis", price: "Rp 8.000", category: "Minuman" },
  { name: "Leci (Teh)", price: "Rp 12.000", category: "Minuman" },
  { name: "Vanilla (Teh)", price: "Rp 12.000", category: "Minuman" },

  { name: "Mango (Teh)", price: "Rp 12.000", category: "Minuman" },
  { name: "Lemon Tea", price: "Rp 10.000", category: "Minuman" },
  { name: "Thai Tea", price: "Rp 15.000", category: "Minuman" },
  { name: "Leci (Susu)", price: "Rp 12.000", category: "Minuman" },
  { name: "Mango (Susu)", price: "Rp 16.000", category: "Minuman" },

  { name: "Strawberry (Susu)", price: "Rp 16.000", category: "Minuman" },
  { name: "Vanilla (Susu)", price: "Rp 15.000", category: "Minuman" },
  { name: "Red Velvet (Susu)", price: "Rp 15.000", category: "Minuman" },
  { name: "Green Tea (Susu)", price: "Rp 15.000", category: "Minuman" },
  { name: "Taro (Susu)", price: "Rp 15.000", category: "Minuman" },

  { name: "Chocolate (Susu)", price: "Rp 15.000", category: "Minuman" },
  { name: "Vanilla Oreo (Susu)", price: "Rp 18.000", category: "Minuman" },
  { name: "Cappucino Oreo", price: "Rp 18.000", category: "Minuman" },
  { name: "Avocado", price: "Rp 16.000", category: "Minuman" },

  { name: "Roti Manis", price: "Rp 8.000", category: "Makanan" },
];

function Menu() {
  const [openMenu, setOpenMenu] = useState(null);

  // KATEGORI
  const [openKategori, setOpenKategori] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState("Kategori");

  const navigate = useNavigate();

  // FILTER MENU
  const filteredMenu =
    selectedKategori === "Kategori"
      ? menuData
      : menuData.filter(
          (item) => item.category === selectedKategori
        );

  return (
    <div className="px-4 md:px-8 py-6">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-abhaya text-[#2b1a17] mb-6">
        MENU
      </h1>

      {/* SEARCH + BUTTON */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        {/* SEARCH */}
        <div className="relative w-full md:w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Cari menu..."
            className="
              w-full
              pl-10
              pr-4
              py-2.5
              rounded-lg
              bg-[#f4f1ee]
              outline-none
              text-sm
              shadow-sm
            "
          />
        </div>

        {/* BUTTON AREA */}
        <div className="flex items-center gap-3 relative">

          {/* BUTTON TAMBAH MENU */}
          <button
            className="
              bg-[#4b2a24]
              hover:bg-[#3b1f1a]
              text-white
              text-sm
              px-5
              py-2.5
              rounded-lg
              transition
              shadow-sm
              whitespace-nowrap
            "
            onClick={() => navigate("/dashboard/tambah-menu")}
          >
            + Tambah menu
          </button>

          {/* BUTTON KATEGORI */}
          <div className="relative">

            <button
              onClick={() => setOpenKategori(!openKategori)}
              className="
                flex
                items-center
                gap-2
                bg-[#4b2a24]
                hover:bg-[#3b1f1a]
                text-white
                text-sm
                px-4
                py-2.5
                rounded-lg
                transition
                shadow-sm
              "
            >
              {selectedKategori}
              <ChevronDown size={16} />
            </button>

            {/* DROPDOWN */}
            {openKategori && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-40
                  bg-white
                  rounded-lg
                  shadow-lg
                  border
                  overflow-hidden
                  z-50
                "
              >

                <button
                  onClick={() => {
                    setSelectedKategori("Kategori");
                    setOpenKategori(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-2
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  Kategori
                </button>

                <button
                  onClick={() => {
                    setSelectedKategori("Makanan");
                    setOpenKategori(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-2
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  Makanan
                </button>

                <button
                  onClick={() => {
                    setSelectedKategori("Minuman");
                    setOpenKategori(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-2
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  Minuman
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* GRID MENU */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5
        "
      >

        {filteredMenu.map((item, index) => (
          <div
            key={index}
            className="
              relative
              bg-[#f4f1ee]
              rounded-2xl
              p-3
              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* TITIK TIGA */}
            <div className="absolute top-3 right-3">

              <button
                onClick={() =>
                  setOpenMenu(openMenu === index ? null : index)
                }
                className="
                  p-1
                  rounded-full
                  hover:bg-gray-200
                  transition
                "
              >
                <MoreVertical size={18} className="text-[#3b1f1a]" />
              </button>

              {/* DROPDOWN */}
              {openMenu === index && (
                <div
                  className="
                    absolute
                    right-0
                    mt-2
                    w-28
                    bg-white
                    rounded-lg
                    shadow-lg
                    border
                    z-50
                    overflow-hidden
                  "
                >

                  <button
                    onClick={() => navigate("/dashboard/ubah-menu")}
                    className="
                      w-full
                      text-left
                      px-4
                      py-2
                      text-sm
                      hover:bg-gray-100
                      transition
                    "
                  >
                    Ubah
                  </button>

                  <button
                    className="
                      w-full
                      text-left
                      px-4
                      py-2
                      text-sm
                      text-red-500
                      hover:bg-red-50
                      transition
                    "
                  >
                    Hapus
                  </button>

                </div>
              )}

            </div>

            {/* IMAGE */}
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-3"></div>

            {/* NAME */}
            <h3 className="text-sm md:text-base font-medium text-[#3b1f1a]">
              {item.name}
            </h3>

            {/* PRICE */}
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {item.price}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Menu;