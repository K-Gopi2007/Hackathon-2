import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center to a specific location if no incidents exist
const defaultCenter = {
  lat: 39.1911,
  lng: -106.8175
};

const LocationMap = ({ activeIncidents = [], interactive = false, onLocationSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // Empty string will show development mode
  });

  const [map, setMap] = useState(null);
  const [selectedPos, setSelectedPos] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (e) => {
    if (!interactive) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setSelectedPos({ lat, lng });
    
    if (onLocationSelect) {
      onLocationSelect({
        address: `Coordinates: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
        lat,
        lng
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="location-map card" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1c' }}>
        <div className="pulse" style={{ width: '20px', height: '20px', background: 'var(--info-blue)', borderRadius: '50%' }}></div>
      </div>
    );
  }

  // Calculate center based on incidents or default
  const center = activeIncidents.length > 0 && activeIncidents[0].lat 
    ? { lat: activeIncidents[0].lat, lng: activeIncidents[0].lng } 
    : defaultCenter;

  return (
    <div 
      className="location-map card" 
      style={{ 
        height: '100%', 
        width: '100%',
        position: 'relative', 
        overflow: 'hidden', 
        padding: 0,
        background: '#1a1a1c'
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeId: 'satellite',
          clickableIcons: false
        }}
      >
        {/* Existing Incidents */}
        {activeIncidents.map(inc => {
          if (!inc.lat || !inc.lng) return null;
          
          let iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          if (inc.priority === 'CRITICAL' || inc.type?.includes('FIRE')) {
            iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
          } else if (inc.type?.includes('MEDICAL') || inc.priority === 'HIGH') {
            iconUrl = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
          }

          return (
            <Marker
              key={inc.id}
              position={{ lat: inc.lat, lng: inc.lng }}
              icon={{ url: iconUrl }}
              title={`${inc.type} - ${inc.location}`}
            />
          );
        })}

        {/* Selected Location Pin */}
        {selectedPos && (
          <Marker
            position={selectedPos}
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png' }}
          />
        )}
      </GoogleMap>

      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
        GPS: ACTIVE • SATELLITE VIEW
      </div>
    </div>
  );
};

export default LocationMap;
