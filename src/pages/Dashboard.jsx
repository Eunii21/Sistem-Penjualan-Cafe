import { Wallet, FileText, Coffee } from "lucide-react";

function Dashboard() {
  return (
    <div className="px-4 md:px-8 py-6">

      <h1 className="text-2xl md:text-3xl font-abhaya mb-6">
        Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <Card icon={<Wallet size={16} />} title="Total Pendapatan" value="Rp 500.000" />

        <Card icon={<FileText size={16} />} title="Transaksi hari ini" value="20 Transaksi" />

        <Card icon={<Coffee size={16} />} title="Menu terlaris" value="Americano" />

      </div>

      {/* CHART */}
      <div className="bg-[#f4f1ee] rounded-2xl shadow-md p-4 md:p-6 mb-10">
        <h3 className="mb-4 font-semibold">Grafik penjualan harian</h3>

        <div className="w-full h-[200px]">
          <svg viewBox="0 0 700 200" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#5c3a32"
              strokeWidth="4"
              points="50,150 130,120 200,140 270,110 350,125 430,90 520,120"
            />
          </svg>
        </div>
      </div>

      {/* MENU TERLARIS */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-[#f4f1ee] rounded-2xl shadow-md p-5">
          <h3 className="text-center mb-4 font-semibold">Menu terlaris</h3>

          <Progress label="Americano" value="75%" />
          <Progress label="Tubruk susu" value="60%" />
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