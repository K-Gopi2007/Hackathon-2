import { Map, Phone, Navigation, Info, Sun, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GuestPortal = ({ activeIncidents, onToggleSafety }) => {
  return (
    <div className="guest-view animate-slide-up" style={{ padding: 'var(--space-lg)', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 120px)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>Guest Safety</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.2em', fontWeight: 600 }}>GRAND PLAZA RESORT & SPA</p>
      </header>

      {/* Weather & Status Widget */}
      <div className="card glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '24px', 
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, transparent 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Sun size={40} color="var(--alert-orange)" />
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>28°C</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clear Skies • Sunset 18:42</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="badge badge-success" style={{ marginBottom: '4px' }}>System Optimal</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Last scanned: 2 mins ago</div>
        </div>
      </div>

      {activeIncidents.length > 0 && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card pulse" 
          style={{ border: '2px solid var(--crisis-red)', marginBottom: '24px', background: 'rgba(255, 59, 48, 0.08)', padding: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--crisis-red)', borderRadius: '12px' }}>
              <ShieldAlert color="white" size={32} />
            </div>
            <div>
              <h2 style={{ color: 'var(--crisis-red)', fontSize: '1.5rem', fontWeight: 800 }}>Emergency Alert</h2>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Active Protocol: EVACUATE</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>A safety incident has been reported. Please remain calm, grab essential belongings only, and proceed to your nearest assembly point immediately.</p>
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', borderLeft: '4px solid var(--crisis-red)' }}>
            <span style={{ fontWeight: 800, color: 'var(--crisis-red)' }}>LOCATION:</span> FLOOR 1 KITCHEN AREA. AVOID ELEVATORS.
          </div>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <motion.div whileHover={{ x: 10 }} className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', cursor: 'pointer' }}>
          <div style={{ padding: '16px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '16px' }}>
            <Map color="var(--safety-green)" size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interactive Escape Map</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Live route to nearest safety zone</p>
          </div>
          <ChevronRight color="var(--text-tertiary)" />
        </motion.div>

        <motion.div whileHover={{ x: 10 }} className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', cursor: 'pointer' }}>
          <div style={{ padding: '16px', background: 'rgba(0, 122, 255, 0.1)', borderRadius: '16px' }}>
            <Phone color="var(--info-blue)" size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Emergency Concierge</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Direct line to Crisis Response Team</p>
          </div>
          <div style={{ color: 'var(--info-blue)', fontWeight: 800, fontSize: '0.9rem' }}>TAP TO CALL</div>
        </motion.div>

        <motion.div whileHover={{ x: 10 }} className="card glass-panel" onClick={onToggleSafety} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', cursor: 'pointer' }}>
          <div style={{ padding: '16px', background: 'rgba(255, 149, 0, 0.1)', borderRadius: '16px' }}>
            <Info color="var(--alert-orange)" size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Standard Operating Procedures</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Detailed fire, medical & security guides</p>
          </div>
          <ChevronRight color="var(--text-tertiary)" />
        </motion.div>
      </div>

      <footer style={{ marginTop: '48px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Room: 402 | Guest: John Doe</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>Powered by RCRS Hospitality v1.0</p>
      </footer>
    </div>
  );
};

export default GuestPortal;
