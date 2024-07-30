import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie';
import expenseTrackingAnimation from '../assets/Calculator.json'; // Ensure you have this JSON file

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/home');
    } else {
      toast.warn('You need to sign up or log in to get started!');
      navigate('/signup');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: expenseTrackingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Navbar />
      <div className="scroll-smooth">
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-600 opacity-30" aria-hidden="true"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-6xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">Welcome to Kharcha Tracker</h1>
            <p className="text-2xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
              The ultimate solution to track your expenses efficiently and effortlessly.
            </p>
            <button
              onClick={handleGetStartedClick}
              className="bg-white text-purple-500 hover:bg-purple-100 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold mb-4">Why Kharcha Tracker?</h2>
              <p className="text-lg mb-4">
                Kharcha Tracker helps you manage your finances effectively by keeping track of your expenses and providing insightful statistics.
              </p>
              <ul className="list-disc list-inside text-lg space-y-2">
                <li>Simple and intuitive interface</li>
                <li>Real-time expense tracking</li>
                <li>Detailed statistics and insights</li>
                <li>Secure and private</li>
              </ul>
            </div>
            <div className="flex items-center justify-center animate__animated animate__fadeIn">
              <Lottie
                options={defaultOptions}
                height={400}
                width={400}
                className="rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-400 opacity-30" aria-hidden="true"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold mb-4">User-Friendly Interface</h3>
                <p className="text-lg">
                  Easily navigate and track your expenses with our clean and intuitive interface.
                </p>
              </div>
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold mb-4">Detailed Analytics</h3>
                <p className="text-lg">
                  Gain insights into your spending habits with our detailed analytics.
                </p>
              </div>
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold mb-4">Secure and Private</h3>
                <p className="text-lg">
                  Your data is safe with us. We prioritize your privacy and security.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join Us Today!</h2>
            <p className="text-xl mb-6">
              Start tracking your expenses and take control of your finances.
            </p>
            <Link to="/signup">
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                Sign Up Now
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
