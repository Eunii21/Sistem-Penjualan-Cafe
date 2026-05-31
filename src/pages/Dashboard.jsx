import { useState, useEffect } from "react";
import { Wallet, FileText, Coffee } from "lucide-react";
import { supabase } from "../database/supabase";

function Dashboard() {

  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [transaksiHariIni, setTransaksiHariIni] = useState(0);
  const [menuTerlaris, setMenuTerlaris] = useState("-");
  const [topMenus, setTopMenus] = useState([]);
  const [grafikData, setGrafikData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {

      const { data: riwayat } = await supabase
        .from("Riwayat")
        .select("*");

      console.log("RIWAYAT:", riwayat);

      const today = new Date();

      const transaksiToday = (riwayat || []).filter((item) => {

        if (!item.tanggal) return false;

        const trxDate = new Date(item.tanggal);

        return (
          trxDate.getDate() === today.getDate() &&
          trxDate.getMonth() === today.getMonth() &&
          trxDate.getFullYear() === today.getFullYear()
        );

      });

      console.log("TRANSAKSI HARI INI:", transaksiToday);

      const total = transaksiToday.reduce(
        (sum, item) =>
          sum + Number(item.total_harga || 0),
        0
      );

      setTotalPendapatan(total);

      setTransaksiHariIni(transaksiToday.length);

      const idPesananHariIni = transaksiToday.map((item) => item.id_pesanan);

      const { data: detail } = await supabase
        .from("Detail_Pesanan")
        .select(`
            jumlah,
            id_pesanan,
            Menu (
                nama_menu
            )
            `)
        .in("id_pesanan", idPesananHariIni);

      const menuCount = {};

      detail?.forEach((item) => {

        const nama = item.Menu?.nama_menu;

        if (!nama) return;

        menuCount[nama] =
          (menuCount[nama] || 0) +
          Number(item.jumlah || 0);

      });

      let namaTerlaris = "-";
      let jumlahTerlaris = 0;

      Object.entries(menuCount).forEach(
        ([nama, jumlah]) => {

          if (jumlah > jumlahTerlaris) {
            jumlahTerlaris = jumlah;
            namaTerlaris = nama;
          }

        }
      );

      setMenuTerlaris(namaTerlaris);

      const sortedMenus =
        Object.entries(menuCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

      setTopMenus(sortedMenus);

      const jamData = Array(9).fill(0);

      transaksiToday.forEach((trx) => {

        const jam =
          new Date(trx.tanggal).getHours();

        if (jam >= 17 && jam <= 23) {

          jamData[jam - 17] +=
            Number(trx.total_harga || 0);

        }

        if (jam === 0) {

          jamData[7] +=
            Number(trx.total_harga || 0);

        }

        if (jam === 1) {

          jamData[8] +=
            Number(trx.total_harga || 0);

        }

      });
      setGrafikData(jamData);

    } catch (err) {

      console.log(err);

    }
  }

  const maxValue = 2000000;

  const chartWidth = 750;
  const startX = 80;
  const stepX = chartWidth / (grafikData.length - 1);

  return (
    <div className="px-4 md:px-8 py-6">

      <h1 className="text-2xl md:text-3xl font-abhaya mb-6">
        Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <Card icon={<Wallet size={16} />} title="Total Pendapatan" value={`Rp ${totalPendapatan.toLocaleString("id-ID")}`} />

        <Card icon={<FileText size={16} />} title="Transaksi hari ini" value={`${transaksiHariIni} Transaksi`} />

        <Card icon={<Coffee size={16} />} title="Menu terlaris" value={menuTerlaris} />

      </div>

      {/* CHART */}
      <div className="bg-[#f4f1ee] rounded-2xl shadow-md p-4 md:p-6 mb-10">
        <h3 className="mb-4 font-semibold">Grafik penjualan harian</h3>

        <div className="w-full h-[200px]">
          <svg viewBox="0 0 900 250" className="w-full h-full">

            <line
              x1="50"
              y1="200"
              x2="850"
              y2="200"
              stroke="#ccc"
            />

            <line
              x1="50"
              y1="20"
              x2="50"
              y2="200"
              stroke="#ccc"
            />

            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {

              const value = 2000000 - (i * 250000);

              const y = 20 + (i * 22.5);

              return (
                <g key={i}>

                  <line
                    x1="50"
                    y1={y}
                    x2="650"
                    y2={y}
                    stroke="#e5e5e5"
                  />

                  <text
                    x="45"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#666"
                  >
                    Rp {value.toLocaleString("id-ID")}
                  </text>

                </g>
              );

            })}

            <polyline
              fill="none"
              stroke="#5c3a32"
              strokeWidth="4"
              points={
                grafikData.length
                  ? grafikData
                    .map((v, i) => {
                      const x = startX + i * stepX;
                      const y =
                        200 -
                        (v / maxValue) * 180;

                      return `${x},${y}`;
                    })
                    .join(" ")
                  : ""
              }
            />

            {grafikData.map((v, i) => {

              const x = startX + i * stepX;

              const y =
                200 -
                (v / maxValue) * 180;

              return (
                <g key={i}>

                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#5c3a32"
                  >
                    Rp {v.toLocaleString("id-ID")}
                  </text>

                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#5c3a32"
                  />

                </g>
              );

            })}

            {["17", "18", "19", "20", "21", "22", "23", "00", "01"]
              .map((jam, i) => (

                <text
                  key={i}
                  x={startX + i * stepX}
                  y="220"
                  textAnchor="middle"
                  fontSize="12"
                >
                  {jam}:00
                </text>

              ))}

          </svg>
        </div>
      </div>

      {/* MENU TERLARIS */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-[#f4f1ee] rounded-2xl shadow-md p-5">
          <h3 className="text-center mb-4 font-semibold">Menu terlaris</h3>

          {topMenus.map(([nama, jumlah]) => {

            const max = topMenus[0]?.[1] || 1;

            return (
              <Progress
                key={nama}
                label={nama}
                value={`${((jumlah / max) * 100).toFixed(0)}%`}
              />
            );

          })}
        </div>
      </div>

    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="bg-[#f4f1ee] rounded-2xl shadow-md p-5">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {icon} {title}
      </div>

      <h2 className="text-lg font-semibold mt-3">{value}</h2>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm mb-1">{label}</p>
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div className="h-2 bg-[#5c3a32] rounded-full" style={{ width: value }} />
      </div>
    </div>
  );
}

export default Dashboard;