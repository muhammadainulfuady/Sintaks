import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LearningPathsPage } from './pages/learning/LearningPathsPage';
import { LearningPathDetailPage } from './pages/learning/LearningPathDetailPage';
import { ModuleDetailPage } from './pages/learning/ModuleDetailPage';
import { LessonDetailPage } from './pages/learning/LessonDetailPage';
import { QuizPage } from './pages/quiz/QuizPage';
import { NotesPage } from './pages/notes/NotesPage';
import { CommunityPage } from './pages/community/CommunityPage';
import { CommunityDetailPage } from './pages/community/CommunityDetailPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { LeaderboardPage } from './pages/profile/LeaderboardPage';
import { LandingPage } from './pages/landing/LandingPage';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected App Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-paths"
        element={
          <ProtectedRoute>
            <LearningPathsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-paths/:slug"
        element={
          <ProtectedRoute>
            <LearningPathDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modules/:slug"
        element={
          <ProtectedRoute>
            <ModuleDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lessons/:slug"
        element={
          <ProtectedRoute>
            <LessonDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:moduleSlug"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <CommunityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community/:id"
        element={
          <ProtectedRoute>
            <CommunityDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        }
      />

      {/* Default fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
