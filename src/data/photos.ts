const CLOUD_NAME = "devx75lrj";

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

export const photos: Photo[] = [
  {
    id: 1,
    src: cloudImg("photography/mallorca", 1600),
    thumbnail: cloudImg("photography/mallorca", 150, 200),
    location: "Mallorca, Spain",
    camera: "Nikon Z9",
    lens: "Nikkor Z 50mm f/1.2",
    coordinates: { lat: "39.6953° N", lng: "3.0176° E" },
    timecode: "08:14:22",
  },
  {
    id: 2,
    src: cloudImg("photography/porto", 1600),
    thumbnail: cloudImg("photography/porto", 150, 200),
    location: "Porto, Portugal",
    camera: "Nikon Z8",
    lens: "Nikkor Z 35mm f/1.4",
    coordinates: { lat: "41.1579° N", lng: "8.6291° W" },
    timecode: "14:32:07",
  },
  {
    id: 3,
    src: cloudImg("photography/mallorca-2", 1600),
    thumbnail: cloudImg("photography/mallorca-2", 150, 200),
    location: "Mallorca, Spain",
    camera: "Nikon Z9",
    lens: "Nikkor Z 24-70mm f/2.8",
    coordinates: { lat: "39.5693° N", lng: "2.6502° E" },
    timecode: "11:05:48",
  },
  {
    id: 4,
    src: cloudImg("photography/porto-2", 1600),
    thumbnail: cloudImg("photography/porto-2", 150, 200),
    location: "Porto, Portugal",
    camera: "Nikon Z8",
    lens: "Nikkor Z 85mm f/1.2",
    coordinates: { lat: "41.1496° N", lng: "8.6110° W" },
    timecode: "06:48:33",
  },
  {
    id: 5,
    src: cloudImg("photography/porto-3", 1600),
    thumbnail: cloudImg("photography/porto-3", 150, 200),
    location: "Porto, Portugal",
    camera: "Nikon Z9",
    lens: "Nikkor Z 14-24mm f/2.8",
    coordinates: { lat: "41.1403° N", lng: "8.6168° W" },
    timecode: "22:15:01",
  },
  {
    id: 6,
    src: cloudImg("photography/aircraft", 1600),
    thumbnail: cloudImg("photography/aircraft", 150, 200),
    location: "Spain",
    camera: "Nikon Z9",
    lens: "Nikkor Z 70-200mm f/2.8",
    coordinates: { lat: "40.4168° N", lng: "3.7038° W" },
    timecode: "16:22:55",
  },
  {
    id: 7,
    src: cloudImg("photography/spain-camino", 1600),
    thumbnail: cloudImg("photography/spain-camino", 150, 200),
    location: "Spain",
    camera: "Nikon Z8",
    lens: "Nikkor Z 24mm f/1.7",
    coordinates: { lat: "42.8782° N", lng: "8.5448° W" },
    timecode: "10:44:19",
  },
  {
    id: 8,
    src: cloudImg("photography/oslo-car", 1600),
    thumbnail: cloudImg("photography/oslo-car", 150, 200),
    location: "Oslo, Norway",
    camera: "Nikon Z9",
    lens: "Nikkor Z 50mm f/1.2",
    coordinates: { lat: "59.9139° N", lng: "10.7522° E" },
    timecode: "18:07:42",
  },
  {
    id: 9,
    src: cloudImg("photography/austria", 1600),
    thumbnail: cloudImg("photography/austria", 150, 200),
    location: "Austria",
    camera: "Nikon Z8",
    lens: "Nikkor Z 14-24mm f/2.8",
    coordinates: { lat: "47.2692° N", lng: "11.4041° E" },
    timecode: "05:33:28",
  },
  {
    id: 10,
    src: cloudImg("photography/oslo-building", 1600),
    thumbnail: cloudImg("photography/oslo-building", 150, 200),
    location: "Oslo, Norway",
    camera: "Nikon Z9",
    lens: "Nikkor Z 24-70mm f/2.8",
    coordinates: { lat: "59.9070° N", lng: "10.7209° E" },
    timecode: "13:19:56",
  },
  {
    id: 11,
    src: cloudImg("photography/austria-car", 1600),
    thumbnail: cloudImg("photography/austria-car", 150, 200),
    location: "Austria",
    camera: "Nikon Z8",
    lens: "Nikkor Z 35mm f/1.4",
    coordinates: { lat: "47.5162° N", lng: "14.5501° E" },
    timecode: "09:51:14",
  },
];
