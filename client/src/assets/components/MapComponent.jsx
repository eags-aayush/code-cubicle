// MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import issueImg from '../images/issue.png';
import suggestionImg from '../images/suggestion.png';

const issueIcon = new L.Icon({
  iconUrl: issueImg,
  iconSize: [20, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30],
});

const suggestionIcon = new L.Icon({
  iconUrl: suggestionImg,
  iconSize: [30, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30],
});

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 14);
    }
  }, [lat, lng, map]);
  return null;
}

const MapComponent = ({ shadow }) => {
  const [reports, setReports] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    console.log("📡 Fetching reports...");

    fetch('/get-reports')
      .then(res => res.json())
      .then(data => {
        console.log("📦 Reports received:", data);
        setReports(data);
      })
      .catch(error => {
        console.error("❌ Error fetching reports:", error);
      });

    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        console.log("📍 User location:", coords);
        setUserLocation(coords);
      },
      err => {
        console.error('❌ Geolocation error:', err);
      }
    );
  }, []);


  return (
    <div className={`z-1 h-100 w-full border p-5 ${shadow} shadow-md rounded-2xl m-auto`}>
      <MapContainer
        center={userLocation}
        zoom={18}
        minZoom={5}
        maxZoom={18}
        maxBounds={[[6.5546, 68.1114], [35.6745, 97.3956]]}
        style={{ height: '100%', width: '100%' }}
      >

        {/* your layers, markers, etc. */}


        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <>
            <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          </>
        )}

        {reports.map((r, i) => {
          const coords = r.coordinates;
          if (!coords || !coords.lat || !coords.lon) return null;

          const icon = r.incident_type?.toLowerCase() === 'suggestion' ? suggestionIcon : issueIcon;

          return (
            <Marker key={r._id || i} position={[coords.lat, coords.lon]} icon={icon}>
              <Popup>
                <strong>{r.incident_type}</strong><br />
                {r.issue_description || 'No description'}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div >
  );
};

export default MapComponent;
