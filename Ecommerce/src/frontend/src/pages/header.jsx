import React from 'react';
import {Link} from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import Button from '../component/Button';

const Header = ({ userName, onLogout }) => {
 
  return (
    <div className="bg-blue-200 p-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <ShoppingCart size={20} />
        </div>
        <span className="text-xl font-bold text-gray-800">NexusShop</span>
      </div>

      <div className="flex items-center space-x-4">
        {userName ? (
          // Shown when Logged In
          <div className="flex items-center space-x-3 bg-white/50 px-4 py-1.5 rounded-full border border-blue-300">
            <div className="bg-indigo-100 p-1 rounded-full">
              <User size={16} className="text-indigo-600" />
            </div>
            <span className="text-sm font-bold text-gray-800">
              Hi, {userName}
            </span>
            <button 
              onClick={onLogout}
              className="text-gray-500 hover:text-red-500 transition-colors ml-2"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          // Shown when Logged Out
          <div className="flex items-center space-x-2">
            <Button as={Link} to="/login" variant="ghost" size="sm">Login</Button>
            <Button as={Link} to="/signup" variant="primary" size="sm">Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 