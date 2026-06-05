"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const galleryImages = [
  "/gallery/gallery-1.jpg",
  "/gallery/gallery-2.jpg",
  "/gallery/gallery-3.jpg",
  "/gallery/gallery-4.jpg",
  "/gallery/gallery-5.jpg",
  "/gallery/gallery-6.jpg",
  "/gallery/gallery-7.jpg",
];

export default function GallerySection() {
  return (
    <section
      id="galeri"
      className="relative overflow-hidden bg-[#062715] py-20 text-white"
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-[#22C55E]/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#F5C518]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1350px] px-6">

        {/* TITLE */}
        <div className="mx-auto max-w-[700px] text-center">
          <span className="inline-flex rounded-full bg-[#0B6B32] px-5 py-2 text-sm font-black text-[#F5C518]">
            GALERI KESIT
          </span>

          <h2 className="mt-5 text-3xl font-black lg:text-5xl">
            Momen
            <span className="text-[#F5C518]">
              {" "}Latihan &
            </span>

            <span className="text-[#22C55E]">
              {" "}Prestasi
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-300">
            Dokumentasi latihan reguler,
            private class, pembinaan prestasi,
            dan kegiatan siswa Kesit Swimming Club.
          </p>
        </div>

        {/* SLIDER */}
        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="rounded-[32px]"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-lg">

                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-[#0B6B32] to-[#146C3B] p-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5C518] shadow-lg">

                    <img
                        src="/logo-kesit.png"
                        alt="Kesit Swimming Club"
                        className="h-12 w-12 object-contain"
                    />

                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[2px] text-[#F5C518]">
                        Kesit Swimming Club
                      </p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}