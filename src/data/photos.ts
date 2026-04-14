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
    src: cloudImg("IMG_4554_yqwrz5", 1600),
    thumbnail: cloudImg("IMG_4554_yqwrz5", 150, 200),
    location: "Warsaw, Poland",
    camera: "Nikon Z9",
    lens: "Nikkor Z 50mm f/1.2",
    coordinates: { lat: "52.2297° N", lng: "21.0122° E" },
    timecode: "08:14:22",
  },
  {
    id: 2,
    src: cloudImg("IMG_0195_c0yqf9", 1600),
    thumbnail: cloudImg("IMG_0195_c0yqf9", 150, 200),
    location: "Lisbon, Portugal",
    camera: "Nikon Z8",
    lens: "Nikkor Z 35mm f/1.4",
    coordinates: { lat: "38.7223° N", lng: "9.1393° W" },
    timecode: "14:32:07",
  },
  {
    id: 3,
    src: cloudImg("IMG_4317_ccxqgk", 1600),
    thumbnail: cloudImg("IMG_4317_ccxqgk", 150, 200),
    location: "Barcelona, Spain",
    camera: "Nikon Z9",
    lens: "Nikkor Z 24-70mm f/2.8",
    coordinates: { lat: "41.3874° N", lng: "2.1686° E" },
    timecode: "11:05:48",
  },
  {
    id: 4,
    src: cloudImg("IMG_0221_pwnuxo", 1600),
    thumbnail: cloudImg("IMG_0221_pwnuxo", 150, 200),
    location: "Vienna, Austria",
    camera: "Nikon Z8",
    lens: "Nikkor Z 85mm f/1.2",
    coordinates: { lat: "48.2082° N", lng: "16.3738° E" },
    timecode: "06:48:33",
  },
  {
    id: 5,
    src: cloudImg("IMG_224_ipmgmi", 1600),
    thumbnail: cloudImg("IMG_224_ipmgmi", 150, 200),
    location: "Prague, Czech Republic",
    camera: "Nikon Z9",
    lens: "Nikkor Z 14-24mm f/2.8",
    coordinates: { lat: "50.0755° N", lng: "14.4378° E" },
    timecode: "22:15:01",
  },
];
