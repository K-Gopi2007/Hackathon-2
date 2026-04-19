import React from 'react';
import { X, Flame, HeartPulse, ShieldAlert, Phone, HelpCircle, ChevronRight } from 'lucide-react';

const SafetyProcedures = ({ onClose }) => {
  const sections = [
    {
      id: 'fire',
      title: '1. Fire Emergency Procedures',
      icon: <Flame color="var(--crisis-red)" />,
      color: 'var(--crisis-red)',
      content: [
        { subtitle: 'If you discover a fire:', items: [
          'Activate the nearest fire alarm.',
          'Call emergency services immediately.',
          'Notify nearby people and evacuate the area.',
          'Use a fire extinguisher only if: The fire is small and contained, you are trained to use it, and you have a safe exit route behind you.'
        ]},
        { subtitle: 'Evacuation Steps:', items: [
          'Remain calm and move quickly.',
          'Use stairs, never elevators.',
          'Close doors behind you if possible.',
          'Proceed to the designated assembly point.',
          'Do not re-enter until authorities declare it safe.'
        ]},
        { subtitle: 'If trapped:', items: [
          'Stay low to avoid smoke.',
          'Seal door gaps with cloth if possible.',
          'Signal for help from a window or call emergency services.'
        ]}
      ]
    },
    {
      id: 'medical',
      title: '2. Medical Emergency Procedures',
      icon: <HeartPulse color="var(--alert-orange)" />,
      color: 'var(--alert-orange)',
      content: [
        { subtitle: 'If someone is injured or ill:', items: [
          'Assess the scene for safety.',
          'Call emergency medical services immediately.',
          'Provide location and condition details.',
          'Do not move the injured person unless there is immediate danger.'
        ]},
        { subtitle: 'Basic First Aid:', items: [
          'Unconscious but breathing: Place in recovery position.',
          'Not breathing: Begin CPR if trained.',
          'Bleeding: Apply direct pressure with clean cloth.',
          'Burns: Cool with running water (not ice).',
          'Choking: Perform abdominal thrusts if trained.'
        ]},
        { subtitle: 'Important:', items: [
          'Stay with the person until help arrives.',
          'Keep them calm and comfortable.'
        ]}
      ]
    },
    {
      id: 'security',
      title: '3. Security Emergency Procedures',
      icon: <ShieldAlert color="var(--info-blue)" />,
      color: 'var(--info-blue)',
      content: [
        { subtitle: 'Threat, violence, or suspicious activity:', items: [
          'Stay calm.',
          'Alert security or police immediately.',
          'Provide clear details: location, description, type of threat.'
        ]},
        { subtitle: 'If evacuation is safe:', items: [
          'Leave the area quickly.',
          'Warn others if possible.',
          'Move to a secure location.'
        ]},
        { subtitle: 'If evacuation is unsafe:', items: [
          'Lock or barricade doors.',
          'Silence phones.',
          'Stay out of sight.',
          'Remain quiet until authorities arrive.'
        ]},
        { subtitle: 'Suspicious Package:', items: [
          'Do not touch or move it.',
          'Isolate the area.',
          'Notify security immediately.'
        ]}
      ]
    },
    {
      id: 'general',
      title: '4. General Safety Rules',
      icon: <HelpCircle color="var(--text-secondary)" />,
      color: 'var(--text-secondary)',
      content: [
        { subtitle: 'Standard Protocols:', items: [
          'Know exits and assembly points.',
          'Report hazards immediately.',
          'Keep walkways clear.',
          'Participate in drills.',
          'Follow instructions from emergency responders.'
        ]}
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(20px)',
      zIndex: 2000,
      overflowY: 'auto',
      padding: '40px 20px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Safety Procedures</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Protocol & Emergency Instructions</p>
          </div>
          <button 
            onClick={onClose}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--glass-border)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X />
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sections.map((section) => (
            <div key={section.id} className="card" style={{ borderLeft: `4px solid ${section.color}`, padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ 
                  padding: '12px', 
                  background: `${section.color}15`, 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {section.icon}
                </div>
                <h2 style={{ fontSize: '1.4rem' }}>{section.title}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {section.content.map((block, idx) => (
                  <div key={idx}>
                    <h4 style={{ 
                      fontSize: '0.9rem', 
                      color: section.color, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      marginBottom: '12px'
                    }}>
                      {block.subtitle}
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {block.items.map((item, i) => (
                        <li key={i} style={{ 
                          fontSize: '0.95rem', 
                          color: 'var(--text-primary)',
                          display: 'flex',
                          gap: '10px'
                        }}>
                          <ChevronRight size={16} style={{ marginTop: '4px', opacity: 0.5, flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: '60px', textAlign: 'center', opacity: 0.5 }}>
          <p>© 2026 RCRS Hospitality Safety Standards</p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SafetyProcedures;
