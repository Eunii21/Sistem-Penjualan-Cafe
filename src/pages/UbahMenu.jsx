import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UbahMenu() {

  const navigate = useNavigate();

  /* DATA DEFAULT */
  const [namaMenu, setNamaMenu] = useState("Kopi Susu");
  const [harga, setHarga] = useState("12000");

  // STATE GAMBAR
  const [preview, setPreview] = useState(null);

  // HANDLE GANTI GAMBAR
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className="
          fixed inset-0
          bg-black/20
          backdrop-blur-[3px]
          z-40
        "
      />

      {/* MODAL */}
      <div
        className="
          fixed inset-0
          z-50
          flex
          items-center
          justify-center
          p-3 md:p-6
        "
      >

        <div
          className="
            relative
            w-full
            max-w-2xl
            bg-[#f4f1ee]
            rounded-2xl
            shadow-2xl
            overflow-y-auto
            max-h-[95vh]
          "
        >

          {/* CLOSE */}
          <button
            onClick={() => navigate("/dashboard/menu")}
            className="
              absolute
              top-4
              right-4
              text-[#4b2a24]
              hover:opacity-70
              transition
            "
          >
            <X size={22} />
          </button>

          {/* TITLE */}
          <div className="pt-8 md:pt-10 text-center">

            <h1
              className="
                text-2xl
                md:text-4xl
                font-bold
                text-[#4b2a24]
              "
            >
              Ubah Menu
            </h1>

          </div>

          {/* FORM */}
          <div
            className="
              px-5
              md:px-14
              py-8
              md:py-10
            "
          >

            <div className="space-y-6">

              {/* NAMA MENU */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  gap-3 md:gap-5
                "
              >

                <label
                  className="
                    md:w-44
                    text-sm
                    md:text-base
                    font-semibold
                    text-[#4b2a24]
                  "
                >
                  Nama Menu
                </label>

                <input
                  type="text"
                  value={namaMenu}
                  onChange={(e) =>
                    setNamaMenu(e.target.value)
                  }
                  className="
                    flex-1
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2.5
                    rounded-md
                    outline-none
                    text-sm
                    md:text-base
                    focus:ring-2
                    focus:ring-[#5c3a32]
                  "
                />

              </div>

              {/* HARGA */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  gap-3 md:gap-5
                "
              >

                <label
                  className="
                    md:w-44
                    text-sm
                    md:text-base
                    font-semibold
                    text-[#4b2a24]
                  "
                >
                  Harga
                </label>

                <div className="relative w-full">

                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      text-sm
                    "
                  >
                    Rp
                  </span>

                  <input
                    type="text"
                    value={harga}
                    onChange={(e) =>
                      setHarga(e.target.value)
                    }
                    placeholder="Masukkan harga"
                    className="
                      w-full
                      border
                      border-gray-300
                      bg-white
                      pl-12
                      pr-4
                      py-2.5
                      rounded-md
                      outline-none
                      text-sm
                      md:text-base
                      focus:ring-2
                      focus:ring-[#5c3a32]
                    "
                  />

                </div>

              </div>

              {/* GANTI GAMBAR */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-3 md:gap-5
                "
              >

                <label
                  className="
                    md:w-44
                    text-sm
                    md:text-base
                    font-semibold
                    text-[#4b2a24]
                  "
                >
                  Gambar
                </label>

                <div className="flex-1">

                  <label
                    className="
                      border
                      border-gray-300
                      bg-gray-200
                      rounded-xl
                      h-44
                      md:h-52
                      w-full
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      overflow-hidden
                      hover:bg-gray-300
                      transition
                    "
                  >

                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    ) : (
                      <div className="text-center px-3">

                        <p
                          className="
                            text-[#4b2a24]
                            text-sm
                            md:text-base
                            font-medium
                          "
                        >
                          Klik untuk ganti gambar
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-600
                            mt-1
                          "
                        >
                          Format JPG, PNG (maks 2MB)
                        </p>

                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />

                  </label>

                </div>

              </div>

              {/* PREVIEW */}
              <div
                className="
                  bg-[#ebe6e1]
                  rounded-2xl
                  p-4 md:p-5
                  border
                "
              >

                <h3
                  className="
                    text-sm
                    md:text-base
                    font-semibold
                    text-[#4b2a24]
                    mb-4
                  "
                >
                  Preview Menu
                </h3>

                <div
                  className="
                    bg-white
                    rounded-2xl
                    p-4
                    shadow-sm
                  "
                >

                  {/* IMAGE */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="
                        w-full
                        h-40
                        md:h-52
                        object-cover
                        rounded-xl
                        mb-4
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-full
                        h-40
                        md:h-52
                        bg-gray-300
                        rounded-xl
                        mb-4
                      "
                    />
                  )}

                  {/* NAMA */}
                  <h2
                    className="
                      text-lg
                      md:text-xl
                      font-semibold
                      text-[#3b1f1a]
                    "
                  >
                    {namaMenu || "Nama menu"}
                  </h2>

                  {/* HARGA */}
                  <p
                    className="
                      text-gray-500
                      mt-1
                      text-sm
                      md:text-base
                    "
                  >
                    Rp {harga || "0"}
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <div
                className="
                  flex
                  justify-end
                  gap-3
                  pt-4
                "
              >

                <button
                  onClick={() =>
                    navigate("/dashboard/menu")
                  }
                  className="
                    px-5
                    md:px-6
                    py-2
                    rounded-md
                    border
                    border-gray-400
                    bg-white
                    hover:bg-gray-100
                    text-sm
                    md:text-base
                    transition
                  "
                >
                  Batal
                </button>

                <button
                  className="
                    px-5
                    md:px-6
                    py-2
                    rounded-md
                    bg-[#5c3a32]
                    hover:bg-[#3b1f1a]
                    text-white
                    text-sm
                    md:text-base
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

export default UbahMenu;