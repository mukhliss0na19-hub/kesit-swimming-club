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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Pendaftaran Baru
        </h1>

        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-semibold">
          Total: {data.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
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
                    className="text-center p-10"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                data.map(
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
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
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
                          <span className="text-green-600 font-semibold">
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
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
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
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
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