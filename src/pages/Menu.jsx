import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  ChevronDown,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Menu() {
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState([]);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  // DROPDOWN KATEGORI
  const [showKategori, setShowKategori] = useState(false);

  // DROPDOWN TITIK TIGA
  const [openMenuId, setOpenMenuId] = useState(null);

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
      setMenuData(data);
    }
  }

  // HAPUS MENU
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus menu ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("Menu")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal menghapus menu");
      console.log(error);
    } else {
      getMenu();
    }
  }

  // FILTER
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
        padding: "20px 30px",
        background: "#EFE6DB", // Warna krem latar belakang sesuai gambar
        minHeight: "100vh",
      }}
    >
      {/* SEARCH BAR (Lebar penuh, background putih bersih) */}
      <div
        style={{
          marginBottom: "20px",
          maxWidth: "550px",
          position: "relative",
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#A09890",
          }}
        />

        <input
          type="text"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 15px 10px 42px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            background: "white",
            color: "#333",
          }}
        />
      </div>

      {/* FILTER BUTTONS ROW */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        {/* TAMBAH MENU */}
        <button
          onClick={() => navigate("/dashboard/tambah-menu")}
          style={{
            background: "#4A2E2B", // Cokelat tua khas kafe
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <PlusCircle size={16} />
          Tambah menu
        </button>

        {/* DROPDOWN KATEGORI */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowKategori(!showKategori)}
            style={{
              background: "#4A2E2B",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: "120px",
              justifyContent: "space-between",
            }}
          >
            {kategori === "Semua" ? "Kategori" : kategori}
            <ChevronDown size={16} />
          </button>

          {showKategori && (
            <div
              style={{
                position: "absolute",
                top: "42px",
                left: 0,
                background: "white",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              {["Semua", "Makanan", "Minuman"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setKategori(item);
                    setShowKategori(false);
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid #F0EAE1",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#333",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID KARTU MENU */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "8px",
              position: "relative",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* TITIK TIGA KONTROL */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 5,
              }}
            >
              <button
                onClick={() =>
                  setOpenMenuId(
                    openMenuId === item.id ? null : item.id
                  )
                }
                style={{
                  border: "none",
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <MoreVertical size={14} color="#333" />
              </button>

              {/* DROPDOWN EDIT / HAPUS */}
              {openMenuId === item.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    right: 0,
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    minWidth: "110px",
                  }}
                >
                  <div
                    onClick={() =>
                      navigate(`/dashboard/edit-menu/${item.id}`)
                    }
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Pencil size={12} />
                    Ubah
                  </div>

                  <div
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    <Trash2 size={12} />
                    Hapus
                  </div>
                </div>
              )}
            </div>

            {/* FOTO PRODUK */}
            <img
              src={
                item.gambar
                  ? item.gambar
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={item.nama_menu}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />

            {/* INFO PRODUK & ACTION BUTTON */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "2px 4px",
              }}
            >
              {/* NAMA DAN HARGA */}
              <div style={{ flex: 1, minWidth: 0, marginRight: "5px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 6px 0",
                    color: "#2B1B17",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.nama_menu}
                </h3>

                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#666",
                  }}
                >
                  {/* Kondisi Makanan */}
                  {item.harga_makanan && (
                    <p style={{ margin: 0 }}>
                      Rp {Number(item.harga_makanan).toLocaleString("id-ID")}
                    </p>
                  )}

                  {/* Kondisi Minuman */}
                  {!item.harga_makanan && (
                    <>
                      {item.harga_dingin && (
                        <p style={{ margin: "0 0 2px 0" }}>
                          D : Rp {Number(item.harga_dingin).toLocaleString("id-ID")}
                        </p>
                      )}
                      {item.harga_panas && (
                        <p style={{ margin: 0 }}>
                          P : Rp {Number(item.harga_panas).toLocaleString("id-ID")}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* TOMBOL TAMBAH (+) SEPERTI DI GAMBAR */}
              <button
                style={{
                  background: "#12A150", // Hijau terang sesuai mockup aplikasi
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  width: "26px",
                  height: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}