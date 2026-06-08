export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Admin
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Siswa
          </h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Pendaftaran Baru
          </h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Absensi Hari Ini
          </h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>
      </div>
    </div>
  );
}