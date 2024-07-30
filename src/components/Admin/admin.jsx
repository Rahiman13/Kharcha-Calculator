// src/components/AdminDashboard.jsx

import React from 'react';
import { FaChartBar, FaUser, FaMoneyBillWave, FaCog, FaChartPie, FaClipboardList, FaLifeRing } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './admin.css'

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-[100vh]">
      <Sidebar />
      <main className="flex-1 p-10 ml-64">
        <div id="dashboard">
          <h2 className="text-3xl font-semibold text-blue-800 mb-8">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <Link to="/expenses" className="card">
              <div className="flex items-center space-x-4">
                <FaChartBar className="card-icon" aria-label="Analytics" />
                <div>
                  <h3 className="card-title">Analytics</h3>
                  <p className="card-text">Track your expenses and more</p>
                </div>
              </div>
            </Link>
            <Link to="/users" className="card">
              <div className="flex items-center space-x-4">
                <FaUser className="card-icon" aria-label="User Management" />
                <div>
                  <h3 className="card-title">User Management</h3>
                  <p className="card-text">Manage your users</p>
                </div>
              </div>
            </Link>
            <Link to="/expenses" className="card">
              <div className="flex items-center space-x-4">
                <FaMoneyBillWave className="card-icon" aria-label="Expense Reports" />
                <div>
                  <h3 className="card-title">Expense Reports</h3>
                  <p className="card-text">View and generate reports</p>
                </div>
              </div>
            </Link>
            <Link to="/settings" className="card">
              <div className="flex items-center space-x-4">
                <FaCog className="card-icon" aria-label="Settings" />
                <div>
                  <h3 className="card-title">Settings</h3>
                  <p className="card-text">Configure your app</p>
                </div>
              </div>
            </Link>
            <Link to="/statistics" className="card">
              <div className="flex items-center space-x-4">
                <FaChartPie className="card-icon" aria-label="Financial Overview" />
                <div>
                  <h3 className="card-title">Financial Overview</h3>
                  <p className="card-text">Overview of financial status</p>
                </div>
              </div>
            </Link>
            <Link to="/home" className="card">
              <div className="flex items-center space-x-4">
                <FaClipboardList className="card-icon" aria-label="Task Management" />
                <div>
                  <h3 className="card-title">Task Management</h3>
                  <p className="card-text">Manage your tasks</p>
                </div>
              </div>
            </Link>
            {/* <Link to="/support" className="card">
              <div className="flex items-center space-x-4">
                <FaLifeRing className="card-icon" aria-label="Support" />
                <div>
                  <h3 className="card-title">Support</h3>
                  <p className="card-text">Get help and support</p>
                </div>
              </div>
            </Link> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
