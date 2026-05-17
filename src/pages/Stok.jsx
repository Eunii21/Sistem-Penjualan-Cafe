import { Search, Plus } from "lucide-react";

const stokData = [
  {
    nama: "Kopi Hitam",
    stok: 10,
    status: "Tersedia",
  },
  {
    nama: "Americano",
    stok: 5,
    status: "Tersedia",
  },
  {
    nama: "Thai Tea",
    stok: 0,
    status: "Habis",
  },
];

function Stok() {
  return (
    <div className="px-4 md:px-8 py-6">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-abhaya text-[#2b1a17] mb-6">
        STOK
      </h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">

        {/* SEARCH */}
        <div className="relative w-full md:w-[350px]">
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

        {/* BUTTON */}
        <button
          className="
            flex items-center justify-center gap-2
            bg-[#5c3a32]
            text-white
            px-4 py-2.5
            rounded-lg
            hover:opacity-90
            transition
            w-full md:w-auto
          "
        >
          <Plus size={18} />
          Tambah stok
        </button>

      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">

        {stokData.map((item, index) => (
          <div
            key={index}
            className="bg-[#f4f1ee] rounded-2xl p-4 shadow-sm"
          >

            <div className="mb-3">
              <p className="text-xs text-gray-500">Nama Menu</p>
              <h3 className="font-medium text-[#3b1f1a]">
                {item.nama}
              </h3>
            </div>

            <div className="flex justify-between items-center mb-3">

              <div>
                <p className="text-xs text-gray-500">Stok</p>
                <p className="font-medium">{item.stok}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>

                <span
                  className={`
                    text-white text-xs px-3 py-1 rounded-md
                    ${
                      item.status === "Tersedia"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  `}
                >
                  {item.status}
                </span>
              </div>

            </div>

            <button className="w-full bg-[#5c3a32] text-white py-2 rounded-lg text-sm">
              Edit
            </button>

          </div>
        ))}

      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-[#f4f1ee] rounded-2xl shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gray-200 text-[#3b1f1a]">
              <tr>
                <th className="px-6 py-4 text-left">Nama Menu</th>
                <th className="px-6 py-4 text-center">Stok</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {stokData.map((item, index) => (
                <tr key={index} className="border-t">

                  {/* NAMA */}
                  <td className="px-6 py-5">
                    {item.nama}
                  </td>

                  {/* STOK */}
                  <td className="px-6 py-5 text-center">
                    {item.stok}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5 text-center">

                    <span
                      className={`
                        text-white px-4 py-1 rounded-md text-xs
                        ${
                          item.status === "Tersedia"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* AKSI */}
                  <td className="px-6 py-5 text-center">

                    <button className="bg-[#5c3a32] text-white px-4 py-1 rounded-md text-xs hover:opacity-90">
                      Edit
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Stok;