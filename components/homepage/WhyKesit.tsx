import {
  ShieldCheck,
  Trophy,
  Users,
  Waves,
} from "lucide-react";

const features = [
  {
    title: "Pelatih Profesional",
    description:
      "Didampingi pelatih berpengalaman dan metode latihan aman untuk anak & remaja.",
    icon: Users,
  },
  {
    title: "Pembinaan Prestasi",
    description:
      "Program pembinaan bagi siswa yang ingin berkembang hingga kompetisi renang.",
    icon: Trophy,
  },
  {
    title: "Aman & Terstruktur",
    description:
      "Materi disusun bertahap mulai pemula hingga mahir dengan pengawasan ketat.",
    icon: ShieldCheck,
  },
  {
    title: "Fasilitas Nyaman",
    description:
      "Kolam latihan nyaman dan lingkungan belajar yang menyenangkan.",
    icon: Waves,
  },
];

export default function WhyKesit() {
  return (
    <section
      id="tentang"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4FFF8] to-[#E8F7ED] py-24"
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#22C55E]/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F5C518]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6">

        {/* TITLE */}
        <div className="mx-auto max-w-[750px] text-center">
          <span className="inline-flex rounded-full border border-[#0B6B32]/20 bg-[#DCFCE7] px-5 py-2 text-sm font-black text-[#0B6B32]">
            KENAPA MEMILIH KESIT?
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            Tempat Belajar Renang yang
            <span className="text-[#0B6B32]">
              {" "}Aman
            </span>
            ,
            <span className="text-[#E5B80B]">
              {" "}Nyaman
            </span>
            & Berprestasi
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Kesit Swimming Club hadir sebagai tempat belajar
            renang anak dan remaja dengan metode latihan
            menyenangkan, disiplin, dan pembinaan prestasi.
          </p>
        </div>

        {/* FEATURE CARD */}
        <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-[32px] border border-white/40 bg-white/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-[#F5C518] hover:bg-gradient-to-br hover:from-[#0B6B32] hover:to-[#146C3B] hover:shadow-[0_10px_40px_rgba(229,184,11,0.35)]"
              >
                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#DCFCE7] transition duration-300 group-hover:bg-[#F5C518]">

                  <Icon
                    size={30}
                    className="text-[#0B6B32] transition duration-300 group-hover:text-white"
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-7 text-2xl font-black text-slate-900 transition duration-300 group-hover:text-white">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-4 leading-8 text-slate-600 transition duration-300 group-hover:text-slate-200">
                  {item.description}
                </p>

                {/* GOLD LINE */}
                <div className="mt-8 h-[4px] w-16 rounded-full bg-[#F5C518] transition duration-300 group-hover:w-28" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}