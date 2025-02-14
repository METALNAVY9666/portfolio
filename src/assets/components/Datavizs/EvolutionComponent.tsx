import { LineChart } from "@mui/x-charts";
import { useState } from "react";

export interface Value {
  label: string;
  data: (number | null)[];
}

interface EvolutionProps {
  xAxis: number[];
  values: Value[];
  limit?: number;
}

export default function Evolution({
  xAxis,
  values,

  limit = values.length,
}: EvolutionProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleLineClick = (index: number) => {
    setSelectedIndexes((prev) => {
      if (prev.includes(index)) return prev.filter((value) => value !== index);
      return [...prev, index];
    });
  };

  return (
    <LineChart
      className="bg-white rounded p-2"
      xAxis={[
        {
          data: xAxis,
          valueFormatter: (value: any) => String(value).toLocaleLowerCase(),
        },
      ]}
      series={values
        .slice(0, limit)
        .map((value, index) => ({
          id: index,
          data: value.data,
          label: value.label,
          baseline: "max" as const,
          hidden: !selectedIndexes.includes(index),
          onClick: () => handleLineClick(index),
        }))
        .filter(
          (_, idx) =>
            selectedIndexes.includes(idx) || selectedIndexes.length === 0
        )}
      onMarkClick={(_, d) => {
        handleLineClick(Number(d.seriesId));
      }}
      onLineClick={(_, d) => handleLineClick(Number(d.seriesId))}
      legend={{ hidden: true }}
      height={200}
      width={400}
      margin={{ top: 10, bottom: 20, right: 17, left: 25 }}
    />
  );
}
