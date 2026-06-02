import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { Search, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Laporan() {
  const [sudahFilter, setSudahFilter] = useState(false);

  const [grafikPendapatan, setGrafikPendapatan] = useState([]);
  const [grafikMenu, setGrafikMenu] = useState([]);

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
    setLaporan([]);
    setGrafikPendapatan([]);
    setGrafikMenu([]);
  }, []);

  async function loadLaporan() {

    let query = supabase
      .from("Riwayat")
      .select("*")
      .order("tanggal", {
        ascending: true
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

    console.log("Filter:", dariTanggal, sampaiTanggal);
    console.log("Data:", data);

    if (error) {
      console.log(error);
      return;
    }

    setLaporan(data || []);

    hitungSummary(data || []);
    setSudahFilter(true);
  }

  async function hitungSummary(riwayatData) {

    const transaksi = riwayatData.length;

    const totalPendapatan = riwayatData.reduce(
      (total, item) =>
        total + Number(item.total_harga || 0),
      0
    );

    const start = dariTanggal
      ? new Date(dariTanggal)
      : null;

    const end = sampaiTanggal
      ? new Date(sampaiTanggal)
      : null;

    let selisihHari = 0;

    if (start && end) {
      selisihHari =
        Math.ceil(
          (end - start) /
          (1000 * 60 * 60 * 24)
        ) + 1;
    }

    // ==========================
    // GRAFIK PENDAPATAN
    // ==========================

    const pendapatanPerPeriode = {};

    riwayatData.forEach(item => {

      const date = new Date(item.tanggal);

      let label = "";

      // Harian
      if (selisihHari <= 14) {

        label = date.toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "short"
          }
        );

      }

      // Mingguan
      else if (selisihHari <= 90) {

        const minggu =
          Math.ceil(date.getDate() / 7);

        label = `Minggu ${minggu}`;

      }

      // Bulanan
      else {

        label = date.toLocaleDateString(
          "id-ID",
          {
            month: "short",
            year: "numeric"
          }
        );

      }

      if (!pendapatanPerPeriode[label]) {
        pendapatanPerPeriode[label] = {
          total: 0,
          tanggal: date
        };
      }

      pendapatanPerPeriode[label].total +=
        Number(item.total_harga || 0);

    });

    const dataGrafikPendapatan =
      Object.entries(pendapatanPerPeriode)
        .map(([label, data]) => ({
          label,
          total: data.total,
          tanggal: data.tanggal
        }))
        .sort((a, b) => a.tanggal - b.tanggal);

    console.log("Grafik:", dataGrafikPendapatan);

    setGrafikPendapatan(
      dataGrafikPendapatan
    );

    const pesananIds = riwayatData.map(
      item => item.id_pesanan
    );

    if (pesananIds.length === 0) {

      setSummary({
        transaksi: "",
        produk: "",
        pendapatan: "",
        menuTerlaris: ""
      });

      setGrafikMenu([]);

      return;
    }

    const { data: detail } =
      await supabase
        .from("Detail_Pesanan")
        .select(`
          jumlah,
          nama_menu
        `)
        .in("id_pesanan", pesananIds);

    let produkTerjual = 0;

    const menuCounter = {};

    detail?.forEach(item => {

      const jumlah =
        Number(item.jumlah || 0);

      produkTerjual += jumlah;

      if (!item.nama_menu) return;

      menuCounter[item.nama_menu] =
        (menuCounter[item.nama_menu] || 0)
        + jumlah;

    });

    // ==========================
    // TOP 5 MENU TERLARIS
    // ==========================
    let menuTerlaris = "-";
    let jumlahTerlaris = 0;

    Object.entries(menuCounter).forEach(
      ([nama, jumlah]) => {

        if (jumlah > jumlahTerlaris) {

          jumlahTerlaris = jumlah;
          menuTerlaris = nama;

        }

      }
    );

    const topMenu =
      Object.entries(menuCounter)
        .map(([nama, jumlah]) => ({
          nama,
          jumlah
        }))
        .sort((a, b) =>
          b.jumlah - a.jumlah
        )
        .slice(0, 5);

    setGrafikMenu(topMenu);

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

  const maxPendapatan = Math.max(
    ...grafikPendapatan.map(x => x.total),
    1
  );

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
          value={summary.transaksi || "-"}
        />

        <SummaryCard
          title="Produk Terjual"
          value={summary.produk || "-"}
        />

        <SummaryCard
          title="Total Pendapatan"
          value={
            summary.pendapatan
              ? `Rp ${rupiah(summary.pendapatan)}`
              : "-"
          }
        />

        <SummaryCard
          title="Menu Terlaris"
          value={summary.menuTerlaris || "-"}
        />

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mb-6
        "
      >

        {/* Grafik Pendapatan */}

        <div className="bg-white rounded-xl shadow-sm p-5 md:col-span-2">
          <h2 className="text-xl font-bold mb-5">
            Trend Pendapatan
          </h2>

          {!sudahFilter ? (
            <p>Silakan pilih tanggal lalu klik Filter Laporan</p>
          ) : grafikPendapatan.length === 0 ? (
            <p>Tidak ada data</p>
          ) : (
            <div className="w-full h-[420px] relative border rounded-lg p-6">

              <div className="absolute left-2 top-5 h-[300px] flex flex-col justify-between text-xs text-gray-600">

                <span>
                  Rp {rupiah(maxPendapatan)}
                </span>

                <span>
                  Rp {rupiah(maxPendapatan * 0.75)}
                </span>

                <span>
                  Rp {rupiah(maxPendapatan * 0.5)}
                </span>

                <span>
                  Rp {rupiah(maxPendapatan * 0.25)}
                </span>

                <span>Rp 0</span>

              </div>

              <svg
                width="100%"
                height="380"
                viewBox="0 0 1000 340"
                preserveAspectRatio="none"
              >
                {(() => {
                  const max = Math.max(
                    ...grafikPendapatan.map(i => i.total),
                    1
                  );

                  const points = grafikPendapatan
                    .map((item, index) => {

                      const chartWidth = 940;
                      const chartHeight = 280;

                      const paddingX = 60;

                      const x =
                        grafikPendapatan.length === 1
                          ? chartWidth / 2
                          : paddingX +
                          (index /
                            (grafikPendapatan.length - 1))
                          * (chartWidth - paddingX * 2);

                      const y =
                        chartHeight -
                        (item.total / max) * 240;

                      return `${x},${y}`;
                    })
                    .join(" ");

                  return (
                    <>
                      {/* Background area grafik */}
                      <rect
                        x="60"
                        y="20"
                        width="880"
                        height="260"
                        fill="#fafafa"
                      />

                      {/* Grid horizontal */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={`h-${i}`}
                          x1="60"
                          y1={20 + i * 52}
                          x2="940"
                          y2={20 + i * 52}
                          stroke="#e5e5e5"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Grid vertikal */}
                      {grafikPendapatan.map((_, index) => {
                        const chartWidth = 940;
                        const paddingX = 60;

                        const x =
                          grafikPendapatan.length === 1
                            ? chartWidth / 2
                            : paddingX +
                            (index /
                              (grafikPendapatan.length - 1)) *
                            (chartWidth - paddingX * 2);

                        return (
                          <line
                            key={`v-${index}`}
                            x1={x}
                            y1="20"
                            x2={x}
                            y2="280"
                            stroke="#e5e5e5"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Sumbu Y */}
                      <line
                        x1="60"
                        y1="20"
                        x2="60"
                        y2="280"
                        stroke="#888"
                        strokeWidth="2"
                      />

                      {/* Sumbu X */}
                      <line
                        x1="60"
                        y1="280"
                        x2="940"
                        y2="280"
                        stroke="#888"
                        strokeWidth="2"
                      />

                      {/* Garis grafik */}
                      <polyline
                        fill="none"
                        stroke="#6B4F4F"
                        strokeWidth="3"
                        points={points}
                      />

                      {/* Titik grafik */}
                      {grafikPendapatan.map((item, index) => {
                        const chartWidth = 940;
                        const chartHeight = 260;
                        const paddingX = 60;

                        const x =
                          grafikPendapatan.length === 1
                            ? chartWidth / 2
                            : paddingX +
                            (index /
                              (grafikPendapatan.length - 1)) *
                            (chartWidth - paddingX * 2);

                        const y =
                          chartHeight -
                          (item.total / max) * 240;

                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="5"
                            fill="#6B4F4F"
                          />
                        );
                      })}

                      {/* Label Tanggal */}
                      {grafikPendapatan.map((item, index) => {
                        const chartWidth = 940;
                        const paddingX = 60;

                        const x =
                          grafikPendapatan.length === 1
                            ? chartWidth / 2
                            : paddingX +
                            (index / (grafikPendapatan.length - 1)) *
                            (chartWidth - paddingX * 2);

                        return (
                          <text
                            key={`label-${index}`}
                            x={x}
                            y="325"
                            textAnchor="middle"
                            fontSize="12"
                            fill="#666"
                          >
                            {item.label}
                          </text>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>

            </div>
          )}
        </div>

        {/* Top Menu */}

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-bold mb-5">
            Top 5 Menu Terlaris
          </h2>

          {grafikMenu.map((item, i) => {

            const max = Math.max(
              ...grafikMenu.map(x => x.jumlah),
              1
            );

            return (
              <div
                key={i}
                className="mb-4"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.nama}</span>
                  <span>{item.jumlah}</span>
                </div>

                <div className="h-6 bg-gray-200 rounded">
                  <div
                    className="h-6 bg-[#6B4F4F] rounded"
                    style={{
                      width: `${(item.jumlah / max) * 100
                        }%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

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

        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#6B4F4F] text-white">
              <th className="p-4 w-[20%] text-left">
                No Pesanan
              </th>

              <th className="p-4 w-[30%] text-left">
                Waktu
              </th>

              <th className="p-4 w-[30%] text-left">
                Nama Pemesan
              </th>

              <th className="p-4 w-[20%] text-left">
                Total Bayar
              </th>
            </tr>
          </thead>

          <tbody>
            {laporan.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 w-[20%]">
                  {item.no_pesanan}
                </td>

                <td className="p-4 w-[30%]">
                  {new Date(item.tanggal)
                    .toLocaleString("id-ID")}
                </td>

                <td className="p-4 w-[30%]">
                  {item.nama_pemesan}
                </td>

                <td className="p-4 w-[20%]">
                  Rp {rupiah(item.total_harga)}
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