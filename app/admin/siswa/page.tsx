"use client";

import {
  useEffect,
  useState,
} from "react";

interface Siswa {
  rowIndex: number;
  Tanggal: string;
  Nama: string;
  Umur: string;
  Gender: string;
  "Orang Tua": string;
  WhatsApp: string;
  Program: string;
  Lokasi: string;
  Jadwal: string;
  Catatan: string;
  Status?: string;
  ID?: string;
}

export default function SiswaPage() {
  const [data, setData] =
    useState<Siswa[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filterProgram, setFilterProgram] =
    useState("Semua");

  const [search, setSearch] =
    useState("");

  const loadData =
  async () => {
    try {

      const response =
        await fetch(
          "/api/pendaftaran",
          {
            cache:
              "no-store",
          }
        );

      const result =
        await response.json();

      const dataPendaftaran =
        Array.isArray(
          result?.data
        )
          ? result.data
          : [];

      const siswaAktif =
        dataPendaftaran.filter(
          (
            item: Siswa
          ) =>
            item.Status ===
            "Aktif"
        );

      setData(
        siswaAktif
      );

    } catch (error) {

      console.error(
        error
      );

      setData([]);

    } finally {

      setLoading(
        false
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const nonaktifkanSiswa =
    async (
      row: number
    ) => {
      const confirmAction =
        confirm(
          "Nonaktifkan siswa ini?"
        );

      if (
        !confirmAction
      )
        return;

      try {
        await fetch(
          "/api/pendaftaran",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                row,
                status:
                  "Nonaktif",
              }),
          }
        );

        await loadData();

        alert(
          "Siswa berhasil dinonaktifkan"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Gagal nonaktifkan siswa"
        );
      }
    };

  const filteredData =
    data.filter(
      (item) => {
        const matchProgram =
          filterProgram ===
          "Semua"
            ? true
            : item.Program ===
              filterProgram;

        const matchSearch =
          item.Nama
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchProgram &&
          matchSearch
        );
      }
    );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Data Siswa
          </h1>

          <p className="text-slate-500">
            Daftar siswa aktif
            Kesit Swimming
            Club
          </p>
        </div>

        <div className="rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700">
          Total:
          {" "}
          {
            filteredData.length
          }
          {" "}
          siswa
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow md:flex-row md:items-center md:justify-between">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:max-w-sm"
        />

        {/* FILTER PROGRAM */}
        <div className="flex flex-wrap gap-2">

          <button
            onClick={() =>
              setFilterProgram(
                "Semua"
              )
            }
            className={`rounded-full px-4 py-2 font-semibold transition ${
              filterProgram ===
              "Semua"
                ? "bg-blue-700 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Semua
          </button>

          <button
            onClick={() =>
              setFilterProgram(
                "Reguler"
              )
            }
            className={`rounded-full px-4 py-2 font-semibold transition ${
              filterProgram ===
              "Reguler"
                ? "bg-green-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Reguler
          </button>

          <button
            onClick={() =>
              setFilterProgram(
                "Private"
              )
            }
            className={`rounded-full px-4 py-2 font-semibold transition ${
              filterProgram ===
              "Private"
                ? "bg-purple-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Private
          </button>

          <button
            onClick={() =>
              setFilterProgram(
                "Prestasi"
              )
            }
            className={`rounded-full px-4 py-2 font-semibold transition ${
              filterProgram ===
              "Prestasi"
                ? "bg-yellow-500 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Prestasi
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Nama
                </th>

                <th className="p-4 text-left">
                  Umur
                </th>

                <th className="p-4 text-left">
                  Gender
                </th>

                <th className="p-4 text-left">
                  Orang Tua
                </th>

                <th className="p-4 text-left">
                  WhatsApp
                </th>

                <th className="p-4 text-left">
                  Program
                </th>

                <th className="p-4 text-left">
                  Lokasi
                </th>

                <th className="p-4 text-left">
                  Jadwal
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={11}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="p-10 text-center text-slate-500"
                  >
                    Tidak ada siswa ditemukan
                  </td>
                </tr>
              ) : (
                filteredData.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                      className="border-b transition hover:bg-slate-50"
                    >
                      <td className="p-4 font-semibold text-blue-700">
                        {item.ID ||
                          "-"}
                      </td>

                      <td className="p-4 font-medium">
                        {
                          item.Nama
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.Umur
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.Gender
                        }
                      </td>

                      <td className="p-4">
                        {
                          item[
                            "Orang Tua"
                          ]
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.WhatsApp
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.Program
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.Lokasi
                        }
                      </td>

                      <td className="p-4">
                        {
                          item.Jadwal
                        }
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Aktif
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            nonaktifkanSiswa(
                              item.rowIndex
                            )
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Nonaktifkan
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}