import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Navbar from './components/Navbar';
import ProductList from './components/Products/ProductList';
import CartPage from './components/Cart/CartPage';
import OrderList from './components/Orders/OrderList';
import ProductManagement from './components/Admin/ProductManagement';
import OrderManagement from './components/Admin/OrderManagement';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [activeView, setActiveView] = useState('products');

  if (!isAuthenticated) {
    return isLogin ? 
      <LoginForm onToggleForm={() => setIsLogin(false)} /> :
      <RegisterForm onToggleForm={() => setIsLogin(true)} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <CartPage />;
      case 'orders':
        return <OrderList />;
      case 'admin-products':
        return <ProductManagement />;
      case 'admin-orders':
        return <OrderManagement />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      {renderContent()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;