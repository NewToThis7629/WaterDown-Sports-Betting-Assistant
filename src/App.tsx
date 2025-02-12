import { Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useOutlet,
  useRoutes,
} from "react-router-dom";
import Home from "./components/home";
import WaterDownPage from "./components/water-down/WaterDownPage";
import IncreaseRiskPage from "./pages/increase-risk/IncreaseRiskPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { Layout } from "./components/layout/Layout";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import FAQsPage from "./pages/help/FAQsPage";
import TutorialsPage from "./pages/help/TutorialsPage";
import ContactPage from "./pages/help/ContactPage";
import routes from "tempo-routes";

// Import all page components
import ScoresPage from "./pages/scores/ScoresPage";
import ForumPage from "./pages/social/ForumPage";
import LeaderboardsPage from "./pages/social/LeaderboardsPage";
import ParlaysPage from "./pages/analytics/ParlaysPage";
import StraightBetsPage from "./pages/analytics/StraightBetsPage";
import StatsPage from "./pages/analytics/StatsPage";
import HistoryPage from "./pages/account/HistoryPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import CommunicationsPage from "./pages/account/settings/CommunicationsPage";
import EditProfilePage from "./pages/account/profile/EditProfilePage";
import SecurityPage from "./pages/account/settings/SecurityPage";
import SubscriptionPage from "./pages/account/settings/SubscriptionPage";
import DeleteAccountPage from "./pages/account/settings/DeleteAccountPage";
import AppearanceSettings from "./pages/account/settings/AppearanceSettings";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              {/* Main routes */}
              <Route path="/" element={<Home />} />
              <Route path="/water-down" element={<WaterDownPage />} />
              <Route path="/increase-risk" element={<IncreaseRiskPage />} />
              <Route path="/scores" element={<ScoresPage />} />

              {/* Social routes */}
              <Route path="/social/forum" element={<ForumPage />} />
              <Route
                path="/social/leaderboards"
                element={<LeaderboardsPage />}
              />

              {/* Analytics routes */}
              <Route path="/analytics/parlays" element={<ParlaysPage />} />
              <Route
                path="/analytics/straight-bets"
                element={<StraightBetsPage />}
              />
              <Route path="/analytics/stats" element={<StatsPage />} />

              {/* Account routes */}
              <Route path="/account/history" element={<HistoryPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route
                path="/account/notifications"
                element={<NotificationsPage />}
              />
              <Route
                path="/account/notifications/updates"
                element={<NotificationsPage />}
              />
              <Route
                path="/account/notifications/alerts"
                element={<NotificationsPage />}
              />
              <Route
                path="/account/notifications/promos"
                element={<NotificationsPage />}
              />
              <Route
                path="/account/communications"
                element={<CommunicationsPage />}
              />
              <Route path="/account/delete" element={<DeleteAccountPage />} />
              <Route
                path="/account/subscription"
                element={<SubscriptionPage />}
              />
              <Route
                path="/account/subscription/manage"
                element={<SubscriptionPage />}
              />
              <Route
                path="/account/profile/edit"
                element={<EditProfilePage />}
              />
              <Route
                path="/account/profile/privacy"
                element={<SecurityPage />}
              />

              {/* Settings routes */}
              <Route
                path="/appearance/theme"
                element={<AppearanceSettings />}
              />
              <Route
                path="/appearance/language"
                element={<AppearanceSettings />}
              />

              {/* Help routes */}
              <Route path="/help/faqs" element={<FAQsPage />} />
              <Route path="/help/tutorials" element={<TutorialsPage />} />
              <Route path="/help/contact" element={<ContactPage />} />

              {/* Add this before the catchall route */}
              {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

// Auth guard component
function RequireAuth() {
  const { user, loading } = useAuth();
  const outlet = useOutlet();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return outlet;
}

export default App;
