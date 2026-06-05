const achievements = [
  {
    number: "50+",
    title: "Siswa Aktif",
    icon: "🏊",
  },
  {
    number: "10+",
    title: "Juara Kompetisi",
    icon: "🥇",
  },
  {
    number: "5+",
    title: "Pelatih Profesional",
    icon: "👨‍🏫",
  },
  {
    number: "100%",
    title: "Pendampingan Terarah",
    icon: "📈",
  },
];

export default function AchievementSection() {
  return (
    <section
    id="prestasi"
    className="bg-[#0B6B32] py-24 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="font-semibold text-[#E5B80B]">
            Prestasi Kesit
          </span>

          <h2 className="mt-3 text-3xl font-bold lg:text-5xl">
            Membangun Generasi
            Atlet Renang Berprestasi
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-green-100">
            Kesit Swimming Club berkomitmen
            membina anak-anak dan remaja
            menjadi pribadi disiplin,
            sehat, dan berprestasi.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="rounded-[32px] bg-white/10 p-8 text-center backdrop-blur"
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <div className="mt-4 text-4xl font-black text-[#E5B80B]">
                {item.number}
              </div>

              <h3 className="mt-3 text-lg font-semibold">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}