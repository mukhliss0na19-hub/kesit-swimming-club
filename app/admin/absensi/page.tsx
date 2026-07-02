"use client";

import {
  useEffect,
  useState,
} from "react";

interface Siswa {
  ID: string;
  Nama: string;
  Program: string;
  Lokasi: string;
  Status?: string;
}

export default function AbsensiPage() {
  const [data, setData] =
    useState<Siswa[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filterProgram, setFilterProgram] =
    useState("Semua");

  const loadData =
  async () => {
    try {
      const res =
        await fetch(
          "/api/absensi",
          {
            cache:
              "no-store",
          }
        );

      const result =
        await res.json();

      setData(
        Array.isArray(result?.data)
          ? result.data
          : []
      );

    } catch (error) {
      console.error(error);

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHadir =
    async (
      siswa: Siswa
    ) => {
      try {
        const res =
          await fetch(
            "/api/absensi",
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  {
                    id:
                      siswa.ID,
                    nama:
                      siswa.Nama,
                    program:
                      siswa.Program,
                  }
                ),
            }
          );

        const result =
          await res.json();

        if (
          result.success
        ) {
          alert(
            `Absensi berhasil\nPertemuan ke-${result.pertemuanKe}`
          );
        } else {
          alert(
            result.message
          );
        }
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Gagal absensi"
        );
      }
    };

  const filteredData =
    filterProgram ===
    "Semua"
      ? data
      : data.filter(
          (
            item
          ) =>
            item.Program ===
            filterProgram
        );

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Absensi
          </h1>

          <p className="text-slate-500">
            Kehadiran siswa
            Kesit Swimming
            Club
          </p>
        </div>

        <select
          value={
            filterProgram
          }
          onChange={(
            e
          ) =>
            setFilterProgram(
              e.target
                .value
            )
          }
          className="rounded-lg border p-3"
        >
          <option>
            Semua
          </option>

          <option>
            Reguler
          </option>

          <option>
            Private
          </option>
        </select>
      </div>

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
                  Program
                </th>

                <th className="p-4 text-left">
                  Lokasi
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
                    colSpan={
                      5
                    }
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredData.map(
                  (
                    siswa,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4 font-semibold text-blue-700">
                        {
                          siswa.ID
                        }
                      </td>

                      <td className="p-4 font-medium">
                        {
                          siswa.Nama
                        }
                      </td>

                      <td className="p-4">
                        {
                          siswa.Program
                        }
                      </td>

                      <td className="p-4">
                        {
                          siswa.Lokasi
                        }
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleHadir(
                              siswa
                            )
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Hadir
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