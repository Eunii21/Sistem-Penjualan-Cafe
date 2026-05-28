import { useState } from "react";
import { Plus, Minus, X } from "lucide-react";

export default function Transaksi() {
  // State untuk Nama Pemesan (Sekarang bisa di-input)
  const [namaPemesan, setNamaPemesan] = useState("Andi Pratama");

  // State untuk data produk di keranjang belanja
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nama: "Kopi Gula Aren",
      harga: 68500,
      jumlah: 1,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      nama: "Croissant Keju",
      harga: 15000,
      jumlah: 1,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      nama: "Pasta Carbonara",
      harga: 25000,
      jumlah: 1,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      nama: "Hajus Kaitran",
      harga: 10000,
      jumlah: 1,
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ]);

  // Biaya Layanan Statis sesuai Gambar
  const biayaLayanan = 20000;

  // Fungsi Tambah Jumlah
  const tambahJumlah = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
    ));
  };

  // Fungsi Kurang Jumlah
  const kurangJumlah = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.jumlah > 1 ? { ...item, jumlah: item.jumlah - 1 } : item
    ));
  };

  // Fungsi Hapus Item dari Keranjang
  const hapusItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Hitung Subtotal Dinamis
  const subtotal = cartItems.reduce((acc, item) => acc + (item.harga * item.jumlah), 0);
  const total = subtotal + biayaLayanan;

  // Format Mata Uang Rupiah
  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-[#f4ece1] p-4 md:p-6 text-[#36211d]">

      {/* HEADER UTAMA */}
      <div className="mb-6 border-b border-[#dac2b1] pb-4">
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wide uppercase">
          Keranjang Belanja - Edit Pesanan
        </h1>
      </div>

      {/* GRID KONTEN UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* KOLOM KIRI: DETAIL PESANAN */}
        <div className="lg:col-span-2 flex flex-col bg-[#fdfbf7] rounded-xl border border-[#dac2b1] shadow-sm overflow-hidden">
          {/* Sub Header Detail Pesanan */}
          <div className="bg-[#dac2b1]/40 px-4 py-3 border-b border-[#dac2b1]">
            <h2 className="font-semibold text-lg">Detail Pesanan</h2>
          </div>

          <div className="p-4 md:p-6 flex-1">

            {/* PANEL INFO PESANAN & FORM INPUT NAMA */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f4ece1]/30 p-4 rounded-xl border border-[#dac2b1]/40">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">ID Pesanan</span>
                <h3 className="text-3xl font-black tracking-tight text-[#4a2e28]">P0001</h3>
              </div>

              <div className="flex-1 max-w-sm w-full">
                <label htmlFor="nama-pemesan" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Nama Pemesan
                </label>
                <input
                  id="nama-pemesan"
                  type="text"
                  value={namaPemesan}
                  onChange={(e) => setNamaPemesan(e.target.value)}
                  placeholder="Masukkan nama pemesan..."
                  className="w-full bg-white border border-[#dac2b1] rounded-lg px-3 py-2 text-sm font-semibold text-[#36211d] focus:outline-none focus:ring-2 focus:ring-[#4a2e28] focus:border-transparent transition-all shadow-inner"
                />
              </div>
            </div>

            {/* DAFTAR ITEM DI KERANJANG */}
            <div className="divide-y divide-[#dac2b1]/60">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">Keranjang belanja kosong.</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 gap-4">

                    {/* Foto & Info Produk */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <img
                        src={item.image}
                        alt={item.nama}
                        className="w-16 h-16 object-cover rounded-lg border border-[#dac2b1] bg-gray-100 shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="font-bold text-base md:text-lg truncate">{item.nama}</h4>
                        <p className="text-sm font-semibold text-gray-500 mt-0.5">
                          - {formatRupiah(item.harga)}
                        </p>
                      </div>
                    </div>

                    {/* Aksi: Counter Qty & Hapus */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center bg-[#4a2e28] text-white rounded-md overflow-hidden shadow-sm">
                        <button
                          onClick={() => kurangJumlah(item.id)}
                          className="p-1.5 md:p-2 hover:bg-[#36211d] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold min-w-[24px] text-center bg-[#fdfbf7] text-[#4a2e28] py-1">
                          {item.jumlah}
                        </span>
                        <button
                          onClick={() => tambahJumlah(item.id)}
                          className="p-1.5 md:p-2 hover:bg-[#36211d] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Tombol Delete */}
                      <button
                        onClick={() => hapusItem(item.id)}
                        className="text-red-700 p-1 hover:bg-red-50/80 rounded-full transition-colors"
                        title="Hapus item"
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

        {/* KOLOM KANAN: RINGKASAN TOTAL & ACTIONS */}
        <div className="flex flex-col gap-5">

          {/* PANEL KARTU RINGKASAN */}
          <div className="bg-[#fdfbf7] rounded-xl border border-[#dac2b1] shadow-sm overflow-hidden">
            <div className="bg-[#dac2b1]/40 px-4 py-3 border-b border-[#dac2b1]">
              <h2 className="font-semibold text-lg">Ringkasan Total</h2>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div className="flex justify-between text-sm md:text-base border-b border-dashed border-[#dac2b1] pb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base border-b border-dashed border-[#dac2b1] pb-2">
                <span className="text-gray-600">Biaya Layanan</span>
                <span className="font-bold">{formatRupiah(biayaLayanan)}</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold pt-2">
                <span>Total</span>
                <span className="text-xl text-[#4a2e28]">{formatRupiah(total)}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => alert(`Pesanan atas nama "${namaPemesan}" Berhasil Dikonfirmasi & Disimpan!`)}
              className="w-full bg-[#1e6f43] hover:bg-[#154f30] text-white py-3.5 px-4 rounded-xl font-bold tracking-wide uppercase transition-colors shadow-md text-sm md:text-base"
            >
              Simpan & Konfirmasi Pesanan
            </button>

            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin membatalkan semua perubahan?")) {
                  setNamaPemesan("Andi Pratama");
                  // Tambahkan logika reset keranjang belanja di sini jika perlu
                }
              }}
              className="w-full border border-red-700 bg-white text-red-700 hover:bg-red-50 py-3 px-4 rounded-xl font-bold tracking-wide uppercase transition-colors text-sm md:text-base"
            >
              Batalkan Edit
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}