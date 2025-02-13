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
import Data from "./assets/components/Sections/Data";
import Stack from "./assets/components/Sections/Stack";
import { isBrowser } from "react-device-detect";

const elements: SmallNavbarElementProps[] = [
  { icon: "home", tooltip: "Accueil", href: "home" },
  { icon: "wrench", tooltip: "Stack", href: "tools" },
  { icon: "folder", tooltip: "Projets", href: "projects" },
  { icon: "suitcase", tooltip: "Expérience", href: "exp" },
  { icon: "pen-to-square", tooltip: "Contact", href: "home" },
];
function App() {
  if (!isBrowser)
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

        <FirstImpression></FirstImpression>
        <PhotoContainer src={firasPhoto} />
        <div style={{ marginTop: "20vh" }} id="tools">
          <Stack></Stack>
        </div>
        <Data></Data>
      </div>
    );
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
        style={isBrowser ? { marginLeft: "10vw", marginRight: "10vw" } : {}}
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
          <div id="tools">
            <Stack />
            <Data />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
