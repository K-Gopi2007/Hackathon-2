import React, { useState } from 'react';
import { AlertCircle, Flame, Heart, ShieldAlert, MessageSquare, Activity, ShieldCheck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const StaffInterface = ({ onTrigger, activeIncidents, onToggleSafety }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handlePanic = (type) => {
    onTrigger(type);
    setShowOptions(false);
  };

  return (
    <div className="staff-view animate-slide-up" style={{ padding: 'var(--space-lg)', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Tactical Response</h1>
        <p style={{ color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>RAPID ALERT & COORDINATION SYSTEM</p>
      </header>

      {!showOptions ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xl)', padding: '40px 0' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOptions(true)}
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ff5e57, #ff3b30)',
              border: '12px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 0 60px var(--crisis-red-glow), inset 0 0 30px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
            className="pulse"
          >
            <AlertCircle size={40} />
            PANIC
          </motion.button>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '4px' }}>READY TO TRANSMIT</p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Hold center for silent distress signal</p>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          {[
            { type: 'FIRE', icon: Flame, color: 'var(--crisis-red)', label: 'Fire / Smoke' },
            { type: 'MEDICAL', icon: Heart, color: 'var(--alert-orange)', label: 'Medical Emergency' },
            { type: 'SECURITY', icon: ShieldAlert, color: 'var(--info-blue)', label: 'Security Breach' },
            { type: 'SYSTEM', icon: MessageSquare, color: 'var(--text-secondary)', label: 'Other / Inquiry' }
          ].map((opt, i) => (
            <motion.button 
              key={i}
              whileHover={{ y: -5, background: 'var(--bg-accent)' }}
              className="card glass-panel" 
              onClick={() => opt.type === 'SYSTEM' ? setShowOptions(false) : handlePanic(opt.type)} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px', cursor: 'pointer', border: '1px solid var(--glass-border)' }}
            >
              <div style={{ padding: '20px', background: `${opt.color}15`, borderRadius: '20px', border: `1px solid ${opt.color}30` }}>
                <opt.icon size={40} color={opt.color} />
              </div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{opt.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      <div className="active-status" style={{ marginTop: 'var(--space-2xl)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Area Status</h3>
        
        {activeIncidents.length > 0 ? (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="card glass-panel" 
            style={{ border: '1px solid var(--crisis-red)', background: 'rgba(255, 59, 48, 0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--crisis-red)', fontWeight: 800, marginBottom: '20px', fontSize: '1.2rem' }}>
              <ShieldAlert className="pulse" />
              <span>CRITICAL ALERT: {activeIncidents[0].type}</span>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} /> REQUIRED PROTOCOL CHECKLIST
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Secure immediate surroundings and guests',
                  'Confirm location and nature of threat to Command',
                  'Deploy area suppression / lockdown measures',
                  'Await arrival of Specialist Response Team (SRT)',
                  'Begin systematic evacuation of non-essential personnel'
                ].map((step, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', cursor: 'pointer' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '6px', 
                      border: '2px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                      flexShrink: 0
                    }}>
                      <div style={{ width: '12px', height: '12px', background: 'var(--crisis-red)', borderRadius: '2px', opacity: 0 }}></div>
                    </div>
                    <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--safety-green-glow)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <ShieldCheck color="var(--safety-green)" />
            </div>
            <div>
              <h4 style={{ color: 'var(--safety-green)', fontWeight: 800 }}>AREA SECURE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>No active threats detected in your sector.</p>
            </div>
          </div>
        )}
      </div>

      <div className="comm-channels" style={{ marginTop: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-tertiary)' }}>CHANNELS</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary" style={{ flex: 1, gap: '10px', height: '56px' }}>
            <MessageSquare size={20} /> MISSION COMMS
          </button>
          <button className="btn" onClick={onToggleSafety} style={{ flex: 1, gap: '10px', height: '56px', background: 'var(--bg-elevated)', color: 'white', border: '1px solid var(--glass-border)' }}>
            <Shield size={20} /> PROTOCOLS
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffInterface;
