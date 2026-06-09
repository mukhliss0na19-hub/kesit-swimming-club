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
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [showLogin, setShowLogin] =
  useState(false);

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

            {/* ADMIN LOGIN - DESKTOP */}
            <button
              onClick={() =>
              setShowLogin(true)
              }
                className="hidden rounded-full bg-black px-5 py-3 text-sm font-bold text-white lg:block"
            >
              Admin Login
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

           {/* ADMIN LOGIN MOBILE */}
            <button
                onClick={() => {
                setMobileMenu(false);
                setShowLogin(true);
                }}
                  className="mt-4 block w-full rounded-xl bg-black py-3 text-center font-bold text-white"
            >
            Admin Login
            </button>

          </div>
        )}
      </div>
      <LoginModal
        isOpen={showLogin}
        onClose={() =>
        setShowLogin(false)
        }
      />
    </header>
  );
}