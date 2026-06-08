"use client";

import { useState } from "react";

export default function DaftarPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    umur: "",
    gender: "",
    ortu: "",
    whatsapp: "",
    program: "",
    lokasi: "",
    jadwal: "",
    catatan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {

    const response =
      await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(form),
        }
      );

    const result =
      await response.json();

    if (!result.success) {
      throw new Error(
        "Gagal kirim"
      );
    }

    // Nomor admin
    const adminNumber =
      "6285859860032";

    // Pesan WA
    const message =
      `Halo Admin Kesit Swimming Club,

Saya sudah melakukan pendaftaran atas nama *${form.nama}*.

Program: ${form.program}
Lokasi: ${form.lokasi}
Jadwal: ${form.jadwal}

Mohon informasi langkah berikutnya. Terima kasih.`;

    // Encode pesan
    const encodedMessage =
      encodeURIComponent(
        message
      );

    // ALERT DULU
    alert(
      "Pendaftaran berhasil dikirim! Anda akan diarahkan ke WhatsApp Admin."
    );

    // REDIRECT WA (lebih stabil daripada window.open)
    window.location.href =
      `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    // Reset form
    setForm({
      nama: "",
      umur: "",
      gender: "",
      ortu: "",
      whatsapp: "",
      program: "",
      lokasi: "",
      jadwal: "",
      catatan: "",
    });

  } catch (error) {

    console.error(error);

    alert(
      "Terjadi kesalahan. Silakan coba lagi."
    );
  }

  setLoading(false);
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5FFF7] via-white to-[#EEF9F1] pt-[120px] pb-20">
      <div className="mx-auto max-w-5xl px-5">

        <div className="text-center">
          <div className="inline-flex rounded-full bg-[#DCFCE7] px-5 py-2 font-bold text-[#0B6B32]">
            🏊 Kesit Swimming Club
          </div>

          <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-6xl">
            Formulir
            <span className="text-[#0B6B32]">
              {" "}Pendaftaran
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Isi formulir berikut untuk bergabung bersama
            Kesit Swimming Club.
          </p>
        </div>

        <div className="mt-12 rounded-[40px] border border-[#DCFCE7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-12">

          <form
            onSubmit={handleSubmit}
            className="grid gap-8"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama Lengkap Siswa"
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              />

              <select
                name="umur"
                value={form.umur}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              >
                <option value="">
                  Pilih Umur
                </option>
                <option>3 Tahun</option>
                <option>4 Tahun</option>
                <option>5 Tahun</option>
                <option>6 Tahun</option>
                <option>7 Tahun</option>
                <option>8 Tahun</option>
                <option>9 Tahun</option>
                <option>10 Tahun</option>
                <option>11 Tahun</option>
                <option>12 Tahun</option>
                <option>13 Tahun</option>
                <option>14 Tahun</option>
                <option>15+ Tahun</option>
              </select>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              >
                <option value="">
                  Jenis Kelamin
                </option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>

              <input
                type="text"
                name="ortu"
                value={form.ortu}
                onChange={handleChange}
                placeholder="Nama Orang Tua / Wali"
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              />

              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="Nomor WhatsApp"
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              />

              <select
                name="program"
                value={form.program}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              >
                <option value="">
                  Pilih Program
                </option>
                <option>Reguler</option>
                <option>Private</option>
                <option>Prestasi</option>
              </select>

              <select
                name="lokasi"
                value={form.lokasi}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              >
                <option value="">
                  Pilih Lokasi
                </option>
                <option>Pandantoyo (Pusat)</option>
                <option>Familiza Baron Nyoklat</option>
                <option>Kuniran Taman</option>
              </select>

              <select
                name="jadwal"
                value={form.jadwal}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
              >
                <option value="">
                  Jadwal Latihan
                </option>
                <option>Reguler (Sabtu–Minggu)</option>
                <option>Private (Flexible)</option>
                <option>Kelas Prestasi</option>
              </select>
            </div>

            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Catatan tambahan"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0B6B32]"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#0B6B32] px-10 py-5 text-lg font-black text-white transition hover:bg-[#095528]"
            >
              {loading
                ? "Mengirim..."
                : "Kirim Pendaftaran"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}