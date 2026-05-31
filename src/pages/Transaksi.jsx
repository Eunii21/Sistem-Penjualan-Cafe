import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../database/supabase";

export default function Transaksi() {
  const navigate = useNavigate();
  const location = useLocation();

  const [namaPemesan, setNamaPemesan] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const biayaLayanan = 0;

  // AMBIL DATA DARI HALAMAN MENU
  useEffect(() => {
    if (location.state?.cart) {
      setCartItems(location.state.cart);
    }
  }, [location.state]);

  // TAMBAH JUMLAH
  function tambahJumlah(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            jumlah: item.jumlah + 1,
          }
          : item
      )
    );
  }

  // KURANG JUMLAH
  function kurangJumlah(id) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
              ...item,
              jumlah: item.jumlah - 1,
            }
            : item
        )
        .filter((item) => item.jumlah > 0)
    );
  }

  // HAPUS ITEM
  function hapusItem(id) {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // HITUNG SUBTOTAL
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.harga * item.jumlah,
    0
  );

  // HITUNG TOTAL
  const total = subtotal;

  // FORMAT RUPIAH
  function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
  }

  // SIMPAN PESANAN
  async function simpanPesanan() {
    try {

      // VALIDASI
      if (!namaPemesan) {
        alert("Nama pemesan wajib diisi");
        return;
      }

      if (cartItems.length === 0) {
        alert("Keranjang kosong");
        return;
      }

      // =====================================
      // INSERT PESANAN
      // =====================================
      const { data: pesananBaru, error: errorPesanan } =
        await supabase
          .from("Pesanan")
          .insert([
            {
              id_pengguna: 1,
              tanggal: new Date().toISOString(),
              total_harga: total,
            },
          ])
          .select()
          .single();

      if (errorPesanan) {
        console.log("ERROR PESANAN:", errorPesanan);
        alert("Gagal menyimpan pesanan");
        return;
      }

      // =====================================
      // INSERT DETAIL PESANAN
      // =====================================
      const detailPesanan = cartItems.map((item) => ({
        id_pesanan: pesananBaru.id,
        id_menu: item.id,
        jumlah: item.jumlah,
        subtotal: item.harga * item.jumlah,
      }));

      const { error: errorDetail } = await supabase
        .from("Detail_Pesanan")
        .insert(detailPesanan);

      if (errorDetail) {
        console.log("ERROR DETAIL:", errorDetail);
        alert("Gagal menyimpan detail pesanan");
        return;
      }

      // =====================================
      // KURANGI STOK SETELAH TRANSAKSI
      // =====================================
      for (const item of cartItems) {

        console.log("ITEM CART:", item);

        const { data: stokLama, error: errorGet } = await supabase
          .from("Stok")
          .select("jumlah")
          .eq("nama_menu", item.nama_menu)
          .single();

        if (errorGet) {
          console.log("ERROR AMBIL STOK:", errorGet);
          continue;
        }

        const stokBaru = (stokLama.jumlah || 0) - item.jumlah;

        const { error: errorUpdate } = await supabase
          .from("Stok")
          .update({
            jumlah: stokBaru < 0 ? 0 : stokBaru
          })
          .eq("nama_menu", item.nama_menu);

        if (errorUpdate) {
          console.log("ERROR UPDATE STOK:", errorUpdate);
        }
      }

      // =====================================
      // BUAT NOMOR PESANAN BERURUT
      // =====================================
      const { data: riwayatTerakhir, error: errorNomor } =
        await supabase
          .from("Riwayat")
          .select("no_pesanan")
          .order("no_pesanan", { ascending: false })
          .limit(1);

      if (errorNomor) {
        console.log("ERROR NOMOR:", errorNomor);
        alert("Gagal membuat nomor pesanan");
        return;
      }

      let nomorUrut = 1;

      if (
        riwayatTerakhir &&
        riwayatTerakhir.length > 0
      ) {

        // AMBIL ANGKA DARI P0001
        const nomorLama = parseInt(
          riwayatTerakhir[0].no_pesanan.replace("P", "")
        );

        nomorUrut = nomorLama + 1;
      }

      // FORMAT NOMOR PESANAN
      const noPesanan = `P${String(
        nomorUrut
      ).padStart(4, "0")}`;

      // =====================================
      // INSERT RIWAYAT
      // =====================================
      const { error: errorRiwayat } = await supabase
        .from("Riwayat")
        .insert([
          {
            id_pesanan: pesananBaru.id,
            no_pesanan: noPesanan,
            nama_pemesan: namaPemesan,
            total_harga: total,
            tanggal: new Date().toLocaleString("sv-SE", {
              timeZone: "Asia/Makassar"
            }),
          },
        ])

      if (errorRiwayat) {
        console.log("ERROR RIWAYAT:", errorRiwayat);
        alert("Gagal menyimpan riwayat");
        return;
      }

      // =====================================
      // BERHASIL
      // =====================================
      alert("Pesanan berhasil disimpan!");

      navigate("/dashboard/riwayat");

    } catch (err) {
      console.log("ERROR FINAL:", err);
      alert("Gagal menyimpan pesanan");
    }
  }

  return (
    <div className="min-h-screen bg-[#f4ece1] p-4 md:p-6 text-[#36211d]">
      <div className="mb-6 border-b border-[#dac2b1] pb-4">
        <h1 className="font-serif text-2xl md:text-3xl font-bold uppercase">
          TRANSAKSI
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col bg-[#fdfbf7] rounded-xl border border-[#dac2b1] shadow-sm overflow-hidden">
          <div className="bg-[#dac2b1]/40 px-4 py-3">
            <h2 className="font-semibold text-lg">
              Detail Pesanan
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6 flex justify-between gap-4">
              <div>

                <h3 className="text-3xl font-black">
                  Keranjang
                </h3>
              </div>

              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  value={namaPemesan}
                  onChange={(e) =>
                    setNamaPemesan(e.target.value)
                  }
                  placeholder="Nama Pemesan"
                  className="w-full border border-[#dac2b1] rounded-lg px-3 py-2 bg-white text-[#36211d] outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-[#dac2b1]/40">
              {cartItems.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  Keranjang belanja kosong.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.gambar ||
                          "https://via.placeholder.com/150?text=No+Image"
                        }
                        alt={item.nama_menu}
                        className="w-16 h-16 rounded-lg object-cover border border-[#dac2b1]"
                      />

                      <div>
                        <h4 className="font-bold">
                          {item.nama_menu}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {formatRupiah(item.harga)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#dac2b1] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            kurangJumlah(item.id)
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-3 font-semibold text-sm">
                          {item.jumlah}
                        </span>

                        <button
                          onClick={() =>
                            tambahJumlah(item.id)
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          hapusItem(item.id)
                        }
                        className="text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-[#dac2b1] p-5 shadow-sm">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>

              <span className="font-semibold">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <div className="border-t border-[#dac2b1] my-4"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span className="text-[#1e6f43]">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={simpanPesanan}
              disabled={cartItems.length === 0}
              className="w-full bg-[#1e6f43] hover:bg-[#175634] text-white py-3 rounded-xl font-bold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Simpan & Konfirmasi Pesanan
            </button>

            <button
              onClick={() =>
                navigate("/dashboard/menu", {
                  state: {
                    pesanan: Object.fromEntries(
                      cartItems.map((item) => [
                        item.id,
                        {
                          jumlah: item.jumlah,
                          varian: item.varian,
                          harga_terpilih: item.harga,
                        },
                      ])
                    ),
                  },
                })
              }
              className="w-full border border-red-700 text-red-700 hover:bg-red-50 py-3 rounded-xl font-bold transition-colors"
            >
              Kembali Ke Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}