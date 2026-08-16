"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPelatihPage() {
  const router = useRouter();

  const [idPelatih, setIdPelatih] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!idPelatih.trim()) {
      setError("ID Pelatih wajib diisi.");
      return;
    }

    if (!password.trim()) {
      setError("Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/login-pelatih",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPelatih: idPelatih.trim(),
            password: password.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        setError(
          result.message ||
            "Login gagal."
        );

        setLoading(false);
        return;
      }

      // Simpan informasi dasar pelatih
      // untuk kebutuhan dashboard awal.
      sessionStorage.setItem(
        "pelatih",
        JSON.stringify({
          idPelatih:
            result.data.idPelatih,

          namaPelatih:
            result.data.namaPelatih,

          status:
            result.data.status,

          spesialis:
            result.data.spesialis,
        })
      );

      // Masuk ke dashboard pelatih
      router.push("/pelatih");
    } catch (error) {
      console.error(
        "LOGIN PELATIH:",
        error
      );

      setError(
        "Tidak dapat terhubung ke server."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* CARD */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* HEADER */}

          <div className="text-center mb-8">

            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-4">
              🏊
            </div>

            <h1 className="text-3xl font-black text-green-700">
              Kesit Swimming Club
            </h1>

            <p className="text-gray-500 mt-2">
              Portal Pelatih
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* ID PELATIH */}

            <div>

              <label
                htmlFor="idPelatih"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                ID Pelatih
              </label>

              <input
                id="idPelatih"
                type="text"
                value={idPelatih}
                onChange={(e) =>
                  setIdPelatih(
                    e.target.value
                  )
                }
                placeholder="Contoh: PLT001"
                autoComplete="username"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-bold rounded-xl py-3 transition"
            >
              {loading
                ? "Memeriksa..."
                : "Masuk"}
            </button>

          </form>

          {/* INFO */}

          <div className="text-center mt-6">

            <p className="text-xs text-gray-400 leading-relaxed">
              Halaman ini khusus untuk
              pelatih Kesit Swimming Club.
              <br />
              Gunakan ID Pelatih dan
              password yang telah diberikan.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}