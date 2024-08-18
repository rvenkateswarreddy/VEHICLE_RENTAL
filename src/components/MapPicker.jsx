// src/components/MapPicker.js
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 13.643080309313428,
  lng: 79.422587578069,
};

const MapPicker = ({ onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = (e) => {
    const { latLng } = e;
    const newPosition = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setMarkerPosition(newPosition);
    onLocationChange(newPosition);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyACUJddxmNoXmmkhGkrgJdtgCJQ8wU40cs">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={markerPosition}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPicker;
