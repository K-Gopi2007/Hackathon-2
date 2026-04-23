import React, { useState } from 'react';
import { Map, Phone, Navigation, Info, Sun, ShieldAlert, ChevronRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FireShield from '../components/FireShield/FireShield';

const GuestPortal = ({ activeIncidents, onToggleSafety, onReportTriggered }) => {
  const [showFireShield, setShowFireShield] = useState(false);

  if (showFireShield) {
    return (
      <div className="guest-view" style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        <header style={{ padding: 'var(--space-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame color="var(--crisis-red)" />
            <span style={{ fontWeight: 800, letterSpacing: '0.1em' }}>FIRE SHIELD</span>
          </div>
          <button className="btn" onClick={() => setShowFireShield(false)} style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Exit</button>
        </header>
        <FireShield onReportTriggered={(data) => {
          onReportTriggered(data);
          setShowFireShield(false);
        }} />
      </div>
    );
  }

  return (
    <div className="guest-view animate-slide-up" style={{ padding: 'var(--space-lg)', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 120px)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>Guest Safety</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.2em', fontWeight: 600 }}>GRAND PLAZA RESORT & SPA</p>
      </header>

      {/* FIRE SHIELD CTA - HIGH PRIORITY */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFireShield(true)}
        className="card" 
        style={{ 
          background: 'var(--crisis-red)', 
          color: 'white', 
          padding: '24px', 
          marginBottom: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px var(--crisis-red-glow)'
        }}
      >
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
          <Flame size={40} fill="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>FIRE REPORT</h2>
          <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Instant emergency coordinate transmission</p>
        </div>
        <ChevronRight size={32} />
      </motion.div>

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

      <div className="card glass-panel" style={{ marginTop: '24px', padding: '24px', background: 'rgba(255, 255, 255, 0.02)' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Info size={20} color="var(--info-blue)" /> 24/7 Guest Support
        </h4>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Our dedicated Safety & Support Team is available around the clock to assist you. Whether you need immediate medical attention, have a safety concern, or simply requires information about our resort's emergency protocols, we are just a tap away. Your security is our highest priority at Grand Plaza Resort & Spa.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginTop: '24px' }}>
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
