import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {  
    LayoutGrid, 
    ShoppingCart, 
    Package, 
    Users, 
    BarChart3, 
    CreditCard, 
    Truck, 
    HelpCircle, 
    Settings, 
    LogOut,
    TrendingUp,
  } from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('overview');
  
    const menuItems = [
      { id: 'overview', icon: LayoutGrid, label: 'Overview', badge: null, path: '/dashboard' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders', badge: '3', path: '/dashboard/orders'},
      { id: 'products', icon: Package, label: 'Products', badge: null, path: '/dashboard/products'},
      { id: 'customers', icon: Users, label: 'Customers', badge: null, path: '/dashboard/customers' },
      { id: 'transactions', icon: CreditCard, label: 'Transactions', badge: null, path: '/dashboard/transactions' },
      { id: 'shipment', icon: Truck, label: 'Shipment', badge: null, path: '/dashboard/shipment'},
    ];
  
    const bottomItems = [
      { id: 'settings', icon: Settings, label: 'Settings', badge: null, path: '/dashboard/settings' },
      { id: 'logout', icon: LogOut, label: 'Logout', badge: null, path: null }, // Special handling for logout
    ];

    // Handle menu item click
    const handleMenuClick = (item) => {
      if (item.id === 'logout') {
        // Handle logout logic here
        handleLogout();
      } else {
        setActiveItem(item.id);
        navigate(item.path);
      }
    };

    // Handle logout
    const handleLogout = () => {
      // Add your logout logic here
      // For example: clear tokens, redirect to login, etc.
      localStorage.removeItem('authToken'); // Example
      navigate('/login');
    };

    // Determine active item based on current path
    React.useEffect(() => {
      const currentPath = location.pathname;
      const activeMenuItem = menuItems.find(item => item.path === currentPath);
      if (activeMenuItem) {
        setActiveItem(activeMenuItem.id);
      }
    }, [location.pathname]);
  
    return (
      <div className={`bg-white shadow-sm transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        {/* Logo and Brand */}
        <div className="flex items-center p-4 border-b">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          {!collapsed && <span className="ml-3 text-xl font-semibold text-gray-800">SNSES</span>}
        </div>
  
        {/* Menu Items */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    activeItem === item.id
                      ? 'bg-amber-50 text-amber-600 border-r-2 border-amber-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
  
        {/* Shopr Pro Card */}
        {!collapsed && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-4 text-white">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-semibold mb-1">SNSES info</h3>
              <p className="text-sm opacity-90 mb-3">Easily reach your customers – click below to send a newsletter to all.</p>
              <button className="w-full bg-white text-amber-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
                Get started
              </button>
            </div>
          </div>
        )}
  
        {/* Bottom Menu */}
        <div className="border-t p-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                  item.id === 'logout' ? 'hover:bg-red-50 hover:text-red-600' : ''
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
export default Sidebar;