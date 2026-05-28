import { useState, useEffect } from "react";
import { supabase } from "../database/supabase.js"; // Memakai file koneksi database Anda

export default function Riwayat() {
    // State untuk menyimpan data riwayat dari database
    const [riwayatData, setRiwayatData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mengambil data riwayat dari Supabase saat halaman dimuat
    useEffect(() => {
        const fetchRiwayat = async () => {
            try {
                setLoading(true);
                // Mengambil data dari tabel 'riwayat' di database Anda
                const { data, error } = await supabase
                    .from("riwayat")
                    .select("no_pesanan, nama_pemesan, total_harga")
                    .order("no_pesanan", { ascending: false }); // Urutkan dari pesanan terbaru

                if (error) throw error;
                if (data) setRiwayatData(data);
            } catch (err) {
                console.error("Gagal mengambil data riwayat pesanan:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRiwayat();
    }, []);

    return (
        // Menggunakan flex-1 agar memenuhi ruang kosong di sebelah kanan sidebar utama Anda
        <div className="flex-1 p-10 bg-[#f3eae1] min-h-screen flex flex-col">

            {/* Judul Halaman Sesuai Gambar Referensi (Tulisan Table 1 sudah dihapus) */}
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Riwayat
            </h1>

            {/* Struktur Tabel Utama */}
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8f9fa] border-b border-gray-200">
                            <th className="py-3 px-6 text-gray-700 font-bold text-sm w-1/4 border-r border-gray-200">
                                No. Pesanan
                            </th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-sm w-1/2 border-r border-gray-200">
                                Nama Pemesan
                            </th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-sm w-1/4">
                                Total Harga
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="py-6 px-6 text-center text-sm text-gray-400">
                                    Memuat data riwayat pesanan...
                                </td>
                            </tr>
                        ) : riwayatData.length === 0 ? (
                            // Jika data di database kosong, tampilkan baris kosong estetik menyerupai gambar blueprint
                            <>
                                {[...Array(6)].map((_, index) => (
                                    <tr key={index} className="h-12 hover:bg-gray-50/50 transition-all">
                                        <td className="border-r border-gray-200 px-6"></td>
                                        <td className="border-r border-gray-200 px-6"></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            // Menampilkan data transaksi asli secara dinamis dari database Supabase Anda
                            riwayatData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-all">
                                    <td className="py-3.5 px-6 text-sm font-medium text-gray-800 border-r border-gray-200">
                                        {item.no_pesanan}
                                    </td>
                                    <td className="py-3.5 px-6 text-sm text-gray-900 font-semibold border-r border-gray-200">
                                        {item.nama_pemesan}
                                    </td>
                                    <td className="py-3.5 px-6 text-sm font-bold text-gray-900">
                                        {item.total_harga}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}