import React, { useState } from 'react';
import ManagerDashboard from './views/ManagerDashboard';
import StaffInterface from './views/StaffInterface';
import GuestPortal from './views/GuestPortal';
import AlertBanner from './components/AlertBanner';
import SafetyProcedures from './components/SafetyProcedures';

function App() {
  const [role, setRole] = useState('MANAGER'); // 'MANAGER', 'STAFF', 'GUEST'
  const [isOffline, setIsOffline] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [activeIncidents, setActiveIncidents] = useState([
    {
      id: 1,
      type: 'FIRE',
      location: 'Kitchen - Floor 1',
      status: 'IN_PROGRESS',
      timestamp: new Date().toISOString(),
      priority: 'CRITICAL'
    }
  ]);

  const triggerAlert = (incident) => {
    setActiveIncidents([incident, ...activeIncidents]);
  };

  const resolveIncident = (id) => {
    setActiveIncidents(activeIncidents.filter(inc => inc.id !== id));
  };

  const toggleSafety = () => setShowSafety(!showSafety);

  return (
    <div className="app-container">
      {/* Role Switcher (Demo Only) */}
      <div className="role-switcher" style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'var(--bg-elevated)',
        padding: '10px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
        border: '1px solid var(--glass-border)'
      }}>
        <button className={`btn ${role === 'MANAGER' ? 'btn-primary' : ''}`} onClick={() => setRole('MANAGER')}>Manager</button>
        <button className={`btn ${role === 'STAFF' ? 'btn-primary' : ''}`} onClick={() => setRole('STAFF')}>Staff</button>
        <button className={`btn ${role === 'GUEST' ? 'btn-primary' : ''}`} onClick={() => setRole('GUEST')}>Guest</button>
        <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 5px' }}></div>
        <button 
          className={`btn ${isOffline ? 'btn-danger' : 'btn-success'}`} 
          onClick={() => setIsOffline(!isOffline)}
          style={{ fontSize: '0.7rem', opacity: 0.8 }}
        >
          {isOffline ? 'OFFLINE (SMS)' : 'ONLINE'}
        </button>
      </div>

      <AlertBanner incidents={activeIncidents} />

      {showSafety && <SafetyProcedures onClose={toggleSafety} />}

      <main>
        {role === 'MANAGER' && <ManagerDashboard incidents={activeIncidents} onResolve={resolveIncident} onToggleSafety={toggleSafety} />}
        {role === 'STAFF' && <StaffInterface onTrigger={triggerAlert} activeIncidents={activeIncidents} onToggleSafety={toggleSafety} />}
        {role === 'GUEST' && <GuestPortal activeIncidents={activeIncidents} onToggleSafety={toggleSafety} />}
      </main>
    </div>
  );
}

export default App;
