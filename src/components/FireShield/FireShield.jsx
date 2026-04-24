import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Step1Map, Step2Confirm, Step3Details } from './FireShieldSteps';
import './FireShield.css';
import LocationMap from '../LocationMap';

const FireShield = ({ onReportTriggered }) => {
  const [step, setStep] = useState(1);
  const [incidentData, setIncidentData] = useState({
    location: null,
    type: '',
    hasInjuries: false,
    timestamp: null
  });

  const handleStartReport = () => {
    setStep(2);
  };

  const handleConfirmLocation = () => {
    setStep(3);
  };

  const handleFinalSubmit = (details) => {
    const finalData = {
      ...incidentData,
      ...details,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      status: 'REPORTED',
      priority: 'CRITICAL'
    };
    
    // Call parent handler to update global state
    onReportTriggered(finalData);
    
    // Reset or show success
    setStep(1);
    alert('EMERGENCY REPORT SENT SUCCESSFULLY! Emergency services are being coordinated.');
  };

  return (
    <div className="fireshield-container">
      {/* Background Map - persistent across steps 1 and 2 */}
      {(step === 1 || step === 2) && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <LocationMap interactive={step === 1} onLocationSelect={(loc) => setIncidentData(prev => ({...prev, location: loc}))} />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fireshield-step-container"
            >
              <Step1Map onStartReport={handleStartReport} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fireshield-step-container"
            >
              <Step2Confirm 
                location={incidentData.location}
                onConfirm={handleConfirmLocation} 
                onCancel={() => setStep(1)} 
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="fireshield-step-container"
            >
              <Step3Details 
                onBack={() => setStep(2)} 
                onSubmit={handleFinalSubmit} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FireShield;
