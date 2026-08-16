"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LaporanLoginPage() {
  const router = useRouter();

  const [idSiswa, setIdSiswa] = useState("");
  const [namaSiswa, setNamaSiswa] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================
  // AMBIL DATA DARI URL
  // ==========================
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const id = params.get("id") || "";
    const nama = params.get("nama") || "";

    setIdSiswa(id);
    setNamaSiswa(nama);
  }, []);

  // ==========================
  // LOGIN
  // ==========================
  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!idSiswa) {
      setError(
        "ID siswa tidak ditemukan."
      );
      return;
    }

    if (!password.trim()) {
      setError(
        "Password harus diisi."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/login-orangtua",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            idSiswa,
            password,
          }),
        }
      );

      const result =
        await res.json();

      if (!result.success) {
        setError(
          result.message ||
            "Login gagal."
        );

        setLoading(false);
        return;
      }

      // ==========================
      // SIMPAN SESSION SEMENTARA
      // ==========================
      sessionStorage.setItem(
        "portalSiswa",
        JSON.stringify({
          idSiswa:
            result.data.idSiswa,

          namaSiswa:
            result.data.namaSiswa,
        })
      );

      // ==========================
      // MASUK KE LAPORAN SISWA
      // ==========================
      router.push(
        "/laporan/siswa"
      );
    } catch (err) {
      console.error(err);

      setError(
        "Tidak dapat terhubung ke server."
      );
    }

    setLoading(false);
  }

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-green-50
        via-white
        to-green-100
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <div
            className="
              mx-auto
              w-20
              h-20
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              text-4xl
              mb-4
            "
          >
            🏊
          </div>

          <h1
            className="
              text-3xl
              font-black
              text-green-700
            "
          >
            Laporan Siswa
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Portal Orang Tua
          </p>
        </div>

        {/* SISWA */}
        <div
          className="
            bg-green-50
            rounded-2xl
            p-4
            mb-6
          "
        >
          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Siswa
          </p>

          <p
            className="
              text-xl
              font-bold
              text-green-800
            "
          >
            {namaSiswa || "Siswa"}
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Masukkan password"
              autoComplete="current-password"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200
                text-red-700
                rounded-xl
                p-3
                text-sm
              "
            >
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-700
              hover:bg-green-800
              disabled:bg-gray-400
              text-white
              font-bold
              rounded-xl
              py-3
              transition
            "
          >
            {loading
              ? "Memeriksa..."
              : "Masuk ke Laporan"}
          </button>
        </form>

        {/* INFO */}
        <p
          className="
            text-xs
            text-gray-400
            text-center
            mt-6
            leading-relaxed
          "
        >
          Halaman ini khusus untuk
          orang tua siswa.
          <br />
          Data siswa bersifat pribadi
          dan tidak dapat diakses
          tanpa password.
        </p>
      </div>
    </main>
  );
}