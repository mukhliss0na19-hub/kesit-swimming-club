export default function FloatingWhatsApp() {
  const whatsappNumber = "6285859860032";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Halo%20Kesit%20Swimming%20Club,%20saya%20ingin%20bertanya%20tentang%20kelas%20renang`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-white shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-110"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <img
          src="/whatsapp.png"
          alt="WhatsApp"
          className="h-7 w-7 object-contain"
        />
      </div>

      <div className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-[1px]">
          Chat Admin
        </p>

        <p className="text-sm font-black">
          WhatsApp Kesit
        </p>
      </div>
    </a>
  );
}