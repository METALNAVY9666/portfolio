import { motion } from "framer-motion";
import Pie from "../Datavizs/PieComponent";
import popularLanguages from "../../data/popular_languages.json";

interface Dataviz {
  data: any;
  formatter?: (element: any) => string;
  title?: string;
  source?: string;
}

const DATAVIZS: Dataviz[] = [
  {
    data: popularLanguages,
    formatter: (element: any) => `${Math.round(100 * element.value)}%`,
    title: "Langages populaires",
    source: "https://pypl.github.io/PYPL.html",
  },
];

export default function Data() {
  return (
    <motion.div className="d-flex justify-content-evenly">
      {DATAVIZS.map((dataviz, index) => (
        <Pie
          key={`dataviz-${index}`}
          limit={10}
          data={dataviz.data}
          title={dataviz.title}
          valueFormatter={dataviz.formatter}
        />
      ))}
    </motion.div>
  );
}
