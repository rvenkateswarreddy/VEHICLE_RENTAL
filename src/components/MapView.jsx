// src/components/MapView.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapView = ({ userLocation }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (userLocation) {
      const fetchVehicles = async () => {
        try {
          const response = await axios.get("/api/vehicles/nearby", {
            params: {
              lat: userLocation.lat,
              lng: userLocation.lng,
              radius: 10, // Radius in kilometers
            },
          });
          setVehicles(response.data.vehicles);
        } catch (error) {
          console.error("Error fetching nearby vehicles:", error);
        }
      };

      fetchVehicles();
    }
  }, [userLocation]);

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={userLocation}>
        <Popup>You are here.</Popup>
      </Marker>
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle._id}
          position={[
            vehicle.location.coordinates[1],
            vehicle.location.coordinates[0],
          ]}
          icon={L.icon({
            iconUrl: "path/to/vehicle-icon.png",
            iconSize: [32, 32],
          })}
        >
          <Popup>
            {vehicle.make} {vehicle.model} <br /> Price per Hour: $
            {vehicle.price_per_hour}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
