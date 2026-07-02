"use client";

import { useEffect, useMemo, useState } from "react";

type Atlet = {
  ID: string;
  Nama: string;
  Grup: string;
  Lokasi: string;
  Status: string;
};
type Riwayat = {
  Key: string;
  Tanggal: string;
  ID: string;
  Status: string;
};
const HARI = [
  "Sel",
  "Rab",
  "Kam",
  "Jum",
  "Sab",
  "Min",
];
function getMingguAktif() {

  const today = new Date();

  const day = today.getDay();

  // Minggu dimulai hari Selasa

  const offset =
    day === 0
      ? -5
      : 2 - day;

  const awal =
    new Date(today);

  awal.setDate(
    today.getDate() + offset
  );

  const akhir =
    new Date(awal);

  akhir.setDate(
    awal.getDate() + 5
  );

  return {

    awal,

    akhir

  };

}
export default function AbsensiPrestasiPage() {

  const [data, setData] = useState<Atlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const [riwayat, setRiwayat] = useState<Riwayat[]>([]);
  const [selected, setSelected] = useState<{
    id: string;
    nama: string;
    grup: string;
    hari: string;
    tanggal: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

  try {

    const [
      atletRes,
      riwayatRes
    ] = await Promise.all([

      fetch("/api/prestasi"),

      fetch("/api/riwayat-prestasi")

    ]);

    const atlet =
      await atletRes.json();

    const riwayatData =
      await riwayatRes.json();

    setData(
      atlet.data || []
    );

    setRiwayat(
      riwayatData.data || []
    );

  } catch (err) {

    console.log(err);

  }

  setLoading(false);

}
  async function simpanStatus(
  status: string
) {

  if (!selected) return;

  try {

    await fetch(
      "/api/absensi-prestasi",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          tanggal: selected.tanggal,
          id: selected.id,
          nama: selected.nama,
          grup: selected.grup,
          status,
          pelatih: "",
          catatan: ""
        })
      }
    );
await loadData();
    alert(
      "Absensi berhasil disimpan"
    );

  } catch (err) {

    alert(
      "Gagal menyimpan"
    );

  }

  setSelected(null);

}
const minggu =
  getMingguAktif();
 function getStatus(
  id: string,
  tanggal: Date
) {

  const key =
    tanggal
      .toISOString()
      .split("T")[0] +
    "-" +
    id;

  console.log("Key dicari:", key);
  console.log("Riwayat:", riwayat);

  const item =
    riwayat.find(
      (r) => r.Key === key
    );

  return item?.Status || "";

}
  const filtered =
    useMemo(() => {

      if (filter === "Semua")
        return data;

      return data.filter(
        item =>
          item.Grup === filter
      );

    }, [data, filter]);

  return (

    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-black">
          🏊 Absensi Prestasi
        </h1>

        <p className="text-gray-500 mt-2">
          Absensi Mingguan Atlet Prestasi
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-3xl font-black text-green-700">

🏊 Absensi Prestasi

</h2>

<p className="mt-2 text-gray-500">

{minggu.awal.toLocaleDateString("id-ID",{

day:"numeric",

month:"long",

year:"numeric"

})}

{" - "}

{minggu.akhir.toLocaleDateString("id-ID",{

day:"numeric",

month:"long",

year:"numeric"

})}

</p>

          </div>

          <select
            value={filter}
            onChange={(e)=>
              setFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-2"
          >

            <option>Semua</option>
            <option>Prestasi A</option>
            <option>Prestasi B</option>
            <option>Prestasi C</option>
            <option>Prestasi D</option>

          </select>

        </div>

        {loading ? (

          <div className="text-center py-20">

            Memuat...

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">
<thead>

<tr className="bg-green-700 text-white">

<th className="p-3 text-left">
  Atlet
</th>

<th className="p-3 text-center">
  Grup
</th>

{HARI.map((hari, index) => {

  const tanggal = new Date(minggu.awal);

  tanggal.setDate(
    minggu.awal.getDate() + index
  );

  return (

    <th
      key={hari}
      className="p-3 text-center"
    >

      <div>{hari}</div>

      <div className="text-xs font-normal">

        {tanggal.getDate()}

      </div>

    </th>

  );

})}

</tr>

</thead>

              <tbody>

                {filtered.map((item) => (

                  <tr
                    key={item.ID}
                    className="border-b hover:bg-green-50"
                  >

                    <td className="p-3 font-semibold">

                      {item.Nama}

                    </td>

                    <td className="text-center">

                      {item.Grup}

                    </td>

                    {HARI.map((hari, index) => {

  const tanggal = new Date(minggu.awal);

  tanggal.setDate(
    minggu.awal.getDate() + index
  );

  const status = getStatus(
    item.ID,
    tanggal
  );

  const icon =
    status === "Hadir"
      ? "🟢"
      : status === "Alpha"
      ? "🔴"
      : status === "Izin"
      ? "🟡"
      : status === "Sakit"
      ? "🔵"
      : "⚪";

  return (
    <td
      key={hari}
      className="text-center p-3"
    >
      <button
        onClick={() => {

          setSelected({
            id: item.ID,
            nama: item.Nama,
            grup: item.Grup,
            hari,
            tanggal: tanggal
              .toISOString()
              .split("T")[0]
          });

        }}
        className="text-2xl hover:scale-125 transition"
      >
        {icon}
      </button>
    </td>
  );

})}

              </tr>

                ))}

              </tbody>

            </table>
<div className="flex flex-wrap gap-6 mt-6 text-sm font-medium text-gray-700">

  <div className="flex items-center gap-2">
    <span className="text-2xl">🟢</span>
    <span>Hadir</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="text-2xl">🟡</span>
    <span>Izin</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="text-2xl">🔵</span>
    <span>Sakit</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="text-2xl">🔴</span>
    <span>Alpha</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="text-2xl">⚪</span>
    <span>Belum Diisi</span>
  </div>

</div>
          </div>

        )}

      </div>
{selected && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white rounded-3xl p-8 w-[340px]">

<h2 className="text-xl font-bold mb-2">

{selected.nama}

</h2>

<p className="text-gray-500 mb-6">

{selected.grup}

</p>
<p className="text-sm text-gray-500 mb-6">

📅 {selected.hari} - {selected.tanggal}

</p>
<div className="grid gap-3">

<button
onClick={()=>
simpanStatus("Hadir")
}
className="bg-green-600 text-white rounded-xl py-3">

🟢 Hadir

</button>

<button
onClick={()=>
simpanStatus("Alpha")
}
className="bg-red-600 text-white rounded-xl py-3">

🔴 Alpha

</button>

<button
onClick={()=>
simpanStatus("Izin")
}
className="bg-yellow-500 rounded-xl py-3">

🟡 Izin

</button>

<button
onClick={()=>
simpanStatus("Sakit")
}
className="bg-blue-600 text-white rounded-xl py-3">

🔵 Sakit

</button>

<button
onClick={()=>
setSelected(null)
}
className="rounded-xl border py-3">

Batal

</button>

</div>

</div>

</div>

)}
    </div>

  );

}