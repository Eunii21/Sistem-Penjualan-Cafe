import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabase";

export default function TambahMenu() {
  const navigate = useNavigate();

  const [namaMenu, setNamaMenu] = useState("");
  const [kategori, setKategori] = useState("1");

  const [hargaMakanan, setHargaMakanan] = useState("");
  const [hargaDingin, setHargaDingin] = useState("");
  const [hargaPanas, setHargaPanas] = useState("");

  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // UPLOAD GAMBAR
      if (gambar) {
        const fileExt = gambar.name.split(".").pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } =
          await supabase.storage
            .from("menu-gambar")
            .upload(fileName, gambar);

        if (uploadError) {
          console.log(uploadError);
          alert(uploadError.message);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("menu-gambar")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // INSERT DATABASE
      const { error } = await supabase
        .from("Menu")
        .insert([
          {
            nama_menu: namaMenu,

            Id_kategori: Number(kategori),

            harga_makanan:
              kategori === "1"
                ? Number(hargaMakanan)
                : null,

            harga_dingin:
              kategori === "2"
                ? Number(hargaDingin)
                : null,

            harga_panas:
              kategori === "2"
                ? Number(hargaPanas)
                : null,

            gambar: imageUrl,
          },
        ]);

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      alert("Menu berhasil ditambahkan");

      navigate("/dashboard/menu");
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        justify-center
        items-center
        z-50
        p-4
      "
    >
      {/* MODAL */}
      <div
        className="
          bg-white
          w-full
          max-w-[650px]
          rounded-md
          relative
          shadow-xl
          px-10
          py-8
        "
      >
        {/* CLOSE */}
        <button
          onClick={() =>
            navigate("/dashboard/menu")
          }
          className="absolute top-4 right-4"
        >
          <X size={20} />
        </button>

        {/* TITLE */}
        <h1
          className="
            text-center
            text-[34px]
            font-bold
            text-[#4B2E2B]
            mb-10
          "
        >
          Tambah Menu
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* NAMA MENU */}
            <div className="grid grid-cols-[150px_1fr] items-center gap-5">
              <label
                className="
                  text-[17px]
                  font-semibold
                  text-[#4B2E2B]
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
                required
                className="
                  border
                  border-gray-300
                  h-[38px]
                  px-3
                  outline-none
                  text-sm
                "
              />
            </div>

            {/* KATEGORI */}
            <div className="grid grid-cols-[150px_1fr] gap-5">
              <label
                className="
                  text-[17px]
                  font-semibold
                  text-[#4B2E2B]
                  pt-2
                "
              >
                Kategori
              </label>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    setKategori("1")
                  }
                  className={`
                    w-full
                    border
                    text-left
                    px-3
                    h-[38px]
                    text-sm
                    ${kategori === "1"
                      ? "bg-[#F3ECE5] border-[#4B2E2B]"
                      : "border-gray-300"
                    }
                  `}
                >
                  Makanan
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setKategori("2")
                  }
                  className={`
                    w-full
                    border
                    text-left
                    px-3
                    h-[38px]
                    text-sm
                    ${kategori === "2"
                      ? "bg-[#F3ECE5] border-[#4B2E2B]"
                      : "border-gray-300"
                    }
                  `}
                >
                  Minuman
                </button>
              </div>
            </div>

            {/* HARGA MAKANAN */}
            {kategori === "1" && (
              <div className="grid grid-cols-[150px_1fr] items-center gap-5">
                <label
                  className="
                    text-[17px]
                    font-semibold
                    text-[#4B2E2B]
                  "
                >
                  Harga Makanan
                </label>

                <div className="relative">
                  <span
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-sm
                    "
                  >
                    Rp
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={hargaMakanan}
                    onChange={(e) =>
                      setHargaMakanan(
                        e.target.value < 0
                          ? 0
                          : e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                    required
                    className="
                    border
                    border-gray-300
                    h-[38px]
                    w-full
                    pl-10
                    pr-3
                    outline-none
                    text-sm
                "
                  />
                </div>
              </div>
            )}

            {/* HARGA MINUMAN */}
            {kategori === "2" && (
              <>
                {/* PANAS */}
                <div className="grid grid-cols-[150px_1fr] gap-5">
                  <label
                    className="
                      text-[17px]
                      font-semibold
                      text-[#4B2E2B]
                      pt-2
                    "
                  >
                    Harga Minuman
                  </label>

                  <div>
                    <p className="text-sm mb-1">
                      Panas
                    </p>

                    <div className="relative">
                      <span
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-sm
                        "
                      >
                        Rp
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={hargaPanas}
                        onChange={(e) =>
                          setHargaPanas(
                            e.target.value < 0
                              ? 0
                              : e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                        required
                        className="
                        border
                        border-gray-300
                        h-[38px]
                        w-full
                        pl-10
                        pr-3
                        outline-none
                        text-sm
                    "
                      />
                    </div>

                    {/* DINGIN */}
                    <p className="text-sm mt-3 mb-1">
                      Dingin
                    </p>

                    <div className="relative">
                      <span
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-sm
                        "
                      >
                        Rp
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={hargaDingin}
                        onChange={(e) =>
                          setHargaDingin(
                            e.target.value < 0
                              ? 0
                              : e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                        required
                        className="
                            border
                            border-gray-300
                            h-[38px]
                            w-full
                            pl-10
                            pr-3
                            outline-none
                            text-sm
                        "
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* GAMBAR */}
            <div className="grid grid-cols-[150px_1fr] gap-5 pt-2">
              <div></div>

              <label
                className="
                  border
                  border-gray-300
                  bg-[#D9D9D9]
                  h-[120px]
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  cursor-pointer
                  overflow-hidden
                "
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setGambar(
                      e.target.files[0]
                    )
                  }
                />

                {gambar ? (
                  <img
                    src={URL.createObjectURL(gambar)}
                    alt="preview"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-[#4B2E2B]
                      "
                    >
                      Klik untuk upload gambar
                    </p>

                    <p className="text-[11px] text-gray-600 mt-1">
                      Format JPG, PNG (Maks 2MB)
                    </p>
                  </>
                )}
              </label>
            </div>

          </div>

          {/* BUTTON */}
          <div
            className="
              flex
              justify-end
              gap-3
              mt-8
            "
          >
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/menu")
              }
              className="
                border
                border-gray-400
                px-5
                py-2
                text-sm
                bg-white
              "
            >
              Batal
            </button>

            <button
              type="submit"
              className="
                bg-[#4B2E2B]
                text-white
                px-5
                py-2
                text-sm
              "
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}