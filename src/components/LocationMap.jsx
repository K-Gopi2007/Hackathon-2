import React from 'react';

const LocationMap = ({ activeIncidents = [], interactive = false, onLocationSelect }) => {
  const [selectedPos, setSelectedPos] = React.useState(null);

  const handleMapClick = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setSelectedPos({ x, y });
    if (onLocationSelect) {
      onLocationSelect(`Coordinates: ${x.toFixed(1)}°N, ${y.toFixed(1)}°E`);
    }
  };

  return (
    <div 
      className="location-map card" 
      onClick={handleMapClick}
      style={{ 
        height: '100%', 
        width: '100%',
        position: 'relative', 
        overflow: 'hidden', 
        padding: 0,
        cursor: interactive ? 'crosshair' : 'default',
        background: '#1a1a1c'
      }}
    >
      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        top: '-50%',
        left: '-50%',
        backgroundSize: '30px 30px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        transform: 'rotate(15deg)',
      }}></div>
      
      {/* Abstract Topographic Lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        <path d="M0,50 Q100,20 200,80 T400,30 T600,90" fill="none" stroke="white" strokeWidth="1" />
        <path d="M0,150 Q150,100 300,180 T600,120" fill="none" stroke="white" strokeWidth="1" />
        <path d="M-50,250 Q200,200 400,280 T700,220" fill="none" stroke="white" strokeWidth="1" />
      </svg>

      {/* Existing Incidents */}
      {activeIncidents.map(inc => (
        <div 
          key={inc.id}
          style={{
            position: 'absolute',
            top: '45%',
            left: '55%',
            width: '24px',
            height: '24px',
            background: 'rgba(255, 59, 48, 0.2)',
            border: '2px solid var(--crisis-red)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          className="pulse"
        >
          <div style={{ width: '8px', height: '8px', background: 'var(--crisis-red)', borderRadius: '50%', margin: 'auto' }}></div>
        </div>
      ))}

      {/* Selected Location Pin */}
      {selectedPos && (
        <div 
          style={{
            position: 'absolute',
            top: `${selectedPos.y}%`,
            left: `${selectedPos.x}%`,
            transform: 'translate(-50%, -100%)',
            zIndex: 20,
            color: 'var(--crisis-red)',
            filter: 'drop-shadow(0 0 10px rgba(255,59,48,0.5))'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-9-7-9zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      )}

      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
        GPS: ACTIVE • HIGH PRECISION
      </div>
    </div>
  );
};


export default LocationMap;
