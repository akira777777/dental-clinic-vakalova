# 🖼️ Как добавить фото "До и После" на сайт

**Практическое руководство**
**Дата:** 20 января 2026

---

## 📋 Быстрый старт (5 шагов)

### Шаг 1: Скачайте фото

Перейдите на **Vecteezy.com** и скачайте эти бесплатные фото:

#### Отбеливание зубов (3 фото)

```
https://static.vecteezy.com/system/resources/previews/068/108/335/non_2x/teeth-whitening-before-and-after-comparison-close-up-smile-free-photo.jpg

https://static.vecteezy.com/system/resources/previews/056/699/344/non_2x/professional-teeth-whitening-and-cleaning-before-and-after-results-photo.jpg

https://static.vecteezy.com/system/resources/previews/046/396/580/large_2x/before-and-after-close-up-of-teeth-whitening-showing-stained-teeth-and-bright-white-teeth-free-photo.jpg
```

#### Виниры (2 фото)

```
https://img.freepik.com/premium-photo/cropped-shot-young-caucasian-smiling-woman-before-after-veneers-installation-teeth-whitening_407348-2302.jpg

https://primo.dental/wp-content/uploads/2024/10/emax-before-after.jpg
```

---

### Шаг 2: Оптимизируйте фото

1. Перейдите на **<https://tinypng.com/>**
2. Загрузите все скачанные фото
3. Скачайте сжатые версии (размер уменьшится на 70%)

---

### Шаг 3: Создайте папки для фото

```bash
# В терминале
cd c:\local-agent\projects\dental-clinic-vakalova
mkdir public\images\before-after
mkdir public\images\before-after\whitening
mkdir public\images\before-after\veneers
mkdir public\images\before-after\implants
mkdir public\images\before-after\cleaning
```

---

### Шаг 4: Переименуйте и разместите фото

Переименуйте файлы:

```
whitening-result-1.jpg
whitening-result-2.jpg
whitening-result-3.jpg
veneers-result-1.jpg
veneers-result-2.jpg
```

Скопируйте в соответствующие папки:

```
public/images/before-after/whitening/whitening-result-1.jpg
public/images/before-after/veneers/veneers-result-1.jpg
```

---

### Шаг 5: Добавьте секцию галереи на страницу услуги

Создайте компонент `BeforeAfterGallery`:

```tsx
// src/components/ui/before-after-gallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface BeforeAfterImage {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

interface BeforeAfterGalleryProps {
  images: BeforeAfterImage[];
}

export function BeforeAfterGallery({ images }: BeforeAfterGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors">
              {/* Before and After side by side */}
              <div className="grid grid-cols-2 gap-0">
                {/* Before */}
                <div className="relative aspect-square">
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    До
                  </div>
                  <Image
                    src={image.beforeImage}
                    alt={`${image.title} - До`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* After */}
                <div className="relative aspect-square">
                  <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    После
                  </div>
                  <Image
                    src={image.afterImage}
                    alt={`${image.title} - После`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="p-4 bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📝 Обновите страницу услуги

Добавьте секцию с фото "До и После":

```tsx
// src/app/services/[slug]/page.tsx

import { BeforeAfterGallery } from "@/components/ui/before-after-gallery";

// Добавьте в servicesData для каждой услуги:
const servicesData = {
  "otbelivanie": {
    // ... существующие поля
    beforeAfterImages: [
      {
        id: "1",
        title: "Отбеливание ZOOM",
        beforeImage: "/images/before-after/whitening/whitening-result-1.jpg",
        afterImage: "/images/before-after/whitening/whitening-result-1.jpg",
        description: "Осветление на 8 тонов за 1 процедуру"
      },
      {
        id: "2",
        title: "Профессиональное отбеливание",
        beforeImage: "/images/before-after/whitening/whitening-result-2.jpg",
        afterImage: "/images/before-after/whitening/whitening-result-2.jpg",
        description: "Результат через 60 минут"
      },
    ],
  },
  "protezirovanie": {
    // ... существующие поля
    beforeAfterImages: [
      {
        id: "1",
        title: "Керамические виниры",
        beforeImage: "/images/before-after/veneers/veneers-result-1.jpg",
        afterImage: "/images/before-after/veneers/veneers-result-1.jpg",
        description: "Полная трансформация улыбки"
      },
    ],
  },
  // ... остальные услуги
};

// В компоненте страницы добавьте:
<div>
  <h2 className="mb-6 text-2xl font-bold text-neutral-900">
    Результаты наших пациентов
  </h2>
  <BeforeAfterGallery images={service.beforeAfterImages || []} />
</div>
```

---

## 🎨 Альтернативный вариант: Слайдер "До/После"

Для более интерактивного опыта создайте слайдер с разделителем:

```tsx
// src/components/ui/before-after-slider.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${title} - После`}
          fill
          className="object-cover"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${title} - До`}
          fill
          className="object-cover"
        />
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
        До
      </div>
      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
        После
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-2 bg-transparent appearance-none cursor-pointer"
        style={{
          WebkitAppearance: 'none',
        }}
      />
    </div>
  );
}
```

Использование:

```tsx
<BeforeAfterSlider
  beforeImage="/images/before-after/whitening/whitening-result-1.jpg"
  afterImage="/images/before-after/whitening/whitening-result-1.jpg"
  title="Отбеливание ZOOM"
/>
```

---

## 🖼️ Добавьте атрибуцию (обязательно для бесплатных фото)

В Footer добавьте:

```tsx
// src/components/layout/footer.tsx

<div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
  <p>
    Некоторые изображения предоставлены{" "}
    <a
      href="https://www.vecteezy.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors"
    >
      Vecteezy
    </a>
    {" "}и{" "}
    <a
      href="https://www.freepik.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors"
    >
      Freepik
    </a>
  </p>
</div>
```

---

## ✅ Чек-лист завершения

- [ ] Скачаны 10-15 фото высокого качества
- [ ] Фото оптимизированы через TinyPNG
- [ ] Созданы папки в `/public/images/before-after/`
- [ ] Файлы переименованы по системе
- [ ] Создан компонент `BeforeAfterGallery`
- [ ] Добавлены фото в `servicesData`
- [ ] Добавлена секция галереи на страницы услуг
- [ ] Добавлена атрибуция в Footer
- [ ] Проверено отображение на desktop
- [ ] Проверено отображение на mobile
- [ ] Alt-теги добавлены для SEO

---

## 🚀 Запуск и проверка

```bash
# В терминале
cd c:\local-agent\projects\dental-clinic-vakalova
npm run dev

# Откройте браузер
# http://localhost:3000/services/otbelivanie
```

Проверьте:

- ✅ Фото загружаются быстро
- ✅ Отображаются корректно
- ✅ Responsive на мобильных
- ✅ Alt-теги работают
- ✅ Нет ошибок в консоли

---

## 💡 Дополнительные улучшения

### 1. Лайтбокс для увеличения

Установите библиотеку:

```bash
npm install yet-another-react-lightbox
```

### 2. Lazy Loading

Next.js Image автоматически делает lazy loading, но можно добавить placeholder:

```tsx
<Image
  src={image.beforeImage}
  alt="..."
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### 3. Оптимизация для SEO

Добавьте структурированные данные:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "image": service.beforeAfterImages.map(img => ({
        "@type": "ImageObject",
        "url": img.afterImage,
        "caption": img.title
      }))
    })
  }}
/>
```

---

## 📊 Примеры использования

### На странице отбеливания

```tsx
{/* Результаты */}
<div className="mb-12">
  <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
    Результаты наших пациентов
  </h2>
  <p className="mb-8 text-zinc-600 dark:text-zinc-400">
    Посмотрите реальные трансформации улыбок после процедуры отбеливания ZOOM
  </p>
  <BeforeAfterGallery images={service.beforeAfterImages} />
</div>
```

### На странице виниров

```tsx
{/* Трансформации */}
<div className="mb-12">
  <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
    Впечатляющие трансформации
  </h2>
  <div className="space-y-8">
    {service.beforeAfterImages.map((image) => (
      <div key={image.id}>
        <h3 className="mb-4 text-lg font-semibold">{image.title}</h3>
        <BeforeAfterSlider
          beforeImage={image.beforeImage}
          afterImage={image.afterImage}
          title={image.title}
        />
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {image.description}
        </p>
      </div>
    ))}
  </div>
</div>
```

---

## 🎯 Итого

После выполнения всех шагов у вас будет:

✅ Профессиональная галерея "До и После"
✅ Интерактивный слайдер сравнения
✅ Оптимизированные изображения
✅ SEO-friendly структура
✅ Мобильная адаптация
✅ Корректная атрибуция

**Время выполнения:** 2-3 часа
**Сложность:** Средняя
**Результат:** Профессиональная галерея результатов 🎉

---

**Вопросы?** Смотрите полную документацию в `BEFORE_AFTER_PHOTOS_RESOURCES.md`
