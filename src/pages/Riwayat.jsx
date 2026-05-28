import { useState, useEffect } from "react";
import { supabase } from "../database/supabase";

export default function Riwayat() {
    const [riwayatData, setRiwayatData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRiwayat();
    }, []);

    const fetchRiwayat = async () => {
        try {

            // =====================================
            // AMBIL DATA RIWAYAT
            // =====================================
            const { data, error } = await supabase
                .from("Riwayat")
                .select("*");

            if (error) throw error;

            // =====================================
            // URUTKAN NOMOR PESANAN
            // =====================================
            const dataUrut = (data || []).sort((a, b) => {

                const nomorA = parseInt(
                    a.no_pesanan?.replace("P", "") || 0
                );

                const nomorB = parseInt(
                    b.no_pesanan?.replace("P", "") || 0
                );

                return nomorB - nomorA;
            });

            setRiwayatData(dataUrut);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatRupiah = (angka) => {
        return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    return (
        <div className="flex-1 p-10 bg-[#f3eae1] min-h-screen">
            <h1 className="text-2xl font-serif font-bold mb-6">
                Riwayat
            </h1>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#f8f9fa]">
                            <th className="p-4 text-left">
                                No Pesanan
                            </th>

                            <th className="p-4 text-left">
                                Nama Pemesan
                            </th>

                            <th className="p-4 text-left">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-6 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : riwayatData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-6 text-center"
                                >
                                    Belum ada riwayat
                                </td>
                            </tr>
                        ) : (
                            riwayatData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {item.no_pesanan}
                                    </td>

                                    <td className="p-4">
                                        {item.nama_pemesan}
                                    </td>

                                    <td className="p-4 font-bold">
                                        {formatRupiah(
                                            item.total_harga
                                        )}
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