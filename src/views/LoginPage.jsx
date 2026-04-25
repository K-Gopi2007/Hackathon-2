import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  User, 
  Phone, 
  Activity, 
  Globe, 
  Cpu, 
  Zap,
  ChevronRight,
  UserCheck,
  ShieldCheck,
  Contact
} from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('MANAGER');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 1500);
  };

  const roles = [
    { id: 'MANAGER', label: 'Manager', icon: ShieldCheck, desc: 'Full System Control' },
    { id: 'STAFF', label: 'Staff', icon: UserCheck, desc: 'Operational Access' },
    { id: 'GUEST', label: 'Guest', icon: Contact, desc: 'Safety Portal' }
  ];

  return (
    <div className="login-container">
      <div className="login-bg-grid"></div>
      <div className="login-glow"></div>
      
      <motion.div 
        className="login-wrapper"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Left Side: Branding & Info */}
        <div className="login-side-info">
          <div>
            <div className="system-status-indicator">
              <span className="status-dot"></span>
              System Status: Operational
            </div>
            
            <div className="login-branding" style={{ marginTop: '40px' }}>
              <motion.h1 
                className="text-gradient"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                RCRS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Rapid Crisis Response System.<br />
                Next-generation emergency management and location tracking.
              </motion.p>
            </div>
          </div>

          <div className="tech-specs">
            <div className="spec-item">
              <span className="spec-label">Security Protocol</span>
              <span className="spec-value">AES-256 / RSA</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Network Latency</span>
              <span className="spec-value">12ms (Optimal)</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">System Uptime</span>
              <span className="spec-value">99.998%</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Current Time</span>
              <span className="spec-value">{systemTime}</span>
            </div>
          </div>

          <div className="login-footer-info" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', opacity: 0.6 }}>
            ENCRYPTED CONNECTION • SECURE NODE 7 • v4.2.0
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-area">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Authenticate</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select your role to establish connection</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="role-cards">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`role-card ${selectedRole === role.id ? 'active' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <role.icon className="role-card-icon" size={24} />
                  <span className="role-card-label">{role.label}</span>
                </div>
              ))}
            </div>

            <div className="input-container">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                className="login-field" 
                placeholder="Access ID / Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                className="login-field" 
                placeholder="Security Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <Phone className="input-icon" size={18} />
              <input 
                type="tel" 
                className="login-field" 
                placeholder="Emergency Contact / GPS"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`btn btn-login ${isLoading ? 'pulse' : ''}`}
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity className="pulse" size={18} />
                  Synchronizing...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Establish Connection
                  <ChevronRight size={18} />
                </span>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Authorized Personnel Only. Unauthorized access is strictly prohibited and monitored.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
