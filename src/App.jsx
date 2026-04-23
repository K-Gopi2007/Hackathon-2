import React, { useState } from 'react';
import ManagerDashboard from './views/ManagerDashboard';
import StaffInterface from './views/StaffInterface';
import GuestPortal from './views/GuestPortal';
import AlertBanner from './components/AlertBanner';
import SafetyProcedures from './components/SafetyProcedures';
import MainLayout from './components/MainLayout';

function App() {
  const [role, setRole] = useState('MANAGER'); // 'MANAGER', 'STAFF', 'GUEST'
  const [isOffline, setIsOffline] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [activeIncidents, setActiveIncidents] = useState([{
    id: 1,
    type: 'FIRE',
    location: 'Kitchen - Floor 1',
    status: 'IN_PROGRESS',
    timestamp: new Date().toISOString(),
    priority: 'CRITICAL',
    reporter: 'Chef Mario',
    description: 'Grease fire in main kitchen area. Suppression system activated.'
  }]);

  const triggerAlert = (payload) => {
    let newIncident;
    if (typeof payload === 'string') {
      newIncident = {
        id: Date.now(),
        type: payload,
        location: 'Staff Area - Sector 7',
        status: 'REPORTED',
        timestamp: new Date().toISOString(),
        priority: 'CRITICAL',
        reporter: 'Staff On Duty',
        description: 'Emergency signal triggered via mobile interface.'
      };
    } else {
      newIncident = {
        ...payload,
        id: payload.id || Date.now(),
        type: payload.fireType ? `FIRE - ${payload.fireType.toUpperCase()}` : 'FIRE',
        location: payload.location || 'Unknown Location',
        status: payload.status || 'REPORTED',
        timestamp: payload.timestamp || new Date().toISOString(),
        priority: payload.priority || 'CRITICAL',
        reporter: 'Guest Portal',
        description: `Guest emergency report. Injuries: ${payload.hasInjuries ? 'Yes' : 'No'}`
      };
    }
    setActiveIncidents([newIncident, ...activeIncidents]);
  };

  const resolveIncident = (id) => {
    setActiveIncidents(activeIncidents.filter(inc => inc.id !== id));
  };

  const toggleSafety = () => setShowSafety(!showSafety);

  return (
    <div className="app-container">
      <div className="landscape-bg"></div>
      <div className="landscape-overlay"></div>

      <MainLayout role={role} onToggleSafety={toggleSafety}>
        <AlertBanner incidents={activeIncidents} />
        
        {showSafety && <SafetyProcedures onClose={toggleSafety} />}

        <div className="view-content">
          {role === 'MANAGER' && <ManagerDashboard incidents={activeIncidents} onResolve={resolveIncident} onToggleSafety={toggleSafety} onTrigger={triggerAlert} />}
          {role === 'STAFF' && <StaffInterface onTrigger={triggerAlert} activeIncidents={activeIncidents} onToggleSafety={toggleSafety} />}
          {role === 'GUEST' && <GuestPortal activeIncidents={activeIncidents} onToggleSafety={toggleSafety} onReportTriggered={triggerAlert} />}
        </div>
      </MainLayout>

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
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <button className={`btn ${role === 'MANAGER' ? 'btn-primary' : ''}`} onClick={() => setRole('MANAGER')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Manager</button>
        <button className={`btn ${role === 'STAFF' ? 'btn-primary' : ''}`} onClick={() => setRole('STAFF')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Staff</button>
        <button className={`btn ${role === 'GUEST' ? 'btn-primary' : ''}`} onClick={() => setRole('GUEST')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Guest</button>
        <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 5px' }}></div>
        <button 
          className={`btn ${isOffline ? 'btn-danger' : 'btn-success'}`} 
          onClick={() => setIsOffline(!isOffline)}
          style={{ fontSize: '0.7rem', opacity: 0.8, padding: '6px 12px' }}
        >
          {isOffline ? 'OFFLINE' : 'ONLINE'}
        </button>
      </div>
    </div>
  );
}

export default App;
