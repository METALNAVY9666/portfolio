import { motion } from "framer-motion";
import Pie from "../Datavizs/PieComponent";
import popularLanguages from "../../data/popular_languages.json";
import evoPopularLanguages from "../../data/evo_popular_languages.json";
import Evolution from "../Datavizs/EvolutionComponent";
import { useState } from "react";

export default function Data() {
  const [sliderValue, setSliderValue] = useState<number>(
    evoPopularLanguages.values.length
  );

  return (
    <motion.div
      className="d-flex justify-content-evenly flex-wrap"
      style={{ overflow: "hidden" }}
    >
      <Pie
        limit={10}
        data={popularLanguages}
        title="Langages les plus populaires"
        valueFormatter={(element: any) => `${Math.round(100 * element.value)}%`}
        source="https://pypl.github.io/PYPL.html"
      />
      <div>
        <b className="text-white d-flex justify-content-center">
          Évolution de la popularité des langages
        </b>
        <Evolution
          values={evoPopularLanguages.values}
          xAxis={evoPopularLanguages.xAxis}
          limit={sliderValue}
        ></Evolution>
        <p className="text-white d-flex justify-content-center">
          Cliquez les lignes pour les isoler
        </p>
        <div className="mt-2 d-flex justify-content-evenly">
          <div>
            <b className="text-white d-flex justify-content-center">Densité</b>
            <div className="text-white d-flex justify-content-center">
              <input
                type="range"
                id="slider"
                min="1"
                max={`${evoPopularLanguages.values.length}`}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center align-items-center h-100">
              <button
                className="btn bg-dark border-white text-white"
                onClick={() =>
                  window.open("https://www.tiobe.com/tiobe-index/", "_blank")
                }
              >
                Source
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
