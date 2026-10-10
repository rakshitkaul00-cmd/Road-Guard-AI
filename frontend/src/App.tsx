import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MapExplorer } from './components/MapExplorer';
import { SegmentDetailDrawer } from './components/SegmentDetailDrawer';
import { ReportModal } from './components/ReportModal';
import { RouteComparison } from './components/RouteComparison';
import { AdminQueue } from './components/AdminQueue';
import { AnalyticsView } from './components/AnalyticsView';
import { LandingSection } from './components/LandingSection';
import { EmergencyDrawer } from './components/EmergencyDrawer';
import { LoginPage } from './components/LoginPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'map' | 'routes' | 'analytics' | 'admin' | 'overview' | 'login'>('map');
  const [userRole, setUserRole] = useState<'CITIZEN' | 'MODERATOR' | 'ADMIN'>('CITIZEN');
  const [authToken, setAuthToken] = useState<string>('');

  // Hydrate session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('rg_auth_token');
    const savedRole = localStorage.getItem('rg_user_role') as 'CITIZEN' | 'MODERATOR' | 'ADMIN' | null;
    if (savedToken && savedRole) {
      setAuthToken(savedToken);
      setUserRole(savedRole);
    }
  }, []);

  // Drawers & Modals
  const [selectedSegmentId, setSelectedSegmentId] = useState<number | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [reportCoords, setReportCoords] = useState<{ lat: number; lon: number } | null>(null);

  const handleOpenReportAtCoord = (lat: number, lon: number) => {
    setReportCoords({ lat, lon });
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openReportModal={() => setIsReportModalOpen(true)}
        openEmergencyDrawer={() => setIsEmergencyOpen(true)}
        userRole={userRole}
        setUserRole={setUserRole}
        authToken={authToken}
        setAuthToken={setAuthToken}
      />

      {/* Main Tab Content */}
      <main className="flex-1 relative">
        {currentTab === 'map' && (
          <MapExplorer
            onSelectSegment={(id) => setSelectedSegmentId(id)}
            onOpenReportAtCoord={handleOpenReportAtCoord}
          />
        )}

        {currentTab === 'routes' && <RouteComparison />}

        {currentTab === 'analytics' && <AnalyticsView />}

        {currentTab === 'admin' && (
          <AdminQueue 
            userRole={userRole} 
            authToken={authToken} 
            onOpenLogin={() => setCurrentTab('login')}
          />
        )}

        {currentTab === 'overview' && (
          <LandingSection onOpenMap={() => setCurrentTab('map')} />
        )}

        {currentTab === 'login' && (
          <LoginPage
            userRole={userRole}
            setUserRole={setUserRole}
            authToken={authToken}
            setAuthToken={setAuthToken}
            onLoginSuccess={(target) => setCurrentTab(target)}
          />
        )}
      </main>

      {/* Segment Risk Assessment Card Drawer */}
      <SegmentDetailDrawer
        segmentId={selectedSegmentId}
        onClose={() => setSelectedSegmentId(null)}
      />

      {/* Citizen Hazard Reporting Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setReportCoords(null);
        }}
        initialLat={reportCoords?.lat}
        initialLon={reportCoords?.lon}
        onReportSubmitted={() => {
          // Triggers map refresh if needed
        }}
      />

      {/* Emergency Guidance Drawer */}
      <EmergencyDrawer
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
};

export default App;
