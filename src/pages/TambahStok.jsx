import { X } from "lucide-react";
import { Link } from "react-router-dom";

function TambahStok() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 py-6">

      {/* MODAL */}
      <div className="bg-[#f4f1ee] w-full max-w-[750px] rounded-2xl shadow-xl relative">

        {/* CLOSE BUTTON */}
        <Link
          to="/dashboard/stok"
          className="absolute top-5 right-5"
        >
          <X size={24} className="text-black" />
        </Link>

        {/* CONTENT */}
        <div className="px-6 md:px-12 py-10">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center text-[#5c3a32] mb-10">
            Tambah Stok
          </h1>

          {/* FORM */}
          <div className="space-y-7">

            {/* NAMA MENU */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">

              <label className="w-[140px] text-[#5c3a32] font-semibold">
                Nama Menu
              </label>

              <input
                type="text"
                placeholder="Masukkan nama menu"
                className="
                  flex-1
                  border
                  border-gray-300
                  rounded-md
                  px-4
                  py-2
                  outline-none
                  focus:border-[#5c3a32]
                "
              />

            </div>

            {/* STOK */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">

              <label className="w-[140px] text-[#5c3a32] font-semibold">
                Stok
              </label>

              <input
                type="number"
                placeholder="Masukkan jumlah stok"
                className="
                  flex-1
                  border
                  border-gray-300
                  rounded-md
                  px-4
                  py-2
                  outline-none
                  focus:border-[#5c3a32]
                "
              />

            </div>

           

          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 mt-12">

            <Link
              to="/dashboard/stok"
              className="
                px-5 py-2
                border
                rounded-md
                text-sm
                hover:bg-gray-100
              "
            >
              Batal
            </Link>

            <button
              className="
                px-5 py-2
                bg-[#5c3a32]
                text-white
                rounded-md
                text-sm
                hover:opacity-90
              "
            >
              Simpan
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TambahStok;