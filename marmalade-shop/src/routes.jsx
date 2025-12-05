import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner'; // Используем существующий спиннер

// Public pages - используем React.lazy для большинства страниц для code-splitting
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const CatalogPage = React.lazy(() => import('./pages/public/CatalogPage'));
const ProductPage = React.lazy(() => import('./pages/public/ProductPage'));
const CartPage = React.lazy(() => import('./pages/public/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/public/CheckoutPage'));
const OrderSuccessPage = React.lazy(() => import('./pages/public/OrderSuccessPage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/public/RegisterPage'));
const ProfilePage = React.lazy(() => import('./pages/public/ProfilePage'));

// Admin pages - также используем React.lazy
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = React.lazy(() => import('./pages/admin/AdminProducts'));
const AdminProductsEdit = React.lazy(() => import('./pages/admin/AdminProductsEdit'));
const AdminOrders = React.lazy(() => import('./pages/admin/AdminOrders'));
const AdminReports = React.lazy(() => import('./pages/admin/AdminReports'));
const AdminChat = React.lazy(() => import('./pages/admin/AdminChat'));

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Wrap route elements in Suspense to handle lazy loading */}
        <Route index element={<Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>} />
        <Route path="catalog" element={<Suspense fallback={<LoadingSpinner />}><CatalogPage /></Suspense>} />
        <Route path="product/:id" element={<Suspense fallback={<LoadingSpinner />}><ProductPage /></Suspense>} />
        <Route path="cart" element={<Suspense fallback={<LoadingSpinner />}><CartPage /></Suspense>} />
        <Route path="checkout" element={<Suspense fallback={<LoadingSpinner />}><CheckoutPage /></Suspense>} />
        <Route path="order-success" element={<Suspense fallback={<LoadingSpinner />}><OrderSuccessPage /></Suspense>} />
        <Route path="login" element={<Suspense fallback={<LoadingSpinner />}><LoginPage /></Suspense>} />
        <Route path="register" element={<Suspense fallback={<LoadingSpinner />}><RegisterPage /></Suspense>} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <ProfilePage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminProducts />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/products/:id"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminProductsEdit />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminOrders />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/reports"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminReports />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/chat"
          element={
            <ProtectedRoute requireAdmin>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminChat />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
