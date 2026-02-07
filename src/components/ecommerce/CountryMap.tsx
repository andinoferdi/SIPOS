import type { FC } from "react";
import dynamic from "next/dynamic";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((module) => module.VectorMap),
  { ssr: false },
);

interface CountryMapProps {
  mapColor?: string;
}

interface MarkerStyle {
  initial: {
    fill: string;
    r: number;
  };
}

interface Marker {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
}

const CountryMap: FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      backgroundColor="transparent"
      map={worldMill}
      markers={
        [
          {
            latLng: [37.2580397, -104.657039],
            name: "United States",
            style: {
              fill: "var(--color-brand-500)",
              borderWidth: 1,
              borderColor: "white",
              stroke: "var(--color-brand-500)",
            },
          },
          {
            latLng: [20.7504374, 73.7276105],
            name: "India",
            style: { fill: "var(--color-brand-500)", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [53.613, -11.6368],
            name: "United Kingdom",
            style: { fill: "var(--color-brand-500)", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [-25.0304388, 115.2092761],
            name: "Sweden",
            style: {
              fill: "var(--color-brand-500)",
              borderWidth: 1,
              borderColor: "white",
              strokeOpacity: 0,
            },
          },
        ] as Marker[]
      }
      markersSelectable
      markerStyle={
        {
          initial: {
            fill: "var(--color-brand-500)",
            r: 4,
          },
        } as MarkerStyle
      }
      regionLabelStyle={{
        initial: {
          fill: "var(--color-brand-500)",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
      regionStyle={{
        initial: {
          fill: mapColor || "var(--color-brand-500)",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "var(--color-brand-500)",
          stroke: "none",
        },
        selected: {
          fill: "var(--color-brand-500)",
        },
        selectedHover: {},
      }}
      zoomAnimate
      zoomMax={12}
      zoomMin={1}
      zoomOnScroll={false}
      zoomStep={1.5}
    />
  );
};

export default CountryMap;
