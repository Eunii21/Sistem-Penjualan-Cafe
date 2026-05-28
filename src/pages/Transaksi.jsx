import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabase";

export default function Transaksi() {

  const navigate = useNavigate();

  const idPesanan = 1;

  const [namaPemesan, setNamaPemesan] =
    useState("");

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const biayaLayanan = 20000;

  useEffect(() => {

    fetchPesanan();

  }, []);

  async function fetchPesanan() {

    try {

      setLoading(true);

      const { data: pesananData } =
        await supabase
          .from("Pesanan")
          .select("*")
          .eq("id", idPesanan)
          .single();

      if (pesananData) {

        setNamaPemesan(
          pesananData.nama_pemesan || ""
        );

      }

      const { data, error } =
        await supabase
          .from("Detail_Pesanan")
          .select(`
          id,
          jumlah,
          subtotal,
          Menu(
            id,
            nama_menu,
            gambar,
            harga
          )
        `)
          .eq(
            "id_pesanan",
            idPesanan
          );

      if (error) throw error;

      const hasil =
        data.map((item) => ({

          id:
            item.id,

          nama:
            item.Menu.nama_menu,

          harga:
            item.Menu.harga,

          jumlah:
            item.jumlah,

          image:
            item.Menu.gambar

        }));

      setCartItems(hasil);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  }

  async function tambahJumlah(id) {

    const item =
      cartItems.find(
        x => x.id === id
      );

    if (!item) return;

    const jumlahBaru =
      item.jumlah + 1;

    await supabase
      .from("Detail_Pesanan")
      .update({

        jumlah:
          jumlahBaru,

        subtotal:
          jumlahBaru *
          item.harga

      })
      .eq("id", id);

    fetchPesanan();

  }

  async function kurangJumlah(id) {

    const item =
      cartItems.find(
        x => x.id === id
      );

    if (
      !item ||
      item.jumlah <= 1
    ) return;

    const jumlahBaru =
      item.jumlah - 1;

    await supabase
      .from("Detail_Pesanan")
      .update({

        jumlah:
          jumlahBaru,

        subtotal:
          jumlahBaru *
          item.harga

      })
      .eq("id", id);

    fetchPesanan();

  }

  async function hapusItem(id) {

    await supabase
      .from("Detail_Pesanan")
      .delete()
      .eq("id", id);

    fetchPesanan();

  }

  const subtotal =
    cartItems.reduce(

      (acc, item) =>

        acc +
        (
          item.harga *
          item.jumlah
        ),

      0

    );

  const total =
    subtotal +
    biayaLayanan;

  function formatRupiah(
    angka
  ) {

    return "Rp " +

      Number(angka)
        .toLocaleString(
          "id-ID"
        );

  }

  async function simpanPesanan() {

    try {

      await supabase
        .from("Pesanan")
        .update({

          nama_pemesan:
            namaPemesan,

          total_harga:
            total

        })
        .eq(
          "id",
          idPesanan
        );

      await supabase
        .from("Riwayat")
        .insert({

          id_pesanan:
            idPesanan,

          no_pesanan:
            `P${String(
              idPesanan
            ).padStart(
              4,
              "0"
            )}`,

          nama_pemesan:
            namaPemesan,

          total_harga:
            total

        });

      alert(
        "Pesanan berhasil disimpan!"
      );

      navigate(
        "/riwayat"
      );

    }

    catch (err) {

      console.error(err);

      alert(
        "Gagal menyimpan."
      );

    }

  }

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f4ece1] p-4 md:p-6 text-[#36211d]">

      <div className="mb-6 border-b border-[#dac2b1] pb-4">

        <h1 className="font-serif text-2xl md:text-3xl font-bold uppercase">

          Keranjang Belanja - Edit Pesanan

        </h1>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 flex flex-col bg-[#fdfbf7] rounded-xl border border-[#dac2b1] shadow-sm overflow-hidden">

          <div className="bg-[#dac2b1]/40 px-4 py-3">

            <h2 className="font-semibold text-lg">

              Detail Pesanan

            </h2>

          </div>

          <div className="p-6">

            <div className="mb-6 flex justify-between gap-4">

              <div>

                <span className="text-xs">

                  ID Pesanan

                </span>

                <h3 className="text-3xl font-black">

                  P0001

                </h3>

              </div>

              <div className="flex-1 max-w-sm">

                <input
                  type="text"
                  value={
                    namaPemesan
                  }
                  onChange={(e) =>
                    setNamaPemesan(
                      e.target.value
                    )
                  }
                  placeholder="Nama Pemesan"
                  className="w-full border rounded-lg px-3 py-2"
                />

              </div>

            </div>

            <div className="divide-y">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between py-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.nama
                      }
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div>

                      <h4 className="font-bold">

                        {item.nama}

                      </h4>

                      <p>

                        {
                          formatRupiah(
                            item.harga
                          )
                        }

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <button
                      onClick={() =>
                        kurangJumlah(
                          item.id
                        )
                      }
                    >

                      <Minus />

                    </button>

                    <span>

                      {
                        item.jumlah
                      }

                    </span>

                    <button
                      onClick={() =>
                        tambahJumlah(
                          item.id
                        )
                      }
                    >

                      <Plus />

                    </button>

                    <button
                      onClick={() =>
                        hapusItem(
                          item.id
                        )
                      }
                    >

                      <X />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        <div>

          <div className="bg-white rounded-xl border p-5">

            <div className="flex justify-between">

              <span>

                Subtotal

              </span>

              <span>

                {
                  formatRupiah(
                    subtotal
                  )
                }

              </span>

            </div>

            <div className="flex justify-between mt-3">

              <span>

                Biaya Layanan

              </span>

              <span>

                {
                  formatRupiah(
                    biayaLayanan
                  )
                }

              </span>

            </div>

            <div className="flex justify-between mt-5 text-xl font-bold">

              <span>

                Total

              </span>

              <span>

                {
                  formatRupiah(
                    total
                  )
                }

              </span>

            </div>

          </div>

          <div className="mt-5 flex flex-col gap-3">

            <button
              onClick={
                simpanPesanan
              }
              className="w-full bg-[#1e6f43] text-white py-3 rounded-xl font-bold"
            >

              Simpan & Konfirmasi Pesanan

            </button>

            <button
              onClick={() =>
                fetchPesanan()
              }
              className="w-full border border-red-700 text-red-700 py-3 rounded-xl font-bold"
            >

              Batalkan Edit

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}