import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Start point (Guest Location)
const guestLocation = { lat: 39.1911, lng: -106.8175 };

// Evacuation path to the Safety Zone
const escapeRoute = [
  { lat: 39.1911, lng: -106.8175 }, // Guest Room
  { lat: 39.1915, lng: -106.8170 }, // Hallway
  { lat: 39.1920, lng: -106.8160 }, // Exit
  { lat: 39.1925, lng: -106.8155 }  // Assembly Point
];

// End point (Safety Zone)
const safetyZone = escapeRoute[escapeRoute.length - 1];

const InteractiveEscapeMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // Empty string will show development mode
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="location-map card" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1c' }}>
        <div className="pulse" style={{ width: '20px', height: '20px', background: 'var(--safety-green)', borderRadius: '50%' }}></div>
      </div>
    );
  }

  return (
    <div 
      className="location-map card" 
      style={{ 
        height: '100%', 
        width: '100%',
        position: 'relative', 
        overflow: 'hidden', 
        padding: 0,
        background: '#1a1a1c',
        borderRadius: '24px'
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={guestLocation}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeId: 'satellite',
          clickableIcons: false
        }}
      >
        {/* Draw the evacuation route */}
        <Polyline
          path={escapeRoute}
          options={{
            strokeColor: '#34c759', // var(--safety-green)
            strokeOpacity: 0.8,
            strokeWeight: 6,
          }}
        />

        {/* Guest Location */}
        <Marker
          position={guestLocation}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
          title="Your Location"
        />

        {/* Safety Zone */}
        <Marker
          position={safetyZone}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
          title="Safe Assembly Point"
        />
      </GoogleMap>

      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(0,0,0,0.8)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--safety-green)', color: 'white', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--info-blue)' }}></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Your Location</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--safety-green)' }}></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Safe Assembly Point</span>
        </div>
        <div style={{ marginTop: '4px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Follow the green path to safety.</div>
      </div>
    </div>
  );
};

export default InteractiveEscapeMap;
