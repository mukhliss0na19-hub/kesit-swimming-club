import {
  Music2,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#03170D] text-white">

      {/* EFFECT */}
      <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-[#22C55E]/10 blur-[100px]" />

      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-[#F5C518]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1350px] px-6 pt-16 pb-8">

        <div className="grid gap-10 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5C518] shadow-lg">
                <img
                  src="/logo-kesit.png"
                  alt="Kesit Swimming Club"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl font-black italic text-[#22C55E]">
                  KESIT
                </h3>

                <p className="text-sm font-bold uppercase tracking-[2px] text-[#F5C518]">
                  Swimming Club
                </p>
              </div>
            </div>

            <p className="mt-5 leading-7 text-slate-400">
              Tempat kursus renang anak dan remaja
              dengan metode aman, menyenangkan,
              dan pembinaan prestasi.
            </p>
          </div>

          {/* MENU */}
          <div>
            <h4 className="text-lg font-black text-[#F5C518]">
              Menu
            </h4>

            <div className="mt-5 space-y-3 text-slate-300">
              <a href="#beranda" className="block hover:text-[#F5C518]">
                Beranda
              </a>

              <a href="#tentang" className="block hover:text-[#F5C518]">
                Tentang
              </a>

              <a href="#program" className="block hover:text-[#F5C518]">
                Program
              </a>

              <a href="#jadwal" className="block hover:text-[#F5C518]">
                Jadwal
              </a>

              <a href="#galeri" className="block hover:text-[#F5C518]">
                Galeri
              </a>
            </div>
          </div>

          {/* LOKASI */}
          <div>
            <h4 className="text-lg font-black text-[#F5C518]">
              Lokasi Latihan
            </h4>

            <div className="mt-5 space-y-4 text-slate-300">

              <div className="flex gap-3">
                <MapPin className="mt-1 text-[#22C55E]" size={18} />
                <p>Pandantoyo (Pusat)</p>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-1 text-[#22C55E]" size={18} />
                <p>Familiza Baron Yoklat</p>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-1 text-[#22C55E]" size={18} />
                <p>Kuniran Taman</p>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-black text-[#F5C518]">
              Kontak
            </h4>

            <div className="mt-5 flex items-center gap-3 text-slate-300">
              <Phone className="text-[#22C55E]" size={18} />
              <p>0858-5986-0032</p>
            </div>

           {/* SOCIAL */}
            <div className="mt-8 flex gap-4">

          {/* INSTAGRAM */}
            <a
               href="https://instagram.com/Kesitswimacademy"
               target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-black transition hover:scale-110 hover:bg-[#F5C518] hover:text-black"
            >
               IG
          </a>

          {/* FACEBOOK */}
          <a
            href="https://facebook.com/Kesitswimacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-black transition hover:scale-110 hover:bg-[#F5C518] hover:text-black"
         >
            FB
         </a>

        {/* TIKTOK */}
        <a
           href="https://tiktok.com/@Kesitswimacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:scale-110 hover:bg-[#F5C518] hover:text-black"
        >
        <Music2 size={20} />
         </a>

          </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2026 Kesit Swimming Club. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}