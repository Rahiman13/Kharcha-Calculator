import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Define a color palette
  const colorPalette = [
    'rgba(56, 189, 248, 0.6)',
    'rgba(99, 102, 241, 0.6)',
    'rgba(234, 88, 12, 0.6)',
    'rgba(16, 185, 129, 0.6)',
    'rgba(239, 68, 68, 0.6)',
    'rgba(96, 165, 250, 0.6)',
    'rgba(245, 158, 11, 0.6)',
    'rgba(5, 150, 105, 0.6)',
    'rgba(220, 38, 38, 0.6)',
    'rgba(37, 99, 235, 0.6)',
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://kharcha-calculator-backend.onrender.com/api/auth/users');
        const filteredUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(filteredUsers);

        // Prepare combined chart data
        const months = Array.from(new Set(filteredUsers.flatMap(user => user.monthlyData.map(month => month.month))));
        const datasets = filteredUsers.map((user, index) => ({
          label: user.username,
          data: months.map(month => {
            const monthData = user.monthlyData.find(m => m.month === month);
            return monthData ? monthData.totalBalance : 0;
          }),
          backgroundColor: colorPalette[index % colorPalette.length],
        }));

        setChartData({
          labels: months,
          datasets,
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-10 min-h-screen overflow-y-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-10">Users Profile</h2>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h4 className="text-2xl font-semibold text-blue-800 mb-6">Combined User Charts</h4>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h4 className="text-2xl font-semibold text-blue-800 mb-6">Users Details</h4>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                {['Username', 'First Name', 'Last Name', 'Email', 'Role', 'Total Balance ($)'].map((header, index) => (
                  <th key={index} className="py-3 px-5 border-b text-center font-medium">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-5 text-center flex items-center justify-center space-x-2">
                    <FaUserCircle className="text-blue-500" size={20} />
                    <span>{user.username}</span>
                  </td>
                  <td className="py-3 px-5 text-center">{user.firstName}</td>
                  <td className="py-3 px-5 text-center">{user.lastName}</td>
                  <td className="py-3 px-5 text-center flex items-center justify-center space-x-2">
                    <MdOutlineEmail className="text-red-500" size={20} />
                    <span>{user.email}</span>
                  </td>
                  <td className="py-3 px-5 text-center">{user.role}</td>
                  <td className="py-3 px-5 text-center">${user.totalBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h4 className="text-2xl font-semibold text-blue-800 mb-6">Session Details</h4>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                {['Username', 'Login Time', 'Logout Time', 'Session Duration (hours)'].map((header, index) => (
                  <th key={index} className="py-3 px-5 border-b text-center font-medium">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, userIndex) => (
                user.loginTimes.map((session, sessionIndex) => {
                  const sessionDuration = ((new Date(session.logoutTime) - new Date(session.loginTime)) / 3600000).toFixed(2);
                  return (
                    <tr key={`${userIndex}-${sessionIndex}`} className="border-b hover:bg-gray-100 transition duration-300">
                      <td className="py-3 px-5 text-center">{user.username}</td>
                      <td className="py-3 px-5 text-center">{new Date(session.loginTime).toLocaleString()}</td>
                      <td className="py-3 px-5 text-center">{new Date(session.logoutTime).toLocaleString()}</td>
                      <td className="py-3 px-5 text-center">{sessionDuration}</td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
