import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  UserCircle, 
  HelpCircle, 
  Bell,
  Menu,
  X
} from 'lucide-react';

const MainLayout = ({ children, role, onToggleSafety }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const getRoleTitle = () => {
    switch(role) {
      case 'MANAGER': return 'Command Center';
      case 'STAFF': return 'Staff Portal';
      case 'GUEST': return 'Guest Safety';
      default: return 'RCRS';
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: ShieldCheck, label: 'Protocols', onClick: onToggleSafety },
    { icon: UserCircle, label: 'Profile' },
    { icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="main-layout" style={{ display: 'flex', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Sidebar for Manager/Staff */}
      {(role === 'MANAGER' || role === 'STAFF') && (
        <aside className={`glass-panel sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
          width: '280px',
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xl)',
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
          transition: 'transform 0.3s ease',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--info-blue)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px var(--info-blue-glow)'
            }}>
              <ShieldCheck color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>RCRS PRO</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', flex: 1 }}>
            {menuItems.map((item, idx) => (
              <button 
                key={idx}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: item.active ? 'var(--bg-elevated)' : 'transparent',
                  border: 'none',
                  color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <item.icon size={20} />
                <span style={{ fontWeight: 600 }}>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="user-profile" style={{ 
            marginTop: 'auto',
            padding: '16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-accent)', borderRadius: '50%' }}></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{role} USER</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Online</div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="content-wrapper" style={{ 
        flex: 1
      }}>
        <header style={{
          padding: 'var(--space-lg) var(--space-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {(role === 'MANAGER' || role === 'STAFF') && (
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'block' }}
                className="hide-desktop"
              >
                {isSidebarOpen ? <X /> : <Menu />}
              </button>
            )}
            <div>
              <h1 className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{getRoleTitle()}</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Active • {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }} className="hide-mobile">
              <span className="badge badge-success">Connectivity: Optimal</span>
              {role === 'MANAGER' && <span className="badge badge-info">Nodes: 12 Active</span>}
            </div>
            <button style={{ 
              background: 'var(--bg-elevated)', 
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .sidebar { 
            position: fixed !important;
            transform: translateX(-100%) !important;
          }
          .sidebar.open {
            transform: translateX(0) !important;
          }
          .hide-desktop { display: block !important; }
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 1024px) {
          .sidebar { 
            position: relative !important;
            transform: translateX(0) !important;
          }
          .content-wrapper {
            margin-left: ${role === 'GUEST' ? '0' : '0'} !important;
          }
          .hide-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
