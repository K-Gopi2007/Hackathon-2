import React, { useState } from 'react';
import ManagerDashboard from './views/ManagerDashboard';
import StaffInterface from './views/StaffInterface';
import GuestPortal from './views/GuestPortal';
import AlertBanner from './components/AlertBanner';
import SafetyProcedures from './components/SafetyProcedures';
import MainLayout from './components/MainLayout';
import LoginPage from './views/LoginPage';




function App() {
  const [role, setRole] = useState(null); // 'MANAGER', 'STAFF', 'GUEST', or null

  const [showSafety, setShowSafety] = useState(false);
  const [activeIncidents, setActiveIncidents] = useState([{
    id: 1,
    type: 'FIRE',
    location: 'Kitchen - Floor 1',
    lat: 39.1920,
    lng: -106.8180,
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
        lat: 39.1915,
        lng: -106.8170,
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
        type: payload.emergencyType ? payload.emergencyType.toUpperCase() : (payload.type || 'EMERGENCY'),
        location: payload.location || 'Unknown Location',
        lat: payload.lat || 39.1911,
        lng: payload.lng || -106.8175,
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


      {!role ? (
        <LoginPage onLogin={(selectedRole) => setRole(selectedRole)} />
      ) : (
        <MainLayout role={role} onToggleSafety={toggleSafety} onLogout={() => setRole(null)}>
          <AlertBanner incidents={activeIncidents} />
          
          {showSafety && <SafetyProcedures onClose={toggleSafety} />}

          <div className="view-content">
            {role === 'MANAGER' && <ManagerDashboard incidents={activeIncidents} onResolve={resolveIncident} onToggleSafety={toggleSafety} onTrigger={triggerAlert} />}
            {role === 'STAFF' && <StaffInterface onTrigger={triggerAlert} activeIncidents={activeIncidents} onToggleSafety={toggleSafety} />}
            {role === 'GUEST' && <GuestPortal activeIncidents={activeIncidents} onToggleSafety={toggleSafety} onReportTriggered={triggerAlert} />}
          </div>
        </MainLayout>
      )}


    </div>
  );
}

export default App;
