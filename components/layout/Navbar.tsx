"use client";

import Link from "next/link";
import { useState } from "react";

const menu = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Galeri", href: "#galeri" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3">

      <div className="mx-auto max-w-[1400px]">

        {/* NAVBAR */}
        <div className="flex h-[70px] items-center justify-between rounded-full border border-white/30 bg-white/15 px-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:px-8">

          {/* LOGO */}
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-3">

              <img
                src="/logo-kesit.png"
                alt="Kesit Swimming Club"
                className="h-[42px] w-auto object-contain md:h-[46px]"
              />

              <div>
                <h1 className="text-[22px] font-black italic leading-none text-[#22C55E] md:text-[26px]">
                  KESIT
                </h1>

                <p className="text-[10px] font-bold tracking-[2px] text-[#F5C518] md:text-[12px]">
                  SWIMMING CLUB
                </p>
              </div>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-9 lg:flex">
            {menu.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[1.5px] text-black transition hover:text-[#0B6B32]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* BUTTON DESKTOP */}
            <Link
              href="/daftar"
              className="hidden rounded-full bg-[#E5B80B] px-7 py-3 text-sm font-black uppercase tracking-wide text-black shadow-lg transition duration-300 hover:scale-105 hover:bg-[#F3CB35] lg:block"
            >
              Daftar Sekarang
            </Link>

            {/* HAMBURGER MOBILE */}
            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="rounded-full bg-[#0B6B32] p-3 text-white lg:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="mt-3 rounded-3xl bg-white p-5 shadow-2xl lg:hidden">

            <nav className="flex flex-col gap-4">

              {menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="border-b border-slate-200 pb-3 text-sm font-bold uppercase tracking-wide text-slate-700"
                >
                  {item.label}
                </a>
              ))}

              {/* BUTTON MOBILE */}
              <Link
                href="/daftar"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="mt-3 rounded-full bg-[#E5B80B] px-6 py-4 text-center text-sm font-black uppercase text-black"
              >
                Daftar Sekarang
              </Link>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}