# Photography Portfolio — Design Spec

## Overview
Pełnoekranowy przeglądnik zdjęć fotograficznych w stylu kinowego HUD-a. Inspiracja: adambricker.com/photography. Single-page app — jedno okno, bez scrollowania strony. Scroll wheel przełącza zdjęcia z płynnymi animacjami.

## Tech Stack
- Next.js 15 + React 19 + TypeScript
- Framer Motion (animacje przejść, custom cursor)
- Tailwind CSS v4
- Placeholder zdjęcia z Unsplash (fotografia podróżnicza/uliczna)

## Layout — Stały fullscreen (100vh x 100vw)

### 1. Filmstrip (lewa kolumna, ~80px szerokości)
- Pionowy pasek miniatur zdjęć (thumbnails)
- Aktywne zdjęcie ma widoczną ramkę/highlight (biały border)
- Scroll przesuwa "kratkę" (selection frame) po miniaturach z animacją slide
- Thumbnails wykadrowane na stały aspect ratio (portrait ~3:4)
- Klikanie na miniaturę też przełącza zdjęcie

### 2. Główne zdjęcie (centrum, zajmuje większość ekranu)
- Duże zdjęcie wycentrowane z zachowaniem proporcji (object-contain)
- Płynna animacja przejścia przy zmianie (crossfade, ~0.4-0.6s)
- Dekoracyjne elementy kadru:
  - Celowniki `+` (crosshair) w 4 rogach zdjęcia (lub 2 — góra-lewo, dół-prawo)
  - Bracket `⌐ ¬` (corner marks) w lewym górnym rogu — ramka viewfindera

### 3. Metadata panel (prawa kolumna, ~200-250px)
- **Duży numer zdjęcia** — np. `08`, font size ~80-100px, cienki/light weight, wyrównany do góry-prawej
- **Camera info** — np. "Leica Q" (label: "Camera")
- **Lens info** — np. "Leica 28mm Summilux" (label: "Lens")  
- **Współrzędne GPS** — np. "59.8961° S, 151.2081° E"
- **Lokalizacja** — np. "Sydney, Australia" (pogrubiona)
- **Counter** — `(8/48)` na samej górze obok numeru
- Wszystkie dane animują się (fade in/out) przy zmianie zdjęcia
- Font: monospace dla danych technicznych, sans-serif dla lokalizacji

### 4. Top bar (górna krawędź, pełna szerokość)
- Layout: flex, space-between, items-center
- Elementy od lewej do prawej:
  - `←` strzałka wstecz (link/button)
  - Aktualny czas (np. `11:25 PST`) — live clock
  - Lokalizacja fotografa (np. `Los Angeles`)
  - `+` crosshair separator
  - **"View Work"** — centralny link
  - `+` crosshair separator
  - Timecode (np. `08:18:14`) — animowany
  - Counter `(8/48)`
- Font: monospace, mały rozmiar (~11-12px), uppercase

### 5. Bottom bar (dolna krawędź, pełna szerokość)
- Layout: flex, space-between
- Elementy:
  - `A. B.` lub inicjały (lewo)
  - `Cinematographer` (label/tytuł)
  - `+` separator
  - `Instagram` (link)
  - `©2026` (prawo)
- Font: monospace, mały rozmiar (~11-12px)

## Custom Cursor — Viewfinder Frame
- **Domyślny kursor ukryty** (`cursor: none` na całej stronie)
- **Custom element** podążający za myszą:
  - Prostokątna ramka (~40-60px) z cienkimi liniami
  - Crosshair `+` w centrum ramki
  - Styl: viewfinder aparatu fotograficznego
  - Smooth follow z lekkim lagiem (lerp ~0.15) lub opcjonalnie 1:1
  - Kolor: biały z lekkim cieniem/outline dla czytelności na jasnych zdjęciach

## Scroll Navigation
- **Wheel event** na całej stronie przełącza zdjęcia
- Scroll down = następne zdjęcie, scroll up = poprzednie
- **Debounce/throttle** — jeden "krok" scrollowania = jedno zdjęcie (zapobiec szybkiemu przewijaniu)
- Podczas animacji przejścia kolejne scrolle są zignorowane
- Klawisze strzałek (↑↓ lub ←→) też nawigują

## Animacje przejść (Framer Motion)
- **Główne zdjęcie:** crossfade (opacity 0→1), opcjonalnie lekki scale (0.98→1)
- **Filmstrip:** selection frame przesuwa się smooth (translateY)
- **Metadata:** stagger fade — numer, camera, lens, location pojawiają się sekwencyjnie z lekkim opóźnieniem
- **Numer zdjęcia:** animacja count up/down (opcjonalnie)
- **Czas trwania:** 0.4-0.6s, easing: ease-out

## Color Scheme
- **Tło:** białe/jasne (`#ffffff` lub `#fafafa`)
- **Tekst:** ciemny (`#1a1a1a` lub `#000000`)
- **Akcenty:** szary na secondary text (`#666`, `#999`)
- **Elementy HUD:** cienkie linie, monospace — styl techniczny/kinowy
- **Ramki/separatory:** `#e0e0e0` lub `#ccc`

## Typography
- **Sans-serif główny:** Inter lub system font stack
- **Monospace (dane techniczne, HUD):** JetBrains Mono, SF Mono, lub Courier
- **Numer zdjęcia:** thin/light weight (100-300), bardzo duży (80-100px)
- **Metadane:** regular weight, 11-13px
- **Lokalizacja:** semi-bold, 14-16px

## Dane zdjęć (mock data)
Tablica ~12-20 placeholder zdjęć, każde z:
```ts
interface Photo {
  id: number
  src: string           // Unsplash URL
  thumbnail: string     // mniejsza wersja
  location: string      // "Sydney, Australia"
  camera: string        // "Leica Q"
  lens: string          // "Leica 28mm Summilux"
  coordinates: {
    lat: string         // "33.8961° S"
    lng: string         // "151.2081° E"
  }
  timecode: string      // "08:18:14"
}
```

## Responsive (nice-to-have, v2)
Strona jest zaprojektowana na desktop first. Na mobile:
- Filmstrip chowa się lub przechodzi na dół jako horizontal strip
- Metadata panel chowa się, dane pokazują się jako overlay na zdjęciu
- Top/bottom bar się upraszczają

## Poza zakresem
- Podstrony (Home, Projects, About)
- CMS/backend
- Upload zdjęć
- SEO optimization
- Dark mode toggle (strona jest light-only jak oryginał)
