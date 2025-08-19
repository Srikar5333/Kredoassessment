import React from 'react';
import { ShoppingCart, User, LogOut, Package, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">KredoShop</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('products')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'products'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            
            {user && !isAdmin && (
              <button
                onClick={() => onViewChange('orders')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'orders'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Orders
              </button>
            )}

            {isAdmin && (
              <>
                <button
                  onClick={() => onViewChange('admin-products')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'admin-products'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Manage Products
                </button>
                <button
                  onClick={() => onViewChange('admin-orders')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'admin-orders'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Orders
                </button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user && !isAdmin && (
              <button
                onClick={() => onViewChange('cart')}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}

            <div className="flex items-center space-x-2 text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>

            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => onViewChange('products')}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              activeView === 'products'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products
          </button>
          
          {user && !isAdmin && (
            <>
              <button
                onClick={() => onViewChange('cart')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeView === 'cart'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cart ({getTotalItems()})
              </button>
              <button
                onClick={() => onViewChange('orders')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeView === 'orders'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Orders
              </button>
            </>
          )}

          {isAdmin && (
            <>
              <button
                onClick={() => onViewChange('admin-products')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeView === 'admin-products'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Manage Products
              </button>
              <button
                onClick={() => onViewChange('admin-orders')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeView === 'admin-orders'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Orders
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;