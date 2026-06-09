"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData =
        new URLSearchParams();

      formData.append(
        "action",
        "login"
      );

      formData.append(
        "username",
        username
      );

      formData.append(
        "password",
        password
      );

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      if (data.success) {
        localStorage.setItem(
          "admin-login",
          "true"
        );

        onClose();

        router.push(
          "/admin/dashboard"
        );
      } else {
        alert(
          data.message ||
            "Login gagal"
        );
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-[32px] border border-[#F5C518]/30 bg-white p-8 shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl font-bold text-slate-500 hover:text-black"
        >
          ×
        </button>

        {/* TITLE */}
        <div className="mb-7 text-center">
          <img
            src="/logo-kesit.png"
            alt="KESIT"
            className="mx-auto mb-4 h-20"
          />

          <h2 className="text-3xl font-black text-[#0B6B32]">
            Login Admin
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Masuk ke dashboard KESIT
          </p>
        </div>

        <form
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="mb-4 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-[#0B6B32]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="mb-5 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-[#0B6B32]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl border-2 border-[#F5C518] bg-[#0B6B32] py-4 font-black text-white transition hover:scale-[1.02]"
          >
            {loading
              ? "Memproses..."
              : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}