import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

function TambahMenu() {

  const navigate = useNavigate();

  // STATE
  const [preview, setPreview] = useState(null);

  const [namaMenu, setNamaMenu] = useState("");

  const [kategori, setKategori] =
    useState("Makanan");

  const [hargaMakanan, setHargaMakanan] =
    useState("");

  const [hargaPanas, setHargaPanas] =
    useState("");

  const [hargaDingin, setHargaDingin] =
    useState("");

  const [gambarFile, setGambarFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // HANDLE IMAGE
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );

      setGambarFile(file);
    }
  };

  // SIMPAN DATA
  const handleSimpan = async () => {

    try {

      setLoading(true);

      let gambarUrl = "";

      // UPLOAD GAMBAR
      if (gambarFile) {

        const fileName =
          Date.now() + "-" + gambarFile.name;

        const { error: uploadError } =
          await supabase.storage
            .from("menu")
            .upload(fileName, gambarFile);

        if (uploadError) {

          alert("Upload gambar gagal");

          console.log(uploadError);

          return;
        }

        const { data } =
          supabase.storage
            .from("menu")
            .getPublicUrl(fileName);

        gambarUrl = data.publicUrl;
      }

      // SIMPAN DATABASE
      const { error } =
        await supabase
          .from("menu")
          .insert([
            {
              nama_menu: namaMenu,

              kategori: kategori,

              harga_makanan:
                kategori === "Makanan"
                  ? hargaMakanan
                  : null,

              harga_panas:
                kategori === "Minuman"
                  ? hargaPanas
                  : null,

              harga_dingin:
                kategori === "Minuman"
                  ? hargaDingin
                  : null,

              gambar: gambarUrl,
            },
          ]);

      if (error) {

        console.log(error);

        alert("Data gagal disimpan");

      } else {

        alert("Menu berhasil ditambahkan");

        navigate("/dashboard/menu");
      }

    } catch (err) {

      console.log(err);

      alert("Terjadi kesalahan");

    } finally {

      setLoading(false);
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
            onClick={() =>
              navigate("/dashboard/menu")
            }
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
              Tambah Menu
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
                  placeholder="Masukkan nama menu"
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

              {/* KATEGORI */}
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
                  Kategori
                </label>

                <select
                  value={kategori}
                  onChange={(e) =>
                    setKategori(e.target.value)
                  }
                  className="
                    w-full
                    md:w-[220px]
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
                >

                  <option value="Makanan">
                    Makanan
                  </option>

                  <option value="Minuman">
                    Minuman
                  </option>

                </select>

              </div>

              {/* HARGA MAKANAN */}
              {kategori === "Makanan" && (

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
                    Harga Makanan
                  </label>

                  <div className="relative w-full md:w-[220px]">

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
                      value={hargaMakanan}
                      onChange={(e) =>
                        setHargaMakanan(
                          e.target.value
                        )
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
              )}

              {/* HARGA MINUMAN */}
              {kategori === "Minuman" && (

                <div className="space-y-5">

                  {/* PANAS */}
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
                      Harga Minuman
                    </label>

                    <div className="w-full md:w-[220px]">

                      <p
                        className="
                          text-sm
                          text-[#4b2a24]
                          mb-2
                        "
                      >
                        Panas
                      </p>

                      <div className="relative">

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
                          value={hargaPanas}
                          onChange={(e) =>
                            setHargaPanas(
                              e.target.value
                            )
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

                  </div>

                  {/* DINGIN */}
                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      gap-3 md:gap-5
                    "
                  >

                    <label className="md:w-44"></label>

                    <div className="w-full md:w-[220px]">

                      <p
                        className="
                          text-sm
                          text-[#4b2a24]
                          mb-2
                        "
                      >
                        Dingin
                      </p>

                      <div className="relative">

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
                          value={hargaDingin}
                          onChange={(e) =>
                            setHargaDingin(
                              e.target.value
                            )
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

                  </div>

                </div>
              )}

              {/* GAMBAR */}
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
                      rounded-md
                      h-36 md:h-40
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
                          Klik untuk upload gambar
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
                  onClick={handleSimpan}
                  disabled={loading}
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
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Menyimpan..."
                    : "Simpan"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default TambahMenu;