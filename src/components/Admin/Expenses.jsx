import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from './Sidebar';
import './Expenses.css';

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchExpenses = async () => {
      const cachedData = localStorage.getItem('all-expenses');
      if (cachedData) {
        setExpenses(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get('https://kharcha-calculator-backend.onrender.com/api/expense/all-expenses');
          localStorage.setItem('all-expenses', JSON.stringify(response.data));
          setExpenses(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen animate-pulse"><div>Loading...</div></div>;
  if (error) return <div className="flex items-center justify-center h-screen"><div>Error: {error}</div></div>;

  // Extract unique years from the data
  const uniqueYears = [...new Set(expenses.flatMap(user => user.expenses.map(expense => new Date(expense.date).getFullYear())))];

  // Filter expenses by the selected year
  const filterExpensesByYear = (expenses, year) => {
    return expenses.map(user => ({
      ...user,
      expenses: user.expenses.filter(expense => new Date(expense.date).getFullYear() === year)
    })).filter(user => user.expenses.length > 0);
  };

  const filteredExpenses = filterExpensesByYear(expenses, selectedYear);

  // Aggregate expenses and salaries by month
  const aggregateByMonth = (expenses) => {
    const monthlyData = {};

    expenses.forEach(user => {
      user.expenses.forEach(expense => {
        const date = new Date(expense.date);
        const month = `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        const label = `${user.username} ${month}`;

        if (!monthlyData[label]) {
          monthlyData[label] = { expense: 0, salary: 0 };
        }

        monthlyData[label].expense += expense.expense;
        monthlyData[label].salary += expense.salary;
      });
    });

    return monthlyData;
  };

  const monthlyData = aggregateByMonth(filteredExpenses);
  const labels = Object.keys(monthlyData);
  const expenseData = labels.map(label => monthlyData[label].expense);
  const salaryData = labels.map(label => monthlyData[label].salary);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expense Amount',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Salary Amount',
        data: salaryData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-64"/>
      <div className="flex-1 p-6 ml-64 overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in-up max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Monthly Expenses and Salary Comparison</h3>
          <div className="mb-4 flex items-center justify-end">
            <label htmlFor="year-select" className="mr-2 text-gray-800">Select Year:</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <Bar data={chartData} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">All Users' Expenses</h2>
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className='bg-blue-500 text-white'>
              <tr>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Reason</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Salary</th>
                <th className="py-2 px-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((user, index) => (
                <React.Fragment key={index}>
                  {user.expenses.map((expense, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                      <td className="py-2 px-4">{user.username}</td>
                      <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{expense.reason}</td>
                      <td className="py-2 px-4">{expense.expense}</td>
                      <td className="py-2 px-4">{expense.description}</td>
                      <td className="py-2 px-4">{expense.salary}</td>
                      <td className="py-2 px-4">{expense.balance}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
