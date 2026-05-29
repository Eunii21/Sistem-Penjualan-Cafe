import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "../database/supabase";

export default function Riwayat() {

    const [riwayatData, setRiwayatData] = useState([]);
    const [detailMenu, setDetailMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        fetchRiwayat();
    }, []);

    const fetchRiwayat = async () => {

        try {

            const { data, error } = await supabase
                .from("Riwayat")
                .select("*");

            if (error) throw error;

            setRiwayatData(data || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    async function lihatDetail(dataRiwayat) {

        setSelectedPesanan(dataRiwayat);

        // AMBIL DETAIL PESANAN
        const { data, error } = await supabase
            .from("Detail_Pesanan")
            .select(`
                *,
                Menu (*)
            `)
            .eq("id_pesanan", dataRiwayat.id_pesanan);

        if (error) {
            console.log(error);
            alert("Gagal mengambil detail");
            return;
        }

        setDetailMenu(data);

        setOpenDetail(true);
    }

    const fetchDetailMenu = async (idPesanan) => {

        try {

            const { data, error } = await supabase
                .from("Detail_Pesanan")
                .select(`
                id,
                jumlah,
                subtotal,
                id_menu,
                Menu (
                    id,
                    nama_menu,
                    harga,
                    harga_makanan,
                    harga_panas,
                    harga_dingin
                )
            `)
                .eq("id_pesanan", idPesanan);

            if (error) {
                console.log("ERROR SUPABASE:", error);
                return;
            }

            console.log("DETAIL MENU:", data);

            setDetailMenu(data || []);

        } catch (err) {

            console.error(err);

        }

    };

    const formatRupiah = (angka) => {
        return Number(angka || 0).toLocaleString("id-ID");
    };

    return (

        <div className="flex-1 p-10 bg-[#f3eae1] min-h-screen">

            <h1 className="text-2xl font-bold mb-6">
                Riwayat
            </h1>

            <div className="bg-white rounded-lg border overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

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
                                    className="p-4 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>

                        ) : (

                            riwayatData.map((item) => (

                                <tr
                                    key={item.id}
                                    className="
                                    border-t
                                    cursor-pointer
                                    hover:bg-gray-100
                                    "
                                    onClick={async () => {

                                        console.log("DATA RIWAYAT:", item);

                                        setSelectedData(item);

                                        await fetchDetailMenu(
                                            item.id_pesanan
                                        );

                                        setOpenDetail(true);

                                    }}
                                >

                                    <td className="p-4">
                                        {item.no_pesanan}
                                    </td>

                                    <td className="p-4">
                                        {item.nama_pemesan}
                                    </td>

                                    <td className="p-4">

                                        Rp {formatRupiah(item.total_harga)}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {openDetail && selectedData && (

                <div className="
                fixed inset-0
                bg-black/40
                flex justify-center items-center
                z-50
                ">

                    <div className="
                    bg-white
                    w-[650px]
                    rounded-xl
                    p-6
                    ">

                        <div className="
                        flex justify-between
                        mb-6
                        ">

                            <h2 className="text-2xl font-bold">
                                Detail Riwayat
                            </h2>

                            <button
                                onClick={() =>
                                    setOpenDetail(false)
                                }
                            >
                                <X />
                            </button>

                        </div>

                        <p>
                            <b>No Pesanan:</b>
                            {" "}
                            {selectedData.no_pesanan}
                        </p>

                        <p>
                            <b>Nama:</b>
                            {" "}
                            {selectedData.nama_pemesan}
                        </p>

                        <p>
                            {selectedData?.tanggal
                                ? new Date(selectedData.tanggal).toLocaleString("id-ID", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "-"}
                        </p>

                        <br />

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left">
                                        Menu
                                    </th>

                                    <th>
                                        Jumlah
                                    </th>

                                    <th>
                                        Harga
                                    </th>

                                    <th>
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {detailMenu.length > 0 ? (

                                    detailMenu.map(
                                        (menu) => (

                                            <tr key={menu.id}>

                                                <td>
                                                    {menu.Menu?.nama_menu}
                                                </td>

                                                <td>
                                                    {menu.jumlah}
                                                </td>

                                                <td>
                                                    Rp {formatRupiah(
                                                        menu.Menu?.harga ||
                                                        menu.Menu?.harga_makanan ||
                                                        menu.Menu?.harga_panas ||
                                                        menu.Menu?.harga_dingin
                                                    )}
                                                </td>

                                                <td>
                                                    Rp {formatRupiah(menu.subtotal)}
                                                </td>

                                            </tr>

                                        ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="
                                            text-center
                                            py-5
                                            "
                                        >
                                            Tidak ada menu
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                        <div className="text-right font-bold border-t pt-4 mt-4">
                            TOTAL AKHIR: Rp {formatRupiah(
                                (detailMenu || []).reduce((total, item) => {
                                    return total + (Number(item.subtotal) || 0);
                                }, 0)
                            )}
                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}