import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MapExplorer } from './components/MapExplorer';
import { SegmentDetailDrawer } from './components/SegmentDetailDrawer';
import { ReportModal } from './components/ReportModal';
import { RouteComparison } from './components/RouteComparison';
import { AdminQueue } from './components/AdminQueue';
import { AnalyticsView } from './components/AnalyticsView';
import { LandingSection } from './components/LandingSection';
import { EmergencyDrawer } from './components/EmergencyDrawer';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'map' | 'routes' | 'analytics' | 'admin' | 'overview'>('map');
  const [userRole, setUserRole] = useState<'CITIZEN' | 'MODERATOR' | 'ADMIN'>('CITIZEN');
  const [authToken, setAuthToken] = useState<string>('');

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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
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
          <AdminQueue userRole={userRole} authToken={authToken} />
        )}

        {currentTab === 'overview' && (
          <LandingSection onOpenMap={() => setCurrentTab('map')} />
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
