import { Bell, Search } from 'lucide-react';
import React from 'react'

const Header = () => {
    return (
      <header className="bg-white shadow-sm border-b px-6 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm">Detailed information about your store</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            
            {/* Notifications */}
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <Bell size={20} className="text-gray-600" />
            </button>
            
            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Manael E</p>
                <p className="text-gray-500 text-xs">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
  

export default Header