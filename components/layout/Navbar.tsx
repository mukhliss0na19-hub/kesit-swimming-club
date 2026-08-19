"use client";

import LoginModal from "@/components/auth/LoginModal";
import Link from "next/link";
import { useState } from "react";

const menu = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Galeri", href: "#galeri" },
  { label: "Laporan Siswa", href: "#laporan" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  // Popup login Admin
  const [showLogin, setShowLogin] = useState(false);

  // Popup pilihan jenis login
  const [showLoginChoice, setShowLoginChoice] = useState(false);

  // Buka pilihan login
  const openLoginChoice = () => {
    setShowLoginChoice(true);
  };

  // Pilih Login Admin
  const openAdminLogin = () => {
    setShowLoginChoice(false);
    setShowLogin(true);
  };

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3">
      <div className="mx-auto max-w-[1400px]">

        {/* NAVBAR */}
        <div className="flex h-[70px] items-center justify-between rounded-full border border-white/30 bg-white/15 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:px-8">

          {/* LOGO */}
          <Link href="/">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src="/logo-kesit.png"
                alt="Kesit Swimming Club"
                className="h-[40px] w-auto md:h-[46px]"
              />

              <div>
                <h1 className="text-[18px] font-black italic text-[#22C55E] md:text-[26px]">
                  KESIT
                </h1>

                <p className="text-[8px] font-bold tracking-[1.5px] text-[#F5C518] md:text-[12px]">
                  SWIMMING CLUB
                </p>
              </div>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-7 lg:flex">
            {menu.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[1.5px] text-black hover:text-[#0B6B32]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* DAFTAR */}
            <Link
              href="/daftar"
              className="rounded-full bg-[#E5B80B] px-4 py-2 text-xs font-black text-black md:px-6 md:py-3 md:text-sm"
            >
              Daftar
            </Link>

            {/* LOGIN - DESKTOP */}
            <button
              onClick={openLoginChoice}
              className="hidden rounded-full bg-black px-5 py-3 text-sm font-bold text-white lg:block"
            >
              Login
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-full bg-[#0B6B32] p-3 text-white lg:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="mt-3 rounded-3xl bg-white p-5 shadow-2xl lg:hidden">

            {menu.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="block border-b py-3 text-sm font-bold"
              >
                {item.label}
              </a>
            ))}

            {/* LOGIN MOBILE */}
            <button
              onClick={() => {
                setMobileMenu(false);
                setShowLoginChoice(true);
              }}
              className="mt-4 block w-full rounded-xl bg-black py-3 text-center font-bold text-white"
            >
              Login
            </button>

          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* POPUP PILIHAN LOGIN */}
      {/* ================================================= */}

      {showLoginChoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            {/* CLOSE */}
            <button
              onClick={() => setShowLoginChoice(false)}
              className="absolute right-5 top-4 text-2xl font-bold text-gray-400 hover:text-gray-700"
            >
              ×
            </button>

            {/* TITLE */}
            <div className="mb-7 text-center">
              <h2 className="text-2xl font-black text-[#0B6B32]">
                Login
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Silakan pilih jenis akun Anda
              </p>
            </div>

            {/* LOGIN ADMIN */}
            <button
              onClick={openAdminLogin}
              className="mb-4 w-full rounded-2xl bg-black px-5 py-4 text-center font-bold text-white transition hover:bg-gray-800"
            >
              🔐 Login Admin
            </button>

            {/* LOGIN PELATIH */}
            <Link
              href="/pelatih/login"
              onClick={() => setShowLoginChoice(false)}
              className="block w-full rounded-2xl bg-[#0B6B32] px-5 py-4 text-center font-bold text-white transition hover:bg-[#075425]"
            >
              🏊 Login Pelatih
            </Link>

          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* POPUP LOGIN ADMIN YANG SUDAH ADA */}
      {/* ================================================= */}

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

    </header>
  );
}