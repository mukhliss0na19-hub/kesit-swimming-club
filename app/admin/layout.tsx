"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Pendaftaran", href: "/admin/pendaftaran" },
  { name: "Data Siswa", href: "/admin/siswa" },
  { name: "Absensi", href: "/admin/absensi" },
  { name: "Absensi-prestasi", href: "/admin/Absensi-prestasi" },
  { name: "pelatih", href: "/admin/pelatih"},
  { name: "Progress", href: "/admin/progress" },
 ];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">
          KESIT Admin
        </h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}