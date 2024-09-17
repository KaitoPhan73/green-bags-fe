import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation
} from "react-simple-maps";

const Map = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [105.0, 14.5], // Center on Vietnam
        scale: 1000, // Adjust scale as needed
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies
        geography="/features.json" // Make sure this file contains Vietnam data
        fill="#2C065D"
        stroke="#FFFFFF"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[106.6297, 10.8231]} // Coordinates for Ho Chi Minh City
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "white",
          strokeWidth: 2,
          strokeLinecap: "round"
        }}
      >
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="white">
          {"Ho Chi Minh City"}
        </text>
      </Annotation>
      <Annotation
        subject={[105.0, 20.5]} // Coordinates for the center of Vietnam
        dx={-70}
        dy={-20}
        connectorProps={{
          stroke: "yellow",
          strokeWidth: 2,
          strokeLinecap: "round"
        }}
      >
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="red">
          {"Vietnam"}
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default Map;
