import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState([]);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  useEffect(() => {
    getMenu();
  }, []);

  async function getMenu() {
    const { data, error } = await supabase
      .from("Menu")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("ERROR:", error);
    } else {
      console.log("DATA MENU:", data);
      setMenuData(data);
    }
  }

  // FILTER SEARCH
  const filteredMenu = menuData.filter((item) => {
    const cocokSearch = item.nama_menu
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (kategori === "Semua") {
      return cocokSearch;
    }

    // MAKANAN
    if (
      kategori === "Makanan" &&
      item.harga_makanan
    ) {
      return cocokSearch;
    }

    // MINUMAN
    if (
      kategori === "Minuman" &&
      (item.harga_dingin || item.harga_panas)
    ) {
      return cocokSearch;
    }

    return false;
  });

  return (
    <div
      style={{
        padding: "30px",
        background: "#F5EEE6",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        MENU
      </h1>

      {/* SEARCH + FILTER + BUTTON */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* FILTER */}
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "16px",
            minWidth: "180px",
          }}
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/dashboard/tambah-menu")}
          style={{
            background: "#5D2E1F",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "14px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Tambah Menu
        </button>
      </div>

      {/* CARD MENU */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* IMAGE */}
            <img
              src={
                item.gambar
                  ? item.gambar
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={item.nama_menu}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            {/* CONTENT */}
            <div
              style={{
                padding: "15px",
              }}
            >
              {/* NAMA */}
              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "10px",
                }}
              >
                {item.nama_menu}
              </h3>

              {/* HARGA */}
              <div
                style={{
                  color: "#6B4F4F",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {/* MAKANAN */}
                {item.harga_makanan && (
                  <p>Rp {item.harga_makanan}</p>
                )}

                {/* MINUMAN */}
                {!item.harga_makanan && (
                  <>
                    {item.harga_dingin && (
                      <p>Dingin : Rp {item.harga_dingin}</p>
                    )}

                    {item.harga_panas && (
                      <p>Panas : Rp {item.harga_panas}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}