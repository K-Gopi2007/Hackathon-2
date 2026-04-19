import React, { useState } from 'react';
import { AlertCircle, Flame, Heart, ShieldAlert, MessageSquare } from 'lucide-react';

const StaffInterface = ({ onTrigger, activeIncidents, onToggleSafety }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handlePanic = (type) => {
    onTrigger({
      id: Date.now(),
      type: type,
      location: 'Staff Area - Room 402',
      status: 'REPORTED',
      timestamp: new Date().toISOString(),
      priority: 'CRITICAL'
    });
    setShowOptions(false);
  };

  return (
    <div className="staff-view" style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2rem' }}>Staff Emergency Portal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Immediate alert triggering system</p>
      </header>

      {!showOptions ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => setShowOptions(true)}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'var(--crisis-red)',
              border: '10px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 50px rgba(255, 59, 48, 0.5)',
              transition: 'transform 0.2s ease'
            }}
            className="pulse"
          >
            PANIC
          </button>
          <p style={{ color: 'var(--text-secondary)' }}>Hold for 2 seconds to silent alert</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <button className="card" onClick={() => handlePanic('FIRE')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <Flame size={48} color="var(--crisis-red)" />
            <span>Fire</span>
          </button>
          <button className="card" onClick={() => handlePanic('MEDICAL')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <Heart size={48} color="var(--alert-orange)" />
            <span>Medical</span>
          </button>
          <button className="card" onClick={() => handlePanic('SECURITY')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <ShieldAlert size={48} color="var(--info-blue)" />
            <span>Security</span>
          </button>
          <button className="card" onClick={() => setShowOptions(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', opacity: 0.7 }}>
            <AlertCircle size={48} color="var(--text-secondary)" />
            <span>Cancel</span>
          </button>
        </div>
      )}

      <div className="active-status" style={{ marginTop: '48px' }}>
        <h3>Current Local Status</h3>
        <div className="card" style={{ marginTop: '16px' }}>
          {activeIncidents.length > 0 ? (
            <div>
              <div style={{ color: 'var(--crisis-red)', fontWeight: 'bold', marginBottom: '16px' }}>
                ⚠️ ACTIVE INCIDENT: {activeIncidents[0].type}
              </div>
              <div style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Required Protocol:</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Confirm location and severity</li>
                  <li style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Clear immediate area</li>
                  <li style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Direct guests to nearest exit</li>
                  <li style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Wait for Emergency Response Team</li>
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--safety-green)' }}>
              ✓ Area Secure
            </div>
          )}
        </div>
      </div>

      <div className="comm-channels" style={{ marginTop: '32px' }}>
        <h3>Coordination Channels</h3>
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button className="btn btn-primary" style={{ flex: 1, gap: '8px' }}>
            <MessageSquare size={18} /> Staff Chat
          </button>
          <button className="btn" onClick={onToggleSafety} style={{ flex: 1, gap: '8px', background: 'var(--bg-elevated)', color: 'white', border: '1px solid var(--glass-border)' }}>
            <ShieldAlert size={18} /> Protocols
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffInterface;
