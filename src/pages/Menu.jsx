import { Search } from "lucide-react";

const menuData = [
  { name: "Kopi Hitam", price: "Rp 10.000" },
  { name: "Kopi susu", price: "Rp 12.000" },
  { name: "Tubruk Hitam", price: "Rp 10.000" },
  { name: "Tubruk susu", price: "Rp 14.000" },
  { name: "Americano", price: "Rp 15.000" },

  { name: "Vietnam Drip", price: "Rp 10.000" },
  { name: "Gula Aren", price: "Rp 15.000" },
  { name: "Teh Manis", price: "Rp 8.000" },
  { name: "Leci (Teh)", price: "Rp 12.000" },
  { name: "Vanilla (Teh)", price: "Rp 12.000" },

  { name: "Mango (Teh)", price: "Rp 12.000" },
  { name: "Lemon Tea", price: "Rp 10.000" },
  { name: "Thai Tea", price: "Rp 15.000" },
  { name: "Leci (Susu)", price: "Rp 12.000" },
  { name: "Mango (Susu)", price: "Rp 16.000" },

  { name: "Strawberry (Susu)", price: "Rp 16.000" },
  { name: "Vanilla (Susu)", price: "Rp 15.000" },
  { name: "Red Velvet (Susu)", price: "Rp 15.000" },
  { name: "Green Tea (Susu)", price: "Rp 15.000" },
  { name: "Taro (Susu)", price: "Rp 15.000" },

  { name: "Chocolate (Susu)", price: "Rp 15.000" },
  { name: "Vanilla Oreo (Susu)", price: "Rp 18.000" },
  { name: "Cappucino Oreo", price: "Rp 18.000" },
  { name: "Avocado", price: "Rp 16.000" },
  { name: "Roti Manis", price: "Rp 8.000" },
];

function Menu() {
  return (
    <div className="px-4 md:px-8 py-6">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-abhaya text-[#2b1a17] mb-6">
        MENU
      </h1>

      {/* SEARCH */}
      <div className="relative mb-8 w-full md:w-[400px]">
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

        {menuData.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#f4f1ee]
              rounded-2xl
              p-3
              shadow-sm
              hover:shadow-md
              transition
            "
          >

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