function Dashboard() {
  return (
    <div className="px-6 py-4">

      {/* ===== TOP CARDS ===== */}
      <div className="flex gap-8 justify-center mb-10">

        {/* CARD 1 */}
        <div className="w-[240px] bg-[#f8f6f4] rounded-2xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-2">Total Pendapatan</div>

          <h2 className="text-xl font-semibold text-[#3b1f1a]">
            Rp 500.000
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-600 font-medium">+12%</span> dari kemarin
          </p>
        </div>

        {/* CARD 2 */}
        <div className="w-[240px] bg-[#f8f6f4] rounded-2xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-2">
            Transaksi hari ini
          </div>

          <h2 className="text-xl font-semibold text-[#3b1f1a]">
            20 Transaksi
          </h2>
        </div>

        {/* CARD 3 */}
        <div className="w-[240px] bg-[#f8f6f4] rounded-2xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-2">Menu terlaris</div>

          <h2 className="text-xl font-semibold text-[#3b1f1a]">
            Americano
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            Terjual 50x
          </p>
        </div>

      </div>

      {/* ===== GRAFIK ===== */}
      <div className="bg-[#f8f6f4] rounded-2xl shadow-md p-6 mb-10">

        <h3 className="text-md font-semibold text-[#3b1f1a] mb-6">
          Grafik penjualan harian
        </h3>

        {/* Chart dummy (lebih mirip garis desain) */}
        <div className="relative h-48 w-full">

          {/* garis horizontal */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></div>

          {/* garis utama */}
          <svg viewBox="0 0 500 150" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#5c3a32"
              strokeWidth="4"
              points="0,120 80,90 150,110 220,80 300,95 380,60 460,85"
            />

            {/* titik */}
            {[
              [80, 90],
              [150, 110],
              [220, 80],
              [300, 95],
              [380, 60],
              [460, 85],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="#fff"
                stroke="#5c3a32"
                strokeWidth="3"
              />
            ))}
          </svg>

        </div>
      </div>

      {/* ===== MENU TERLARIS ===== */}
      <div className="flex justify-center">

        <div className="w-[350px] bg-[#f8f6f4] rounded-2xl shadow-md p-6">

          <h3 className="text-md font-semibold text-[#3b1f1a] mb-5 text-center">
            Menu terlaris
          </h3>

          {/* Americano */}
          <div className="mb-4">
            <p className="text-sm text-[#3b1f1a] mb-1">Americano</p>
            <div className="w-full h-2 bg-gray-300 rounded">
              <div className="h-2 bg-[#5c3a32] rounded w-[80%]"></div>
            </div>
          </div>

          {/* Tubruk */}
          <div>
            <p className="text-sm text-[#3b1f1a] mb-1">Tubruk susu</p>
            <div className="w-full h-2 bg-gray-300 rounded">
              <div className="h-2 bg-[#5c3a32] rounded w-[65%]"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;