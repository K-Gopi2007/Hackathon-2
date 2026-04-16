import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertBanner = ({ incidents }) => {
  if (incidents.length === 0) return null;

  const criticalIncident = incidents.find(inc => inc.priority === 'CRITICAL');
  const bannerType = criticalIncident ? 'alert-danger' : 'alert-warning';

  return (
    <div className={`alert-banner ${bannerType} pulse`} style={{
      background: criticalIncident ? 'var(--crisis-red)' : 'var(--alert-orange)',
      color: criticalIncident ? 'white' : 'black',
      padding: '12px 24px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      zIndex: 999,
      position: 'relative'
    }}>
      <AlertTriangle size={24} />
      <span>{incidents.length} ACTIVE EMERGENCY {incidents.length > 1 ? 'ALERTS' : 'ALERT'}</span>
      <div className="banner-details">
        {criticalIncident ? `LATEST: ${criticalIncident.type} AT ${criticalIncident.location}` : 'MONITORING ACTIVE INCIDENTS'}
      </div>
    </div>
  );
};

export default AlertBanner;
