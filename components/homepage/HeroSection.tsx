export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-black pt-[120px]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-swimming.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03180D]/95 via-[#03180D]/80 to-transparent" />

      {/* GREEN EFFECT */}
      <div className="absolute left-0 top-0 h-full w-[45%] bg-[#0B6B32]/30 blur-[120px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-[1400px] items-center px-6">
        <div className="max-w-[700px]">

          <div className="mb-5 inline-flex rounded-full border border-[#E5B80B]/50 bg-[#0B6B32]/70 px-5 py-2 text-sm font-semibold text-[#E5B80B] backdrop-blur">
            🏊 Kesit Swimming Club
          </div>

          <h1 className="text-3xl font-black uppercase leading-[1.05] text-white lg:text-5xl">
            Belajar Renang
            <br />

            <span className="text-[#22C55E]">
              Aman,
            </span>

            <br />

            Disiplin &
            <br />

            <span className="text-[#F5C518]">
              Berprestasi
            </span>
          </h1>

          <p className="mt-6 max-w-[560px] text-base leading-7 text-slate-200">
            Program renang anak & remaja mulai
            pemula hingga prestasi bersama
            pelatih profesional Kesit Swimming Club.
          </p>

          {/* BUTTON */}
          <div className="mt-7 flex flex-wrap gap-4">
            <button className="rounded-full bg-[#0B6B32] px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-[#075324]">
              DAFTAR SEKARANG →
            </button>

            <button className="rounded-full border border-[#E5B80B] bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/20">
              LIHAT JADWAL
            </button>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-6 text-white">
            <div>
              <h3 className="text-4xl font-black text-[#F5C518]">
                3+
              </h3>
              <p className="font-medium text-slate-300">
                Tahun Berdiri
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-[#F5C518]">
                50+
              </h3>
              <p className="font-medium text-slate-300">
                Siswa Aktif
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-[#F5C518]">
                10+
              </h3>
              <p className="font-medium text-slate-300">
                Juara Lomba
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MASCOT */}
      <img
        src="/logo-kesit.png"
        alt="Kesit Mascot"
        className="absolute bottom-0 right-10 z-10 hidden w-[240px] lg:block"
      />

      {/* GOLD LINE */}
      <div className="absolute bottom-0 left-0 h-[5px] w-full bg-[#F5C518]" />
    </section>
  );
}