import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { Search, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Laporan() {

  const [dariTanggal, setDariTanggal] = useState("");
  const [sampaiTanggal, setSampaiTanggal] = useState("");

  const [laporan, setLaporan] = useState([]);

  const [summary, setSummary] = useState({
    transaksi: 0,
    produk: 0,
    pendapatan: 0,
    menuTerlaris: "-"
  });

  useEffect(() => {
    loadLaporan();
  }, []);

  async function loadLaporan() {

    let query = supabase
      .from("Riwayat")
      .select("*")
      .order("tanggal", {
        ascending: false
      });

    if (dariTanggal) {
      query = query.gte(
        "tanggal",
        `${dariTanggal} 00:00:00`
      );
    }

    if (sampaiTanggal) {
      query = query.lte(
        "tanggal",
        `${sampaiTanggal} 23:59:59`
      );
    }

    const { data, error } =
      await query;

    if (error) {
      console.log(error);
      return;
    }

    setLaporan(data || []);

    hitungSummary(data || []);
  }

  async function hitungSummary(riwayatData) {

    const totalPendapatan =
      riwayatData.reduce(
        (a, b) =>
          a + Number(b.total_harga || 0),
        0
      );

    const transaksi =
      riwayatData.length;

    const pesananIds =
      riwayatData.map(
        item => item.id_pesanan
      );

    const { data: detail } =
      await supabase
        .from("Detail_Pesanan")
        .select(`
          *,
          Menu(
            nama_menu
          )
        `)
        .in(
          "id_pesanan",
          pesananIds.length
            ? pesananIds
            : [0]
        );

    let produkTerjual = 0;

    const menuMap = {};

    (detail || []).forEach(item => {

      produkTerjual +=
        Number(item.jumlah || 0);

      const nama =
        item.Menu?.nama_menu;

      if (!nama) return;

      menuMap[nama] =
        (menuMap[nama] || 0)
        + Number(item.jumlah || 0);

    });

    let menuTerlaris = "-";

    const ranking =
      Object.entries(menuMap)
        .sort((a, b) => b[1] - a[1]);

    if (ranking.length > 0) {
      menuTerlaris =
        ranking[0][0];
    }

    setSummary({
      transaksi,
      produk: produkTerjual,
      pendapatan: totalPendapatan,
      menuTerlaris
    });
  }

  const rupiah = (angka) =>
    Number(angka || 0)
      .toLocaleString("id-ID");
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "LAPORAN PENJUALAN MESOMBANG CAFE",
      14,
      15
    );

    doc.setFontSize(11);

    doc.text(
      `Periode : ${dariTanggal || "-"
      } s/d ${sampaiTanggal || "-"
      }`,
      14,
      25
    );

    doc.text(
      `Total Transaksi : ${summary.transaksi}`,
      14,
      35
    );

    doc.text(
      `Produk Terjual : ${summary.produk}`,
      14,
      42
    );

    doc.text(
      `Total Pendapatan : Rp ${rupiah(
        summary.pendapatan
      )}`,
      14,
      49
    );

    doc.text(
      `Menu Terlaris : ${summary.menuTerlaris}`,
      14,
      56
    );

    autoTable(doc, {

      startY: 65,

      head: [[
        "No Pesanan",
        "Tanggal",
        "Nama Pemesan",
        "Total Bayar"
      ]],

      body: laporan.map(item => [

        item.no_pesanan,

        new Date(
          item.tanggal
        ).toLocaleString("id-ID"),

        item.nama_pemesan,

        `Rp ${rupiah(
          item.total_harga
        )}`

      ]),

      styles: {
        fontSize: 10
      },

      headStyles: {
        fillColor: [107, 79, 79]
      }

    });

    doc.save(
      `Laporan-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
  };

  return (

    <div
      className="
      min-h-screen
      bg-[#F5EEE6]
      p-8
      "
    >

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Laporan Penjualan
      </h1>

      {/* FILTER */}

      <div
        className="
        bg-white
        rounded-xl
        p-6
        shadow-sm
        mb-6
        "
      >

        <div
          className="
          grid
          md:grid-cols-3
          gap-4
          "
        >

          <div>

            <label>
              Dari Tanggal
            </label>

            <input
              type="date"
              value={dariTanggal}
              onChange={(e) =>
                setDariTanggal(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
              "
            />

          </div>

          <div>

            <label>
              Sampai Tanggal
            </label>

            <input
              type="date"
              value={sampaiTanggal}
              onChange={(e) =>
                setSampaiTanggal(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
              "
            />

          </div>

          <div
            className="
  flex
  items-end
  gap-3
  "
          >

            <button
              onClick={loadLaporan}
              className="
    bg-green-500
    text-white
    px-6
    py-3
    rounded-lg
    flex
    items-center
    gap-2
    "
            >
              <Search size={18} />
              Filter Laporan
            </button>

            <button
              onClick={downloadPDF}
              className="
    bg-[#6B4F4F]
    text-white
    px-6
    py-3
    rounded-lg
    flex
    items-center
    gap-2
    "
            >
              <Download size={18} />
              Unduh PDF
            </button>

          </div>

        </div>

      </div>

      {/* SUMMARY */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-6
        "
      >

        <SummaryCard
          title="Total Transaksi"
          value={summary.transaksi}
        />

        <SummaryCard
          title="Produk Terjual"
          value={summary.produk}
        />

        <SummaryCard
          title="Total Pendapatan"
          value={`Rp ${rupiah(
            summary.pendapatan
          )}`}
        />

        <SummaryCard
          title="Menu Terlaris"
          value={summary.menuTerlaris}
        />

      </div>

      {/* TABEL */}

      <div
        className="
        bg-white
        rounded-xl
        shadow-sm
        overflow-hidden
        "
      >

        <table className="w-full">

          <thead>

            <tr
              className="
              bg-[#6B4F4F]
              text-white
              "
            >

              <th className="p-4">
                No Pesanan
              </th>

              <th className="p-4">
                Waktu
              </th>

              <th className="p-4">
                Nama Pemesan
              </th>

              <th className="p-4">
                Total Bayar
              </th>

            </tr>

          </thead>

          <tbody>

            {laporan.map(item => (

              <tr
                key={item.id}
                className="
                border-b
                hover:bg-gray-50
                "
              >

                <td className="p-4">
                  {item.no_pesanan}
                </td>

                <td className="p-4">

                  {new Date(
                    item.tanggal
                  ).toLocaleString(
                    "id-ID"
                  )}

                </td>

                <td className="p-4">
                  {item.nama_pemesan}
                </td>

                <td className="p-4">

                  Rp {
                    rupiah(
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

function SummaryCard({
  title,
  value
}) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow-sm
      p-5
      "
    >

      <p
        className="
        text-gray-500
        text-sm
        "
      >
        {title}
      </p>

      <h2
        className="
        text-2xl
        font-bold
        mt-2
        "
      >
        {value}
      </h2>

    </div>

  );

}