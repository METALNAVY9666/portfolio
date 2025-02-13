import { motion } from "framer-motion";
import { colors } from "./basics";
import { MapComponent } from "./MapComponent";
import { useEffect, useState } from "react";
import { Feature } from "geojson";
import axios from "axios";
import socials from "../data/socials.json";
import { Modal } from "react-bootstrap";
import { isBrowser } from "react-device-detect";

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
  const ogSp98 = 1.874; // 13/02/2025 à 17h14
  const xpLevel = 2.12; // 13/02/2025
  const [cityFeature, setCityFeature] = useState<Feature | null>(null);
  const [tjm, setTjm] = useState<number>(199);
  const [sp98, setSp98] = useState<number>(ogSp98);
  const [showPopup, setShowPopup] = useState<boolean>(false);

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
    axios
      .get(
        "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit=20&where=ville%3D%27Meaux%27%20and%20adresse%3D%27Rue%20Georges%20Claude%27&select=sp98_prix"
      )
      .then((response) => {
        if (response.data.total_count > 0)
          setSp98(response.data.results[0].sp98_prix);
      });
  }, []);

  useEffect(() => setTjm(Math.round(xpLevel * 50 * sp98)), [sp98]);
  // calculé en fonction du prix du SP98 (bon indice d'inflation) et de mon expérience

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`${
        isBrowser ? "h-100" : ""
      } container p-2 w-100 bg-white rounded rounded-3`}
    >
      <Modal
        show={showPopup}
        style={{ width: isBrowser ? "80vw" : "100vw", overflow: "hidden" }}
      >
        <Modal.Header>Détails du calcul du TJM</Modal.Header>
        <Modal.Body>
          <p className="my-2">
            Le TJM (taux journalier moyen) est calculé en fonction de
            l'inflation et de mon expérience.
          </p>
          <p>xpLevel (expérience): {xpLevel}</p>
          <p>sp98 (Prix du litre de sp98 à Meaux) : {sp98}</p>
          <p>
            <b>Formule:</b> <br />
            <span style={{ fontSize: "1.2em" }}>
              TJM = <span style={{ fontStyle: "italic" }}>sp98</span> × 50 ×{" "}
              <span style={{ fontStyle: "italic" }}>xpLevel</span>
            </span>
          </p>
          <p>
            <b>Résultat:</b> <br />
            <span style={{ fontSize: "1.2em" }}>
              TJM = <span style={{ fontStyle: "italic" }}>{sp98}</span> × 50 ×{" "}
              <span style={{ fontStyle: "italic" }}>{xpLevel}</span> ={" "}
              <span style={{ fontStyle: "italic" }}>{sp98 * xpLevel * 50}</span>{" "}
              ≈ <span style={{ fontStyle: "italic" }}>{tjm}</span>
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-lg border"
            onClick={() => setShowPopup(false)}
          >
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
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
          {(socials as InfoProps[]).map((info) => (
            <a href={info.href}>
              <i className={`fs-3 text-black ${info.icon}`}></i>
            </a>
          ))}
        </div>
        <div style={{ height: "50vh" }}>
          <div style={{ height: "30vh" }}>
            <MapComponent spin={true} layer={cityFeature}></MapComponent>
          </div>

          <p className="text-secondary d-flex justify-content-center">
            Basé à {cityFeature?.properties?.cityName}
          </p>
          <div className="mt-3">
            <h1
              className="d-flex justify-content-center"
              style={{ fontWeight: 650 }}
            >
              TJM
              <i
                style={{ fontSize: 13, cursor: "pointer" }}
                className="fa-solid fa-circle-info"
                onClick={() => setShowPopup(true)}
              ></i>{" "}
              à partir de {tjm}€
            </h1>
            <h2
              className="d-flex justify-content-center"
              style={{ fontWeight: 500 }}
            >
              Ouvert aux CDI
            </h2>
            <b className="text-secondary d-flex justify-content-center">
              Télétravail et/ou déplacements
            </b>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
