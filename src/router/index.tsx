import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Projects from '../pages/Projects';
import Members from '../pages/Members';
import Donate from '../pages/Donate';
import About from '../pages/About';
import JoinNGO from '../pages/JoinNGO';
import News from '../pages/News';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminUploadProject from '../pages/Admin/UploadProject';
import AdminMembers from '../pages/Admin/Members';
import AdminApplications from '../pages/Admin/Applications';
import AdminNews from '../pages/Admin/News';
import AdminGallery from '../pages/Admin/Gallery';
import AdminManagement from '../pages/Admin/AdminManagement';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/members',
    element: <Members />,
  },
  {
    path: '/donate',
    element: <Donate />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/join',
    element: <JoinNGO />,
  },
  {
    path: '/news',
    element: <News />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfService />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/upload-project',
    element: (
      <ProtectedRoute>
        <AdminUploadProject />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/members',
    element: (
      <ProtectedRoute>
        <AdminMembers />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/applications',
    element: (
      <ProtectedRoute>
        <AdminApplications />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/news',
    element: (
      <ProtectedRoute>
        <AdminNews />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/gallery',
    element: (
      <ProtectedRoute>
        <AdminGallery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/admins',
    element: (
      <ProtectedRoute>
        <AdminManagement />
      </ProtectedRoute>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
