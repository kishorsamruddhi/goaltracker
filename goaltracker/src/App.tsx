import React from 'react';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { ScreenshotButton } from './components/ScreenshotButton';
import CommentSystem from './components/CommentSystem';
import MilestoneMarkers from './components/MilestoneMarkers';
import { useStore } from './store';
import { useTheme } from './context/ThemeContext';
import '@progress/kendo-theme-default/dist/all.css';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TaskMaster AI",
  "applicationCategory": "ProjectManagementApplication",
  "operatingSystem": "Web",
  "description": "AI-powered project management solution for teams",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AI Task Suggestions",
    "Real-time Progress Tracking",
    "Team Collaboration",
    "Project Analytics"
  ]
};

function App() {
  const [expanded, setExpanded] = React.useState(true);
  const { selectedProject } = useStore();
  const { darkMode } = useTheme();
  const [screenshots, setScreenshots] = React.useState<Blob[]>([]);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const handleScreenshotCapture = (blob: Blob) => {
    setScreenshots(prev => [...prev, blob]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskmaster-screenshot-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (selectedProject) {
      case 'projects':
        return <Projects />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        // Dashboard + Comments + Milestones
        return (
          <>
            <Dashboard />
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
           
              <MilestoneMarkers />
              <CommentSystem />
            </div>
          </>
        );
    }
  };

  return (
    <div className={`relative h-screen ${darkMode ? 'dark' : ''}`}>
      <Drawer
        expanded={expanded}
        position="start"
        mode="push"
        mini={false}
        onOverlayClick={() => setExpanded(false)}
        onExpandChange={() => setExpanded(!expanded)}
        style={{ padding: 0, margin: 0 }}
      >
        {/* Sidebar */}
        <Navigation />

        {/* Main Content */}
        <DrawerContent>
          <div id="main-content" role="main" className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Screenshot Button top-right */}
      <div className="absolute top-4 right-6 z-50">
        <ScreenshotButton
          elementId="main-content"
          fileName="taskmaster-screenshot"
          onCapture={handleScreenshotCapture}
        />
      </div>
    </div>
  );
}

export default App;
