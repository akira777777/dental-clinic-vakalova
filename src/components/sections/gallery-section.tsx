"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  id: string;
  service: string;
  before: string;
  after: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    service: "Отбеливание зубов",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Профессиональное отбеливание ZOOM. Результат после 1 процедуры.",
  },
  {
    id: "2",
    service: "Виниры",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Установка керамических виниров. Преображение улыбки.",
  },
  {
    id: "3",
    service: "Имплантация",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Имплантация с немедленной нагрузкой. Восстановление зубного ряда.",
  },
  {
    id: "4",
    service: "Брекеты",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Ортодонтическое лечение. Коррекция прикуса за 18 месяцев.",
  },
  {
    id: "5",
    service: "Протезирование",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Полное протезирование верхней челюсти. Естественный вид.",
  },
  {
    id: "6",
    service: "Лечение кариеса",
    before: "https://placehold.co/600x400/e5e7eb/64748b?text=До",
    after: "https://placehold.co/600x400/ecfccb/65a30d?text=После",
    description: "Реставрация зубов композитными материалами премиум-класса.",
  },
];

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const services = ["all", ...Array.from(new Set(galleryItems.map(item => item.service)))];

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.service === filter);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedItem) return;

    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const newIndex = direction === "next"
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;

    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            Наши работы
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
            Результаты наших пациентов
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-neutral-600">
            Реальные фотографии до и после лечения. Мы гордимся результатами нашей работы!
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <Button
              key={service}
              variant={filter === service ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(service)}
            >
              {service === "all" ? "Все услуги" : service}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-large"
              onClick={() => openLightbox(item)}
            >
              <div className="relative">
                {/* Before/After Split View */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative">
                      <Image
                        src={item.before}
                        alt="До лечения"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white z-10">
                        ДО
                      </div>
                    </div>
                    <div className="relative">
                      <Image
                        src={item.after}
                        alt="После лечения"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 rounded bg-accent-500 px-2 py-1 text-xs font-semibold text-white z-10">
                        ПОСЛЕ
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white shadow-lg" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-semibold text-white">
                    Нажмите для увеличения
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-1 font-semibold text-neutral-900">
                  {item.service}
                </h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              className="max-w-5xl w-full animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.before}
                      alt="До лечения"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center text-sm font-semibold text-white">
                    ДО
                  </div>
                </div>
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.after}
                      alt="После лечения"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center text-sm font-semibold text-white">
                    ПОСЛЕ
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-neutral-900">
                  {selectedItem.service}
                </h3>
                <p className="text-neutral-700">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
