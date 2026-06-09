"use client";

import {
  useEffect,
  useState,
} from "react";

interface Pendaftaran {
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

export default function PendaftaranPage() {
  const [data, setData] =
    useState<Pendaftaran[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [filterProgram, setFilterProgram] =
    useState("Semua");

  const loadData = async () => {
    try {
      const res =
        await fetch(
          "/api/pendaftaran"
        );

      const result =
        await res.json();

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const generateId = () => {
    const activeCount =
      data.filter(
        (item) =>
          item.Status ===
          "Aktif"
      ).length + 1;

    return `KST${String(
      activeCount
    ).padStart(3, "0")}`;
  };

  const updateStatus =
    async (
      row: number,
      status: string
    ) => {
      try {
        const studentId =
          status ===
          "Aktif"
            ? generateId()
            : "";

        await fetch(
          "/api/pendaftaran",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                row,
                status,
                id: studentId,
              }),
          }
        );

        await loadData();

        alert(
          `Status berhasil diubah menjadi ${status}`
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal update status"
        );
      }
    };

  const getStatusClass = (
    status?: string
  ) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-700";

      case "Ditolak":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const filteredData =
    data.filter((item) =>
      filterProgram ===
      "Semua"
        ? true
        : item.Program ===
          filterProgram
    );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <h1 className="text-3xl font-bold">
          Pendaftaran Baru
        </h1>

        <div className="flex flex-wrap items-center gap-3">

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

          <div className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-900">
            Total:
            {" "}
            {
              filteredData.length
            }
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">
                  Tanggal
                </th>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Nama
                </th>

                <th className="p-4 text-left">
                  Program
                </th>

                <th className="p-4 text-left">
                  Lokasi
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
                    colSpan={7}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredData.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {new Date(
                          item.Tanggal
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>

                      <td className="p-4 font-semibold">
                        {item.ID ||
                          "-"}
                      </td>

                      <td className="p-4">
                        {item.Nama}
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
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                            item.Status
                          )}`}
                        >
                          {item.Status ||
                            "Pending"}
                        </span>
                      </td>

                      <td className="p-4">
                        {item.Status ===
                        "Aktif" ? (
                          <span className="font-semibold text-green-600">
                            Aktif
                          </span>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateStatus(
                                  item.rowIndex,
                                  "Aktif"
                                )
                              }
                              className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                            >
                              Terima
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  item.rowIndex,
                                  "Ditolak"
                                )
                              }
                              className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                            >
                              Tolak
                            </button>
                          </div>
                        )}
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