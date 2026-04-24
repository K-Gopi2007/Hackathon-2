import React from 'react';
import { Flame, MapPin, Camera, AlertTriangle, Mountain, HelpCircle, Activity, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Step1Map = ({ onStartReport }) => {
  return (
    <div className="fireshield-step-container">
      {/* Mock Map Placeholder - In a real app, this would be the actual map engine */}
      <div className="fireshield-overlay">
        <motion.div 
          className="fireshield-prompt"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Tap on map to mark emergency location
        </motion.div>
        
        <motion.button 
          className="btn-fire-report pulse"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartReport}
          style={{ background: 'var(--crisis-red)', gap: '10px' }}
        >
          <AlertTriangle size={32} fill="white" />
          Emergency Report
        </motion.button>
      </div>
    </div>
  );
};

export const Step2Confirm = ({ location, onConfirm, onCancel }) => {
  return (
    <div className="fireshield-step-container">
      {/* Map would be centered on pin here */}
      <div className="location-confirm-card glass-panel animate-slide-up" style={{ padding: '24px', borderRadius: '24px' }}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin className="text-red-500" style={{ color: 'var(--crisis-red)' }} />
          Confirm Location
        </h3>
        
        <div className="address-box">
          <div className="address-label">Detected Address</div>
          <div className="address-text">{location || 'Mountain Ridge Road, Sector 4, Northern Valley'}</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
          <button className="btn" onClick={onCancel} style={{ background: 'var(--bg-accent)' }}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Confirm Location</button>
        </div>
      </div>
    </div>
  );
};

export const Step3Details = ({ onSubmit, onBack }) => {
  const [emergencyType, setEmergencyType] = React.useState('');
  const [hasInjuries, setHasInjuries] = React.useState(false);

  const types = [
    { id: 'fire', label: 'Fire', icon: Flame },
    { id: 'medical', label: 'Medical', icon: Activity },
    { id: 'security', label: 'Security', icon: ShieldAlert },
    { id: 'natural', label: 'Natural', icon: Mountain },
    { id: 'others', label: 'Others', icon: HelpCircle },
  ];

  return (
    <motion.div 
      className="fireshield-details-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Incident Details</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Provide essential information for fast response</p>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontWeight: '600', marginBottom: '12px', display: 'block' }}>Emergency Type</label>
        <div className="fire-type-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
          {types.map(type => (
            <div 
              key={type.id} 
              className={`fire-type-card ${emergencyType === type.id ? 'active' : ''}`}
              onClick={() => setEmergencyType(type.id)}
            >
              <type.icon size={32} />
              <span>{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="image-upload-zone">
        <Camera size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
        <p>Upload Images for Verification</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Tap to open camera or gallery</p>
      </div>

      <div className="injury-switch-container">
        <div>
          <div style={{ fontWeight: '600' }}>Reported Injuries?</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Are there any visible injuries?</div>
        </div>
        <label className="switch">
          <input type="checkbox" checked={hasInjuries} onChange={(e) => setHasInjuries(e.target.checked)} />
          <span className="slider"></span>
        </label>
      </div>

      <textarea 
        className="comment-box" 
        placeholder="Optional: Any specific details (e.g., weapons involved, visible smoke color)..."
      ></textarea>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '40px' }}>
        <button className="btn" onClick={onBack} style={{ background: 'var(--bg-accent)' }}>Back</button>
        <button 
          className="btn btn-danger" 
          disabled={!emergencyType}
          onClick={() => onSubmit({ emergencyType, hasInjuries })}
        >
          Send Report
        </button>
      </div>
    </motion.div>
  );
};

