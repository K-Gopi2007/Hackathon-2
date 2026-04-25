import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('MANAGER');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 1200);
  };

  const roles = [
    { id: 'MANAGER', label: 'Manager', icon: '🛡️' },
    { id: 'STAFF', label: 'Staff', icon: '📞' },
    { id: 'GUEST', label: 'Guest', icon: '👤' }
  ];

  return (
    <div className="login-container">
      <div className="landscape-bg"></div>
      <div className="landscape-overlay"></div>
      
      <div className="login-card glass-panel animate-slide-up">
        <div className="login-header">
          <span className="login-logo text-gradient">RCRS</span>
          <h1 className="login-title">Rapid Crisis Response</h1>
          <p className="login-subtitle">Secure Emergency Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="role-selection">
            {roles.map(role => (
              <div 
                key={role.id}
                className={`role-option ${selectedRole === role.id ? 'active' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <span className="role-icon">{role.icon}</span>
                <span className="role-label">{role.label}</span>
              </div>
            ))}
          </div>

          <div className="input-group">
            <label className="input-label">Access ID / Username</label>
            <input 
              type="text" 
              className="login-input" 
              placeholder="Enter your ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Security Key</label>
            <input 
              type="password" 
              className="login-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number (for GPS Tracking)</label>
            <input 
              type="tel" 
              className="login-input" 
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px', marginLeft: '4px' }}>
              Used for emergency location services and real-time tracking.
            </p>
          </div>


          <button 
            type="submit" 
            className={`btn btn-primary ${isLoading ? 'pulse' : ''}`}
            style={{ width: '100%', height: '50px', marginTop: '10px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Establish Connection'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2024 Global Safety Systems. All protocols active.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
