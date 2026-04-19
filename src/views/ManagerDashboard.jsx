import React from 'react';
import { Activity, Shield, Users, Clock, Terminal } from 'lucide-react';

const ManagerDashboard = ({ incidents, onResolve, onToggleSafety }) => {
  return (
    <div className="dashboard-view" style={{ padding: '24px' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Crisis Management Command Center</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Real-time monitoring and resource allocation</p>
          </div>
          <button 
            onClick={onToggleSafety}
            style={{ 
              background: 'var(--bg-elevated)', 
              color: 'var(--text-secondary)',
              border: '1px solid var(--glass-border)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Shield size={14} /> Protocols
          </button>
        </div>
        <div className="status-badge" style={{ background: 'var(--bg-elevated)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: incidents.length > 0 ? 'var(--crisis-red)' : 'var(--safety-green)' }}></div>
          <span>System {incidents.length > 0 ? 'ALARM' : 'OPTIMAL'}</span>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* KPI Cards */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity color="var(--info-blue)" />
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Active Incidents</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{incidents.length}</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Clock color="var(--alert-orange)" />
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Response Time</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>1.4m</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Users color="var(--safety-green)" />
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Staff On Duty</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>42</div>
        </div>
      </div>

      <div className="main-content" style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <section className="incident-log">
          <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={20} /> Active Incident Feed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {incidents.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '48px' }}>
                No active incidents reported.
              </div>
            ) : (
              incidents.map(inc => (
                <div key={inc.id} className="card" style={{ borderLeft: `4px solid ${inc.priority === 'CRITICAL' ? 'var(--crisis-red)' : 'var(--alert-orange)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem' }}>{inc.type} in {inc.location}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reported: {new Date(inc.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => onResolve(inc.id)}>Resolve</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="resource-status">
          <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} /> Local Resources
          </h2>
          <div className="card">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Fire Response Team</span>
                <span style={{ color: 'var(--safety-green)' }}>READY</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Medical Unit 1</span>
                <span style={{ color: 'var(--alert-orange)' }}>BUSY</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Security Patrol A</span>
                <span style={{ color: 'var(--safety-green)' }}>ACTIVE</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
