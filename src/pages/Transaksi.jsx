import { useState } from "react";

function Transaksi() {
  const [menu, setMenu] = useState("Kopi Susu");
  const [jumlah, setJumlah] = useState(1);

  const harga = 12000;
  const total = harga * jumlah;

  const data = [
    { tanggal: "12/05/2025", menu: "Kopi Susu", jumlah: 3, total: 36000 },
    { tanggal: "13/05/2025", menu: "Tubruk Susu", jumlah: 1, total: 14000 },
  ];

  return (
    <div className="px-4 md:px-8 py-6">

      {/* ===== TITLE ===== */}
      <h1 className="text-2xl md:text-3xl font-abhaya text-[#2b1a17] mb-6">
        Transaksi
      </h1>

      {/* ===== FORM ===== */}
      <div className="bg-[#f4f1ee] rounded-2xl shadow-md p-4 md:p-6 mb-8">

        <h2 className="font-semibold mb-4 text-[#3b1f1a]">
          Pilih Menu
        </h2>

        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

          {/* MENU */}
          <div>
            <label className="text-sm">Menu</label>
            <select
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-2"
            >
              <option>Kopi Susu</option>
              <option>Americano</option>
              <option>Tubruk Susu</option>
            </select>
          </div>

          {/* JUMLAH */}
          <div>
            <label className="text-sm">Jumlah</label>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="w-full mt-1 border rounded px-2 py-2"
            />
          </div>

          {/* TOTAL */}
          <div>
            <label className="text-sm">Total Harga</label>
            <input
              value={`Rp ${total.toLocaleString("id-ID")}`}
              readOnly
              className="w-full mt-1 border rounded px-2 py-2 bg-gray-100"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm">Status</label>
            <input
              value="Tersedia"
              readOnly
              className="w-full mt-1 border rounded px-2 py-2 bg-gray-100"
            />
          </div>

          {/* BUTTON */}
          <div className="flex gap-2">
            <button className="w-full bg-green-600 text-white py-2 rounded">
              + Tambah
            </button>
            <button className="w-full bg-gray-400 text-white py-2 rounded">
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-[#f4f1ee] rounded-2xl shadow-md p-4 md:p-6">

        <h2 className="font-semibold mb-4 text-[#3b1f1a]">
          Daftar Transaksi Hari Ini
        </h2>

        {/* MOBILE → CARD */}
        <div className="md:hidden space-y-3">
          {data.map((item, i) => (
            <div key={i} className="bg-white p-3 rounded shadow text-sm">
              <p><b>Tanggal:</b> {item.tanggal}</p>
              <p><b>Menu:</b> {item.menu}</p>
              <p><b>Jumlah:</b> {item.jumlah}</p>
              <p><b>Total:</b> Rp {item.total.toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        {/* DESKTOP → TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2">Tanggal</th>
                <th>Menu</th>
                <th>Jumlah</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{item.tanggal}</td>
                  <td>{item.menu}</td>
                  <td>{item.jumlah}</td>
                  <td>Rp {item.total.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default Transaksi;