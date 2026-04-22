import { Activity, Shield, Users, Clock, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

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

      <div className="dashboard-grid animate-slide-up">
        {/* KPI Cards */}
        <div className="card glass-panel" style={{ borderLeft: '4px solid var(--info-blue)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity color="var(--info-blue)" size={20} />
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Load</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{incidents.length}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Active Alerts</div>
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: 'var(--bg-accent)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(incidents.length / 5) * 100}%` }}
              style={{ height: '100%', background: 'var(--info-blue)', boxShadow: '0 0 10px var(--info-blue-glow)' }}
            />
          </div>
        </div>

        <div className="card glass-panel" style={{ borderLeft: '4px solid var(--alert-orange)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Clock color="var(--alert-orange)" size={20} />
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Response Performance</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>1.4<span style={{ fontSize: '1.2rem' }}>m</span></div>
            <div style={{ color: 'var(--safety-green)', fontSize: '0.8rem', fontWeight: 'bold' }}>↓ 12% vs last shift</div>
          </div>
          {/* Mock Trend SVG */}
          <svg width="100%" height="30" style={{ marginTop: '10px' }}>
            <path d="M0 25 L20 15 L40 20 L60 10 L80 18 L100 5 L120 15 L140 10" fill="none" stroke="var(--alert-orange)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="card glass-panel" style={{ borderLeft: '4px solid var(--safety-green)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Users color="var(--safety-green)" size={20} />
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deployment</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>42</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Personnel On Call</div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>96% readiness score</p>
        </div>
      </div>

      <div className="main-content" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--space-lg)', padding: '0 var(--space-lg) var(--space-lg)' }}>
        <section className="incident-log">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Terminal size={20} color="var(--info-blue)" /> Active Incident Feed
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem' }}>FILTER</button>
              <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem' }}>EXPORT</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {incidents.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card glass-panel" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '64px' }}>
                <Activity size={40} style={{ marginBottom: '16px', opacity: 0.2 }} />
                <p>System monitoring active. No critical incidents reported.</p>
              </motion.div>
            ) : (
              incidents.map((inc, idx) => (
                <motion.div 
                  key={inc.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card glass-panel" 
                  style={{ borderLeft: `4px solid ${inc.priority === 'CRITICAL' ? 'var(--crisis-red)' : 'var(--alert-orange)'}` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span className={`badge ${inc.priority === 'CRITICAL' ? 'badge-danger' : 'badge-info'}`}>{inc.priority}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>ID: #{inc.id} • {new Date(inc.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>{inc.type} - {inc.location}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{inc.description || 'Standard emergency protocol initiated.'}</p>
                      
                      <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        <span>Reporter: {inc.reporter || 'System'}</span>
                        <span>Status: <span style={{ color: 'var(--info-blue)', fontWeight: 600 }}>{inc.status}</span></span>
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => onResolve(inc.id)} style={{ fontSize: '0.8rem' }}>MARK RESOLVED</button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        <section className="resource-status">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={20} color="var(--safety-green)" /> Deployment Matrix
          </h2>
          <div className="card glass-panel" style={{ padding: 0 }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)' }}>
              <span>UNIT NAME</span>
              <span>STATUS</span>
            </div>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: 'Fire Response Alpha', status: 'READY', color: 'var(--safety-green)' },
                { name: 'Medical Unit 1', status: 'ON_SCENE', color: 'var(--alert-orange)' },
                { name: 'Security Patrol A', status: 'ACTIVE', color: 'var(--safety-green)' },
                { name: 'Hazard Tech Team', status: 'STANDBY', color: 'var(--info-blue)' },
                { name: 'Extraction Force', status: 'READY', color: 'var(--safety-green)' }
              ].map((res, i) => (
                <li key={i} style={{ 
                  padding: '16px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderBottom: i === 4 ? 'none' : '1px solid var(--glass-border)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{res.name}</div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    color: res.color, 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: `${res.color}15`,
                    border: `1px solid ${res.color}30`
                  }}>{res.status}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card glass-panel" style={{ marginTop: '24px', background: 'linear-gradient(135deg, var(--info-blue-glow) 0%, transparent 100%)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Network Strength</h4>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
              {[0.4, 0.6, 0.8, 0.7, 0.9, 1, 0.8].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: 'var(--info-blue)', borderRadius: '2px 2px 0 0', opacity: 0.6 + (h * 0.4) }}></div>
              ))}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Resort Mesh Network: 98.4% uptime</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
