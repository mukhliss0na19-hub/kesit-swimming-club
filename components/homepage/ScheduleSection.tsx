import {
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
} from "lucide-react";

export default function ScheduleSection() {
  return (
    <section
      id="jadwal"
      className="relative overflow-hidden bg-[#062715] py-14 text-white scroll-mt-28"
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute left-0 top-0 h-[220px] w-[220px] rounded-full bg-[#22C55E]/20 blur-[100px]" />

      <div className="absolute bottom-0 right-0 h-[220px] w-[220px] rounded-full bg-[#F5C518]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1250px] px-6">

        {/* TITLE */}
        <div className="mx-auto max-w-[700px] text-center">
          <span className="inline-flex rounded-full bg-[#0B6B32] px-4 py-2 text-xs font-black text-[#F5C518]">
            PROGRAM LATIHAN
          </span>

          <h2 className="mt-4 text-3xl font-black lg:text-4xl">
            Jadwal &
            <span className="text-[#F5C518]">
              {" "}Lokasi Latihan
            </span>
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-300">
            Kesit Swimming Club menyediakan program
            reguler, private, dan kelas prestasi
            dengan lokasi latihan yang fleksibel.
          </p>
        </div>

        {/* PROGRAM CARD */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">

          {/* REGULER */}
          <div className="group rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl transition duration-300 hover:border-[#F5C518] hover:bg-[#0B6B32]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B6B32] group-hover:bg-[#F5C518]">
              <CalendarDays
                size={24}
                className="text-[#F5C518] group-hover:text-[#062715]"
              />
            </div>

            <h3 className="mt-5 text-2xl font-black">
              Reguler Class
            </h3>

            <div className="mt-4 flex items-center gap-3 text-slate-300">
              <Clock size={20} className="text-[#F5C518]" />
              <p>Sabtu & Minggu</p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Program latihan reguler untuk
              anak dan remaja dengan metode
              belajar menyenangkan dan aman.
            </p>
          </div>

          {/* PRIVATE */}
          <div className="group rounded-[28px] border border-[#F5C518]/20 bg-gradient-to-br from-[#E5B80B]/10 to-[#0B6B32]/10 p-7 backdrop-blur-xl transition duration-300 hover:border-[#F5C518] hover:bg-[#0B6B32]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5C518]">
              <Clock
                size={24}
                className="text-[#062715]"
              />
            </div>

            <h3 className="mt-5 text-2xl font-black text-[#F5C518]">
              Private Class
            </h3>

            <div className="mt-4 flex items-center gap-3 text-slate-300">
              <CalendarDays
                size={20}
                className="text-[#F5C518]"
              />
              <p>Fleksibel / By Request</p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Jadwal latihan dapat disesuaikan
              dengan kebutuhan siswa dan
              kesepakatan bersama pelatih.
            </p>
          </div>

          {/* PRESTASI */}
          <div className="group rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl transition duration-300 hover:border-[#F5C518] hover:bg-[#0B6B32]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B6B32] group-hover:bg-[#F5C518]">
              <Trophy
                size={24}
                className="text-[#F5C518] group-hover:text-[#062715]"
              />
            </div>

            <h3 className="mt-5 text-2xl font-black">
              Kelas Prestasi
            </h3>

            <div className="mt-4 flex items-center gap-3 text-slate-300">
              <Trophy
                size={20}
                className="text-[#F5C518]"
              />
              <p>Pembinaan Atlet</p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Program pembinaan khusus
              bagi siswa yang ingin
              meningkatkan kemampuan
              hingga kompetisi renang.
            </p>
          </div>
        </div>

        {/* LOKASI */}
        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl">

          <div className="flex items-center gap-3">
            <MapPin className="text-[#F5C518]" />

            <h3 className="text-2xl font-black">
              Lokasi Latihan
            </h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* PUSAT */}
            <div className="rounded-2xl border border-[#F5C518]/30 bg-[#F5C518]/10 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F5C518]">
                Lokasi Utama
              </p>

              <h4 className="mt-2 text-lg font-black">
                Kolam Renang Danau Biru Albanawi, Pandantoyo
              </h4>
            </div>

            {/* CABANG */}
            <div className="rounded-2xl bg-[#0B6B32]/30 p-5">
              <p className="font-bold text-[#F5C518]">
                Familiza Nyoklat, Baron
              </p>
            </div>

            <div className="rounded-2xl bg-[#0B6B32]/30 p-5">
              <p className="font-bold text-[#F5C518]">
                Kuniran Taman
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}