const CLOUD_NAME = "devx75lrj";

// Helper: generuje Cloudinary URL z automatyczną optymalizacją
function cloudImg(path: string, width: number, height?: number): string {
  const transforms = height
    ? `w_${width},h_${height},c_fill,q_auto,f_auto`
    : `w_${width},q_auto,f_auto`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${path}`;
}

export interface Photo {
  id: number;
  src: string;
  thumbnail: string;
  location: string;
  camera: string;
  lens: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  timecode: string;
}

// ============================================================
// JAK DODAĆ SWOJE ZDJĘCIA:
// 1. Wrzuć zdjęcie do Cloudinary (Media Library → Upload)
//    np. do folderu "photography/" jako "bali.jpg"
// 2. Zamień src/thumbnail na:
//    src: cloudImg("photography/bali.jpg", 1600),
//    thumbnail: cloudImg("photography/bali.jpg", 150, 200),
// ============================================================

export const photos: Photo[] = [
  {
    id: 1,
    // TODO: zamień na cloudImg("photography/NAZWA.jpg", 1600)
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=150&h=200&fit=crop&q=60",
    location: "Bali, Indonesia",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "8.3405° S", lng: "115.0920° E" },
    timecode: "08:14:22",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=200&fit=crop&q=60",
    location: "Paris, France",
    camera: "Sony A7IV",
    lens: "Zeiss 35mm f/1.4",
    coordinates: { lat: "48.8566° N", lng: "2.3522° E" },
    timecode: "14:32:07",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=150&h=200&fit=crop&q=60",
    location: "Rome, Italy",
    camera: "Hasselblad X2D",
    lens: "XCD 45mm f/3.5",
    coordinates: { lat: "41.9028° N", lng: "12.4964° E" },
    timecode: "11:05:48",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=150&h=200&fit=crop&q=60",
    location: "Kyoto, Japan",
    camera: "Fujifilm GFX 100S",
    lens: "GF 80mm f/1.7",
    coordinates: { lat: "35.0116° N", lng: "135.7681° E" },
    timecode: "06:48:33",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=150&h=200&fit=crop&q=60",
    location: "Reykjavik, Iceland",
    camera: "Leica M11",
    lens: "Summicron 50mm f/2",
    coordinates: { lat: "64.1466° N", lng: "21.9426° W" },
    timecode: "22:15:01",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=150&h=200&fit=crop&q=60",
    location: "Amalfi, Italy",
    camera: "Canon R5",
    lens: "RF 24-70mm f/2.8",
    coordinates: { lat: "40.6340° N", lng: "14.6027° E" },
    timecode: "16:22:55",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=200&fit=crop&q=60",
    location: "Maldives",
    camera: "Nikon Z9",
    lens: "Nikkor 14-24mm f/2.8",
    coordinates: { lat: "3.2028° N", lng: "73.2207° E" },
    timecode: "10:44:19",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=150&h=200&fit=crop&q=60",
    location: "Santorini, Greece",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "36.3932° N", lng: "25.4615° E" },
    timecode: "18:07:42",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=200&fit=crop&q=60",
    location: "Swiss Alps",
    camera: "Sony A1",
    lens: "GM 24mm f/1.4",
    coordinates: { lat: "46.8182° N", lng: "8.2275° E" },
    timecode: "05:33:28",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=150&h=200&fit=crop&q=60",
    location: "Florence, Italy",
    camera: "Hasselblad 907X",
    lens: "XCD 38mm f/2.5",
    coordinates: { lat: "43.7696° N", lng: "11.2558° E" },
    timecode: "13:19:56",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&h=200&fit=crop&q=60",
    location: "Lake Como, Italy",
    camera: "Leica SL2",
    lens: "Vario-Elmarit 24-90mm",
    coordinates: { lat: "45.9937° N", lng: "9.2572° E" },
    timecode: "09:51:14",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=150&h=200&fit=crop&q=60",
    location: "Sydney, Australia",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "33.8688° S", lng: "151.2093° E" },
    timecode: "07:28:41",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=150&h=200&fit=crop&q=60",
    location: "Big Sur, California",
    camera: "Canon R5",
    lens: "RF 15-35mm f/2.8",
    coordinates: { lat: "36.2704° N", lng: "121.8081° W" },
    timecode: "17:06:33",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=150&h=200&fit=crop&q=60",
    location: "San Francisco, USA",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/1.4",
    coordinates: { lat: "37.7749° N", lng: "122.4194° W" },
    timecode: "19:42:08",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=150&h=200&fit=crop&q=60",
    location: "Marrakech, Morocco",
    camera: "Leica M11",
    lens: "Elmarit 28mm f/2.8",
    coordinates: { lat: "31.6295° N", lng: "7.9811° W" },
    timecode: "12:55:47",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=150&h=200&fit=crop&q=60",
    location: "Fiji Islands",
    camera: "Sony A7RV",
    lens: "GM 35mm f/1.4",
    coordinates: { lat: "17.7134° S", lng: "178.0650° E" },
    timecode: "15:38:22",
  },
];
