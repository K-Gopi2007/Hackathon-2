import React from 'react';

const LocationMap = ({ activeIncidents }) => {
  return (
    <div className="location-map card" style={{ height: '300px', position: 'relative', overflow: 'hidden', padding: 0 }}>
      {/* Conceptual UI for a map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #2c2c2e 25%, #1c1c1e 25%, #1c1c1e 50%, #2c2c2e 50%, #2c2c2e 75%, #1c1c1e 75%, #1c1c1e 100%)',
        backgroundSize: '40px 40px',
        opacity: 0.3
      }}></div>
      
      {/* Floor Plan Overlay */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        border: '2px solid var(--text-tertiary)',
        borderRadius: '8px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)'
      }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ border: '1px solid var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>
            RM {101 + i}
          </div>
        ))}
      </div>

      {activeIncidents.map(inc => (
        <div 
          key={inc.id}
          style={{
            position: 'absolute',
            top: '40%',
            left: '60%',
            width: '20px',
            height: '20px',
            background: 'var(--crisis-red)',
            borderRadius: '50%',
            boxShadow: '0 0 15px var(--crisis-red)',
            zIndex: 10
          }}
          className="pulse"
        ></div>
      ))}

      <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
        FLOOR 1 - MAIN WING
      </div>
    </div>
  );
};

export default LocationMap;
