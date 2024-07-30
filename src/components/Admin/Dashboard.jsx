import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <FaChartBar className="text-4xl text-gray-600" />
          <h3 className="mt-2 text-xl font-semibold text-gray-800">Analytics</h3>
          <p className="mt-2 text-gray-600">Track your expenses and more</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
