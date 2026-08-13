"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Siswa = {
  idSiswa: string;
  namaSiswa: string;
};

export default function LaporanSiswaPage() {

  const router =
    useRouter();

  const [siswa, setSiswa] =
    useState<Siswa | null>(null);

  useEffect(() => {

    const data =
      sessionStorage.getItem(
        "portalSiswa"
      );

    if (!data) {

      router.replace(
        "/"
      );

      return;
    }

    try {

      const parsed =
        JSON.parse(data);

      setSiswa(parsed);

    } catch {

      sessionStorage.removeItem(
        "portalSiswa"
      );

      router.replace(
        "/"
      );

    }

  }, [router]);


  function logout() {

    sessionStorage.removeItem(
      "portalSiswa"
    );

    router.push("/");
  }


  if (!siswa) {

    return (

      <main className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        Memuat...
      </main>

    );

  }


  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-green-50
      via-white
      to-green-100
      p-6
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          mb-6
          flex
          justify-between
          items-center
        ">

          <div>

            <p className="
              text-sm
              text-gray-500
            ">
              Portal Orang Tua
            </p>

            <h1 className="
              text-3xl
              font-black
              text-green-700
            ">
              {siswa.namaSiswa}
            </h1>

            <p className="
              text-gray-500
              mt-1
            ">
              ID Siswa: {siswa.idSiswa}
            </p>

          </div>

          <button
            onClick={logout}
            className="
              border
              border-red-300
              text-red-600
              rounded-xl
              px-4
              py-2
              hover:bg-red-50
            "
          >
            Keluar
          </button>

        </div>


        {/* KARTU LAPORAN */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              📅
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Kehadiran
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Riwayat kehadiran latihan
              siswa.
            </p>

          </div>


          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              🏊
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Perkembangan Renang
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Teknik dan kemampuan
              berenang siswa.
            </p>

          </div>


          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              ⚡
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Kecepatan
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Catatan perkembangan
              waktu berenang.
            </p>

          </div>


          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              💳
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Pembayaran
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Paket, pembayaran,
              dan sisa paket.
            </p>

          </div>


          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              🏆
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Prestasi
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Perkembangan dan
              prestasi siswa.
            </p>

          </div>


          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <div className="text-3xl mb-3">
              📝
            </div>

            <h2 className="
              text-xl
              font-bold
            ">
              Catatan Pelatih
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Catatan dan evaluasi
              dari pelatih.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}