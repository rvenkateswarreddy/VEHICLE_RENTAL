import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 0,
  lng: 0,
};

function VehicleMap({ vehicleLat, vehicleLng }) {
  console.log(vehicleLat, vehicleLng);
  return (
    <MapContainer
      center={[vehicleLat, vehicleLng]}
      zoom={13}
      style={{ height: "470px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[vehicleLat, vehicleLng]}>
        <Popup>Vehicle Location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default VehicleMap;
