import React from 'react';
import { Map, Phone, Navigation, Info } from 'lucide-react';

const GuestPortal = ({ activeIncidents }) => {
  return (
    <div className="guest-view" style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Safety & Support Portal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Grand Plaza Resort & Spa</p>
      </header>

      {activeIncidents.length > 0 && (
        <div className="card pulse" style={{ border: '2px solid var(--crisis-red)', marginBottom: '24px', background: 'rgba(255, 59, 48, 0.1)' }}>
          <h2 style={{ color: 'var(--crisis-red)', fontSize: '1.2rem', marginBottom: '8px' }}>Emergency Alert</h2>
          <p>A safety incident has been reported in the building. Please stay calm and follow the instructions below.</p>
          <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
            STATUS: EVACUATE TO NEAREST ASSEMBLY POINT
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '12px' }}>
            <Map color="var(--safety-green)" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem' }}>Evacuation Map</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>View your nearest exit routes</p>
          </div>
          <Navigation style={{ marginLeft: 'auto' }} size={18} />
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '12px' }}>
            <Phone color="var(--info-blue)" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem' }}>Emergency Contact</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Direct line to Front Desk</p>
          </div>
          <div style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'var(--info-blue)' }}>CALL</div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'rgba(255, 149, 0, 0.1)', borderRadius: '12px' }}>
            <Info color="var(--alert-orange)" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem' }}>Safety Procedures</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fire, Medical, and Security info</p>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '48px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Room: 402 | Guest: John Doe</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>Powered by RCRS Hospitality v1.0</p>
      </footer>
    </div>
  );
};

export default GuestPortal;
