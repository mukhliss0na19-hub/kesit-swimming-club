"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  // 🔥 WAJIB ADA INI
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("action", "login");
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin-login", "true");
        router.push("/admin/dashboard"); // ✔ sekarang tidak merah
      } else {
        alert(data.message || "Login gagal");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md"
      >

        <h1 className="mb-6 text-center text-2xl font-bold">
          Login Admin KESIT
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 py-3 text-white hover:bg-blue-800"
        >
          Masuk
        </button>

      </form>

    </div>
  );
}