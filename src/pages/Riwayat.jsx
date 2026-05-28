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

            const { data, error } =
                await supabase
                    .from("Riwayat")
                    .select("*")
                    .order("tanggal", {
                        ascending: false
                    });

            if (error) throw error;

            setRiwayatData(data || []);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    const formatRupiah = (angka) => {

        return "Rp " +
            Number(angka)
                .toLocaleString("id-ID");

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

                        ) :

                            riwayatData.map((item) => (

                                <tr key={item.id}>

                                    <td className="p-4">

                                        {item.no_pesanan}

                                    </td>

                                    <td className="p-4">

                                        {item.nama_pemesan}

                                    </td>

                                    <td className="p-4 font-bold">

                                        {
                                            formatRupiah(
                                                item.total_harga
                                            )
                                        }

                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}