import { PieChart } from "@mui/x-charts";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
interface PieData {
  id: string | number;
  value: number;
  label: string;
}

interface PieProps {
  data: PieData[];
  source?: string;
  title?: string;
  valueFormatter?: (element: any) => string;
  limit?: number;
  width?: number;
  height?: number;
}

export default function Pie({
  data,
  source,
  limit,
  title,
  valueFormatter,
  width = 400,
  height = 200,
}: PieProps) {
  return (
    <div>
      <b className="text-white d-flex justify-content-center">
        {title && <Typewriter words={[title]} loop={1}></Typewriter>}
      </b>
      <div className="d-flex justify-content-center">
        <PieChart
          series={[
            {
              data: limit ? data.slice(0, limit) : data,
              arcLabel: (item) => `${Math.round(100 * item.value)}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 365,
              valueFormatter: valueFormatter
                ? valueFormatter
                : (element: any) => element.label,
            },
          ]}
          margin={{ left: 0, right: 0 }}
          width={width}
          height={height}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </div>
      <div className="mt-2 d-flex justify-content-center">
        <motion.button
          className="btn btn-dark text-white border-white"
          onClick={() => window.open(source, "_blank")}
        >
          Source
        </motion.button>
      </div>
    </div>
  );
}
