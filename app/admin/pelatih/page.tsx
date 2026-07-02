"use client";

import { useEffect, useState } from "react";

interface Pelatih {
  ID: string;
  "Nama Pelatih": string;
  Status: string;
  WhatsApp: string;
  Spesialis: string;
}

export default function PelatihPage() {

  const [data, setData] =
    useState<Pelatih[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadData = async () => {
    try {

      const res =
        await fetch(
          "/api/pelatih"
        );

      const result =
        await res.json();

      setData(
        result.data || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Data Pelatih
        </h1>

        <button
          className="rounded-lg bg-blue-700 px-4 py-2 text-white"
        >
          + Tambah Pelatih
        </button>

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
                  WhatsApp
                </th>

                <th className="p-4 text-left">
                  Spesialis
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
                    colSpan={5}
                    className="p-10 text-center"
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
                      className="border-b"
                    >

                      <td className="p-4">
                        {item.ID}
                      </td>

                      <td className="p-4">
                        {item["Nama Pelatih"]}
                      </td>

                      <td className="p-4">
                        {item.WhatsApp}
                      </td>

                      <td className="p-4">
                        {item.Spesialis}
                      </td>

                      <td className="p-4">
                        {item.Status}
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