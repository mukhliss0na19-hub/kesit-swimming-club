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

        // FILTER SISWA AKTIF
        const siswaAktif =
          result.filter(
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
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
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

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
          Total: {
            data.length
          } siswa
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
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
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={
                      10
                    }
                    className="text-center p-10"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={
                      10
                    }
                    className="text-center p-10 text-slate-500"
                  >
                    Belum ada
                    siswa aktif
                  </td>
                </tr>
              ) : (
                data.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                      className="border-b hover:bg-slate-50 transition"
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
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Aktif
                        </span>
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