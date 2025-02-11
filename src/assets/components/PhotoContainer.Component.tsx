import { motion } from "framer-motion";
import { colors } from "./basics";
import { MapComponent } from "./MapComponent";
import { useEffect, useState } from "react";
import { Feature } from "geojson";
import axios from "axios";

interface PhotoContainerProps {
  src: string;
  alt?: string;
}

interface InfoProps {
  icon: string;
  href: string;
}

export default function PhotoContainer({ src, alt }: PhotoContainerProps) {
  const monCodeCommune: string = "77243";
  const [cityFeature, setCityFeature] = useState<Feature | null>(null);
  const infos: InfoProps[] = [
    {
      icon: "fa-brands fa-instagram",
      href: "https://www.instagram.com/firas.zaazaa",
    },
    {
      icon: "fa-solid fa-envelope",
      href: "mailto:firas.zaazaa@gmail.com?Subject=Prenons%20contact",
    },
    {
      icon: "fa-brands fa-github",
      href: "https://github.com/metalnavy9666",
    },
    {
      icon: "fa-brands fa-linkedin",
      href: "https://www.linkedin.com/in/firas-zaazaa/",
    },
    {
      icon: "fa-solid fa-phone",
      href: "tel:+33616175795",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `https://geo.api.gouv.fr/communes/${monCodeCommune}?fields=contour&format=json&geometry=contour`
      )
      .then((response) =>
        setCityFeature({
          type: "Feature",
          geometry: response.data.contour,
          properties: {
            cityName: response.data.nom,
          },
        })
      );
  }, []);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-100 container p-2 w-100 bg-white rounded rounded-3"
    >
      <div className="container p-4">
        <motion.img
          style={{
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
          }}
          className="w-100 rounded-3"
          src={src}
          alt={alt}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = "1";
            target.style.transform = "scale(1)";
          }}
        />
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ fontWeight: 750, textAlign: "center" }}
          className="text-black my-3"
        >
          Firas Zaazaa
        </motion.h1>
        <motion.h5
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
          style={{ fontWeight: 660, textAlign: "center" }}
          className="text-secondary my-2"
        >
          Développeur web fullstack avec une expertise solide en React, Flask et
          SQL.
        </motion.h5>
        <div className="d-flex justify-content-evenly mx-3 my-1" id="infos">
          {infos.map((info) => (
            <a href={info.href}>
              <i className={`fs-3 text-black ${info.icon}`}></i>
            </a>
          ))}
        </div>
        <div style={{ height: "30vh" }}>
          <MapComponent spin={true} layer={cityFeature}></MapComponent>
          <p className="text-secondary d-flex justify-content-center">
            Basé à {cityFeature?.properties?.cityName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
