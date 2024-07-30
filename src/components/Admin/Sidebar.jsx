import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { HiOutlineLogout } from 'react-icons/hi';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout logic here (e.g., clearing authentication tokens)
        localStorage.removeItem('username');
        navigate('/signup');
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 shadow-lg fixed h-full text-white">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-10 grid gap-1">
        <Link 
          to="/admin-dashboard" 
          className={`flex items-center p-4 transition duration-200 ${
            isActive('/admin-dashboard') ? 'bg-white text-blue-700' : 'text-gray-300 hover:bg-white hover:text-blue-700'
          }`}
        >
          <RiDashboardFill className="mr-4 text-xl" />
          <span className="text-lg">Dashboard</span>
        </Link>
        <Link 
          to="/users" 
          className={`flex items-center p-4 transition duration-200 ${
            isActive('/users') ? 'bg-white text-blue-700' : 'text-gray-300 hover:bg-white hover:text-blue-700'
          }`}
        >
          <FaUser className="mr-4 text-xl" />
          <span className="text-lg">Users</span>
        </Link>
        <Link 
          to="/expenses" 
          className={`flex items-center p-4 transition duration-200 ${
            isActive('/expenses') ? 'bg-white text-blue-700' : 'text-gray-300 hover:bg-white hover:text-blue-700'
          }`}
        >
          <FaMoneyBillWave className="mr-4 text-xl" />
          <span className="text-lg">Expenses</span>
        </Link>
        {/* <Link 
          to="/settings" 
          className={`flex items-center p-4 transition duration-200 ${
            isActive('/settings') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
          }`}
        >
          <FaCog className="mr-4 text-xl" />
          <span className="text-lg">Settings</span>
        </Link> */}
        <button 
          onClick={handleLogout} 
          className="w-full text-left flex items-center p-4 text-gray-300 hover:bg-white hover:text-blue-700 transition duration-200"
        >
          <HiOutlineLogout className="mr-4 text-xl" />
          <span className="text-lg">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
