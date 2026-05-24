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

      // =========================
      // UPLOAD GAMBAR OPTIONAL
      // =========================
      if (gambar) {
        const fileExt = gambar.name.split(".").pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
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

      // =========================
      // INSERT DATABASE
      // =========================
      const { error } = await supabase.from("Menu").insert([
        {
          nama_menu: namaMenu,

          // SESUAI DATABASE KAMU
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5 overflow-y-auto">
      <div className="bg-[#F6F1EB] w-full max-w-6xl rounded-3xl p-10 relative">
        {/* CLOSE */}
        <button
          onClick={() => navigate("/dashboard/menu")}
          className="absolute top-6 right-6"
        >
          <X size={30} />
        </button>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-center text-[#4B2E2B] mb-14">
          Tambah Menu
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* LEFT */}
            <div className="space-y-8">
              {/* NAMA MENU */}
              <div>
                <label className="block text-2xl font-semibold mb-3">
                  Nama Menu
                </label>

                <input
                  type="text"
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                  required
                  className="w-full border-2 border-[#4B2E2B] rounded-2xl px-5 py-4 text-xl bg-white"
                />
              </div>

              {/* KATEGORI */}
              <div>
                <label className="block text-2xl font-semibold mb-3">
                  Kategori
                </label>

                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full border-2 border-[#4B2E2B] rounded-2xl px-5 py-4 text-xl bg-white"
                >
                  <option value="1">Makanan</option>
                  <option value="2">Minuman</option>
                </select>
              </div>

              {/* HARGA MAKANAN */}
              {kategori === "1" && (
                <div>
                  <label className="block text-2xl font-semibold mb-3">
                    Harga Makanan
                  </label>

                  <input
                    type="number"
                    value={hargaMakanan}
                    onChange={(e) =>
                      setHargaMakanan(e.target.value)
                    }
                    required
                    className="w-full border-2 border-[#4B2E2B] rounded-2xl px-5 py-4 text-xl bg-white"
                  />
                </div>
              )}

              {/* HARGA MINUMAN */}
              {kategori === "2" && (
                <>
                  <div>
                    <label className="block text-2xl font-semibold mb-3">
                      Harga Dingin
                    </label>

                    <input
                      type="number"
                      value={hargaDingin}
                      onChange={(e) =>
                        setHargaDingin(e.target.value)
                      }
                      required
                      className="w-full border-2 border-[#4B2E2B] rounded-2xl px-5 py-4 text-xl bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl font-semibold mb-3">
                      Harga Panas
                    </label>

                    <input
                      type="number"
                      value={hargaPanas}
                      onChange={(e) =>
                        setHargaPanas(e.target.value)
                      }
                      required
                      className="w-full border-2 border-[#4B2E2B] rounded-2xl px-5 py-4 text-xl bg-white"
                    />
                  </div>
                </>
              )}
            </div>

            {/* RIGHT */}
            <div>
              <label className="block text-2xl font-semibold mb-3">
                Gambar
              </label>

              <label className="border-2 border-dashed border-[#4B2E2B] rounded-3xl h-[420px] flex flex-col items-center justify-center cursor-pointer bg-white overflow-hidden">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setGambar(e.target.files[0])
                  }
                />

                {gambar ? (
                  <img
                    src={URL.createObjectURL(gambar)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <p className="text-4xl font-semibold text-center text-[#4B2E2B]">
                      Klik untuk upload gambar
                    </p>

                    <p className="mt-4 text-xl text-gray-500">
                      JPG / PNG maksimal 2MB
                    </p>

                    <p className="mt-3 text-lg text-gray-400">
                      Gambar tidak wajib
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-5 mt-14">
            <button
              type="button"
              onClick={() => navigate("/dashboard/menu")}
              className="border-2 border-[#4B2E2B] px-10 py-4 rounded-2xl text-xl"
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-[#4B2E2B] text-white px-10 py-4 rounded-2xl text-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}