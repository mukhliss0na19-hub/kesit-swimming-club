import {
  Baby,
  Waves,
  UserRound,
  Trophy,
} from "lucide-react";

const programs = [
  {
    title: "Kelas Reguler",
    description:
      "Latihan rutin untuk meningkatkan teknik dasar, stamina, dan kemampuan renang secara bertahap bersama pelatih berpengalaman.",
    schedule: "Sabtu & Minggu",
    location: [
      "Kolam Renang Danau Biru Albanawi, Pandantoyo",
      "Familiza Nyoklat, Baron",
      "Kuniran Taman",
    ],
    icon: Waves,
  },
  {
    title: "Private Class",
    description:
      "Program latihan privat dengan pendampingan intensif dan fokus pada kebutuhan siswa secara personal untuk hasil yang lebih maksimal.",
    schedule: "Fleksibel sesuai request",
    location: [
      "Kolam Renang Danau Biru Albanawi, Pandantoyo",
      "Familiza Nyoklat, Baron",
      "Kuniran Taman",
    ],
    icon: UserRound,
  },
  {
    title: "Kelas Prestasi",
    description:
      "Program pembinaan atlet renang untuk meningkatkan performa, teknik lanjutan, dan persiapan mengikuti kejuaraan atau kompetisi.",
    schedule: "Menyesuaikan program latihan atlet",
    location: [
      "Kolam Renang Danau Biru Albanawi, Pandantoyo",
      "Familiza Nyoklat, Baron",
      "Kuniran Taman",
    ],
    icon: Trophy,
  },
];

export default function ProgramSection() {
  return (
    <section
      id="program"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#F3FBF5] py-20"
    >
      {/* EFFECT */}
      <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-[#22C55E]/10 blur-[100px]" />

      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-[#F5C518]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1300px] px-6">

        {/* TITLE */}
        <div className="mx-auto max-w-[700px] text-center">
          <span className="inline-flex rounded-full border border-[#0B6B32]/20 bg-[#DCFCE7] px-5 py-2 text-sm font-black text-[#0B6B32]">
            PROGRAM KESIT
          </span>

          <h2 className="mt-5 text-3xl font-black text-slate-900 lg:text-5xl">
            Pilihan
            <span className="text-[#0B6B32]">
              {" "}Program Renang
            </span>

            <span className="text-[#E5B80B]">
              {" "}Terbaik
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Kesit Swimming Club menyediakan berbagai
            program latihan sesuai usia, kemampuan,
            dan kebutuhan siswa.
          </p>
        </div>

        {/* CARD */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#F5C518] hover:bg-gradient-to-br hover:from-[#0B6B32] hover:to-[#146C3B] hover:shadow-[0_10px_40px_rgba(229,184,11,0.25)]"
              >
                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#DCFCE7] transition duration-300 group-hover:bg-[#F5C518]">

                  <Icon
                    size={30}
                    className="text-[#0B6B32] transition duration-300 group-hover:text-white"
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-2xl font-black text-slate-900 transition duration-300 group-hover:text-white">
                  {item.title}
                </h3>

                {/* DESC */}
<p className="mt-4 text-sm leading-7 text-slate-600 transition duration-300 group-hover:text-slate-200">
  {item.description}
</p>

{/* JADWAL */}
<div className="mt-5">
  <p className="text-xs font-black uppercase tracking-wide text-[#0B6B32] transition duration-300 group-hover:text-[#F5C518]">
    Jadwal
  </p>

  <p className="mt-1 text-sm text-slate-600 transition duration-300 group-hover:text-slate-200">
    {item.schedule}
  </p>
</div>

{/* LOKASI */}
<div className="mt-4">
  <p className="text-xs font-black uppercase tracking-wide text-[#0B6B32] transition duration-300 group-hover:text-[#F5C518]">
    Lokasi Latihan
  </p>

  <div className="mt-2 space-y-1">
    {item.location.map((place, i) => (
      <p
        key={i}
        className="text-sm text-slate-600 transition duration-300 group-hover:text-slate-200"
      >
        • {place}
      </p>
    ))}
  </div>
</div>

{/* LINE */}
<div className="mt-6 h-[4px] w-16 rounded-full bg-[#F5C518] transition duration-300 group-hover:w-28" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}