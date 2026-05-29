import { X, Download } from "lucide-react";

export default function DetailRiwayat({
    open,
    onClose,
    dataPesanan,
    detailMenu
}) {

    if (!open || !dataPesanan) return null;

    const formatRupiah = (angka) => {
        return Number(angka || 0).toLocaleString("id-ID");
    };

    const totalHarga = (detailMenu || []).reduce((total, item) => {
        return total + (Number(item.subtotal) || 0);
    }, 0);

    return (

        <div className="
        fixed inset-0
        bg-black/40
        flex justify-center items-center
        z-50
        ">

            <div className="
            bg-[#F8F3EE]
            w-[650px]
            rounded-2xl
            p-6
            shadow-xl
            relative
            ">

                {/* HEADER */}
                <div className="
                flex justify-between
                items-center
                mb-5
                ">

                    <h2 className="text-3xl font-bold">
                        Detail Riwayat Pesanan
                    </h2>

                    <button onClick={onClose}>
                        <X size={24} />
                    </button>

                </div>

                {/* STRUK */}
                <div className="
                bg-white
                rounded-2xl
                p-6
                font-mono
                shadow-sm
                ">

                    <div className="text-center">

                        <h1 className="text-3xl font-bold mb-2">
                            ☕ MESOMBANG CAFE
                        </h1>

                        <p className="text-lg">
                            Jl. Utama No.123
                        </p>

                    </div>

                    <hr className="
                    my-5
                    border-dashed
                    border-gray-500
                    " />

                    {/* INFO PESANAN */}
                    <div className="text-lg">

                        <p>
                            No. Pesanan: {" "}
                            {dataPesanan.no_pesanan}
                        </p>

                        <p>
                            <b>Nama:</b>{" "}
                            {dataPesanan.nama_pemesan}
                        </p>

                        <p>
                            <b>Tanggal:</b>{" "}
                            {dataPesanan.tanggal}
                        </p>

                    </div>

                    <hr className="
                    my-5
                    border-dashed
                    border-gray-500
                    " />

                    {/* TABLE */}
                    <table className="w-full text-lg">

                        <thead>

                            <tr className="text-left">

                                <th>MENU</th>

                                <th>JUMLAH</th>

                                <th>HARGA</th>

                                <th>TOTAL</th>

                            </tr>

                        </thead>

                        <tbody>

                            {(detailMenu || []).length > 0 ? (

                                detailMenu.map((item, index) => {

                                    const harga =
                                        item.Menu?.harga_makanan ||
                                        item.Menu?.harga_panas ||
                                        item.Menu?.harga_dingin ||
                                        item.Menu?.harga ||
                                        0;

                                    return (

                                        <tr key={index}>

                                            <td>
                                                {item.Menu?.nama_menu}
                                            </td>

                                            <td>
                                                {item.jumlah}
                                            </td>

                                        </tr>

                                    );

                                })

                            ) : (

                                <tr>

                                    <td colSpan="4">
                                        Tidak ada detail menu
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>


                    <hr className="
                    my-5
                    border-dashed
                    border-gray-500
                    " />

                    {/* TOTAL */}
                    <div className="
                    text-lg
                    space-y-2
                    ">

                        <div className="text-lg font-bold flex justify-end border-t pt-4">

                            <span>
                                TOTAL AKHIR: {" "}
                                Rp {formatRupiah(totalHarga)}
                            </span>

                        </div>

                    </div>

                </div>

                {/* FOOTER */}
                <div className="
                flex justify-between
                mt-5
                ">

                    <button
                        onClick={onClose}
                        className="
                        bg-green-700
                        hover:bg-green-800
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        "
                    >
                        Kembali
                    </button>

                </div>

            </div>

        </div>

    );
}