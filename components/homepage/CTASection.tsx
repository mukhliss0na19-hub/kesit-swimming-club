export default function CTASection() {
  const whatsappNumber = "6285859860032";

  return (
    <section
      id="daftar"
      className="relative overflow-hidden bg-[#062715] py-20 text-white"
    >
      {/* EFFECT */}
      <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-[#22C55E]/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#F5C518]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">

        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0B6B32] to-[#062715] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] lg:p-16">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* LEFT */}
            <div>
              <span className="inline-flex rounded-full bg-[#F5C518]/20 px-5 py-2 text-sm font-black uppercase tracking-[2px] text-[#F5C518]">
                Daftar Sekarang
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight lg:text-5xl">
                Siap Belajar Renang
                <span className="text-[#F5C518]">
                  {" "}Bersama Kesit?
                </span>
              </h2>

              <p className="mt-5 max-w-[550px] text-lg leading-8 text-slate-300">
                Konsultasikan kebutuhan latihan renang
                anak Anda bersama pelatih profesional
                Kesit Swimming Club.
              </p>

              {/* BENEFIT */}
              <div className="mt-8 space-y-3">

                <div className="flex items-center gap-3">
                  <span className="text-[#F5C518]">✓</span>
                  <p>Pelatih berpengalaman</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#F5C518]">✓</span>
                  <p>Program aman & menyenangkan</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#F5C518]">✓</span>
                  <p>Kelas reguler, private & prestasi</p>
                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-[36px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5C518] shadow-xl">

                  <img
                    src="/logo-kesit.png"
                    alt="Kesit Swimming Club"
                    className="h-14 w-14 object-contain"
                  />

                </div>
              </div>

              <h3 className="mt-6 text-center text-2xl font-black">
                KESIT SWIMMING CLUB
              </h3>

              <p className="mt-3 text-center text-slate-300">
                Hubungi admin sekarang dan konsultasikan
                program latihan renang terbaik.
              </p>

              {/* BUTTON */}
              <div className="mt-8 flex flex-col gap-4">

              {/* DAFTAR VIA WHATSAPP */}
              <a
                 href={`https://wa.me/${whatsappNumber}?text=Halo%20Kesit%20Swimming%20Club,%20saya%20ingin%20bertanya%20tentang%20kelas%20renang`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-[#F5C518] bg-[#0B6B32] px-8 py-4 text-center text-lg font-black text-white transition duration-300 hover:scale-105 hover:bg-[#0F7C3A]"
              >
                Daftar via WhatsApp
              </a>

              {/* DAFTAR SEKARANG */}
              <a
                href="/daftar"
                className="rounded-full border-2 border-black bg-[#F5C518] px-8 py-4 text-center text-lg font-black text-black transition duration-300 hover:scale-105 hover:bg-[#FFD84D]"
              >
                Daftar Sekarang
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}