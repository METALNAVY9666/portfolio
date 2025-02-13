import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { Feature } from "geojson";
import bbox from "@turf/bbox";
import { colors } from "./basics";

export interface MapComponentProps {
  spin?: boolean;
  layer: Feature | null;
}

export type BboxType = [number, number, number, number];

export function MapComponent({ layer, spin = false }: MapComponentProps) {
  const mapConainter = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  const startSpin = () => {
    if (!mapInstance.current || !spin) return;
    let animationFrameId: number;

    const rotateCamera = (timestamp: number) => {
      if (mapInstance.current) {
        mapInstance.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
        animationFrameId = requestAnimationFrame(rotateCamera);
      }
    };

    animationFrameId = requestAnimationFrame(rotateCamera);

    return () => cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    if (mapConainter.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapConainter.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [2.3522, 48.8566], // Coordinates for Paris
        zoom: 12,
        attributionControl: false,
        touchZoomRotate: false,
        keyboard: false,
        scrollZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragPan: false,
        dragRotate: false,
        pitch: 60,
        bearing: 0,
      });

      mapInstance.current.once("load", () => setDoneLoading(true));
    }
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !doneLoading || !layer) return;
    if (map.getSource("layer") || map.getLayer("layer") || map.getLayer("line"))
      return;
    map.addSource("layer", {
      data: layer,
      type: "geojson",
    });
    map.addLayer({
      type: "fill",
      id: "layer",
      source: "layer",
      paint: {
        "fill-color": colors[0],
        "fill-opacity": 0.6,
      },
    });
    map.addLayer({ id: "line", type: "line", source: "layer" });
    map.fitBounds(bbox(layer) as BboxType, { padding: 30, duration: 3000 });
    setTimeout(startSpin, 3000);
  }, [doneLoading, layer]);

  return (
    <div
      className="rounded border"
      ref={mapConainter}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}
