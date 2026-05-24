import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UbahStok() {

  const navigate = useNavigate();

  return (
    <>
      {/* OVERLAY */}
      <div
        className="
          fixed inset-0
          bg-black/30
          backdrop-blur-sm
          z-40
        "
      />

      {/* MODAL WRAPPER */}
      <div
        className="
          fixed inset-0
          z-50
          flex
          items-center
          justify-center
          p-3 sm:p-4
        "
      >

        {/* MODAL */}
        <div
          className="
            bg-[#f4f1ee]
            w-full
            max-w-2xl
            rounded-2xl
            shadow-2xl
            relative

            max-h-[95vh]
            overflow-y-auto
          "
        >

          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate("/dashboard/stok")}
            className="
              absolute
              top-4
              right-4
              hover:opacity-70
            "
          >
            <X size={24} />
          </button>

          {/* HEADER */}
          <div className="pt-8 md:pt-10 text-center">

            <h1
              className="
                text-2xl
                md:text-4xl
                font-bold
                text-[#4b2a24]
              "
            >
              Ubah Stok
            </h1>

          </div>

          {/* FORM */}
          <div
            className="
              px-5
              sm:px-8
              md:px-14
              py-8
            "
          >

            <div className="space-y-6 md:space-y-8">

              {/* NAMA MENU */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-2
                  md:gap-4
                "
              >

                <label
                  className="
                    md:w-40
                    text-[#4b2a24]
                    font-semibold
                    pt-2
                  "
                >
                  Nama Menu
                </label>

                <input
                  type="text"
                  defaultValue="Kopi Hitam"
                  className="
                    flex-1
                    border
                    border-gray-300
                    rounded-md
                    px-4
                    py-3
                    outline-none
                    bg-white
                    focus:ring-2
                    focus:ring-[#5c3a32]
                  "
                />

              </div>

              {/* STOK */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-2
                  md:gap-4
                "
              >

                <label
                  className="
                    md:w-40
                    text-[#4b2a24]
                    font-semibold
                    pt-2
                  "
                >
                  Jumlah Stok
                </label>

                <input
                  type="number"
                  defaultValue="10"
                  className="
                    flex-1
                    border
                    border-gray-300
                    rounded-md
                    px-4
                    py-3
                    outline-none
                    bg-white
                    focus:ring-2
                    focus:ring-[#5c3a32]
                  "
                />

              </div>

              {/* STATUS */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-2
                  md:gap-4
                "
              >

                <label
                  className="
                    md:w-40
                    text-[#4b2a24]
                    font-semibold
                    pt-2
                  "
                >
                  Status
                </label>

                <select
                  className="
                    flex-1
                    border
                    border-gray-300
                    rounded-md
                    px-4
                    py-3
                    outline-none
                    bg-white
                    focus:ring-2
                    focus:ring-[#5c3a32]
                  "
                  defaultValue="Tersedia"
                >
                  <option value="Tersedia">
                    Tersedia
                  </option>

                  <option value="Habis">
                    Habis
                  </option>

                </select>

              </div>

              {/* BUTTON */}
              <div
                className="
                  flex
                  flex-col-reverse
                  sm:flex-row
                  justify-end
                  gap-3
                  pt-2
                "
              >

                <button
                  onClick={() => navigate("/dashboard/stok")}
                  className="
                    w-full
                    sm:w-auto
                    px-5
                    py-3
                    rounded-md
                    bg-gray-300
                    hover:bg-gray-400
                    transition
                  "
                >
                  Batal
                </button>

                <button
                  className="
                    w-full
                    sm:w-auto
                    px-5
                    py-3
                    rounded-md
                    bg-[#5c3a32]
                    hover:bg-[#3b1f1a]
                    text-white
                    transition
                  "
                >
                  Simpan Perubahan
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default UbahStok;