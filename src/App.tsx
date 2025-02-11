import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  SmallNavbar,
  SmallNavbarElementProps,
} from "./assets/components/SmallNavbarComponent";
import PhotoContainer from "./assets/components/PhotoContainer.Component";
import firasPhoto from "./assets/images/neuil.webp";
import { motion } from "framer-motion";
import FirstImpression from "./assets/components/Sections/FirstImpressionComponent";

function App() {
  const elements: SmallNavbarElementProps[] = [
    { icon: "home", tooltip: "Accueil", href: "home" },
    { icon: "folder", tooltip: "Projets", href: "projects" },
    { icon: "suitcase", tooltip: "Expérience", href: "exp" },
    { icon: "wrench", tooltip: "Outils", href: "tools" },
    { icon: "pen-to-square", tooltip: "Accueil", href: "home" },
  ];

  return (
    <div style={{ width: "100vw", backgroundColor: "#1d1f24" }}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        id="navbar"
        className="d-flex gap-3 justify-content-center pt-3"
      >
        <SmallNavbar elements={elements}></SmallNavbar>
      </motion.div>
      <div
        id="container"
        style={{ marginLeft: "10vw", marginRight: "10vw" }}
        className="row mt-5"
      >
        <div className="col-4">
          <PhotoContainer
            src={firasPhoto}
            alt="Photo de Firas"
          ></PhotoContainer>
        </div>

        <div id="content" className="col-8">
          <div id="home">
            <FirstImpression></FirstImpression>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
