"use client";

import Link from "next/link";

const menu = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Galeri", href: "#galeri" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-5 pt-3">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between rounded-full border border-white/30 bg-white/15 px-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl">

        {/* LEFT LOGO */}
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-3">

            <img
              src="/logo-kesit.png"
              alt="Kesit Swimming Club"
              className="h-[46px] w-auto object-contain"
            />

            <div>
              <h1 className="text-[26px] font-black italic leading-none text-[#22C55E]">
                KESIT
              </h1>

              <p className="text-[12px] font-bold tracking-[2px] text-[#F5C518]">
                 SWIMMING CLUB
              </p>
            </div>
          </div>
        </Link>

        {/* MENU */}
        <nav className="hidden items-center gap-9 lg:flex">
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-bold uppercase tracking-[1.5px] text-black transition duration-300 hover:text-[#0B6B32]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* BUTTON */}
        <a href="#daftar">
          <button className="rounded-full bg-[#E5B80B] px-7 py-3 text-sm font-black uppercase tracking-wide text-black shadow-lg transition duration-300 hover:scale-105 hover:bg-[#F3CB35]">
            Daftar Sekarang
          </button>
        </a>
      </div>
    </header>
  );
}