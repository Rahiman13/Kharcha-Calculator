import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [user, setUser] = useState(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!username) {
                console.error('Username is not found in localStorage.');
                return;
            }

            try {
                const response = await axios.get(`https://kharcha-calculator-backend.onrender.com/api/auth/user/username/${username}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [username]);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleImageUpload = async (e) => {
        if (!user) {
            console.error('User is invalid.');
            return;
        }

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', user._id);

        try {
            const response = await axios.post('https://kharcha-calculator-backend.onrender.com/api/auth/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadedImage(response.data.image);
            toast.success('Image uploaded successfully.');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image.');
        }
    };

    const handleLogout = async () => {
        if (!user) {
            console.error('User is invalid.');
            toast.warn('User is invalid.');
            return;
        }

        Swal.fire({
            title: 'Confirm Logout',
            text: `Are you sure you want to logout, ${user.username}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post('https://kharcha-calculator-backend.onrender.com/api/auth/logout', {
                        userId: user._id,
                        logoutTime: new Date()
                    });

                    localStorage.removeItem('username');
                    navigate('/signup');
                    toast.success('Logged out successfully.');
                } catch (error) {
                    console.error('Error logging out:', error);
                    toast.error('Error logging out.');
                }
            }
        });
    };

    return (
        <nav className="bg-[#22092C] py-4">
            <div className="container mx-auto flex justify-between">
                <div>
                    <h1 className="text-3xl pl-8 text-white font-cursive">Kharcha Tracker</h1>
                </div>
                <div className="flex items-center justify-center pr-5 space-x-4">
                    <div className="">
                        <Link to="/" className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            Home
                        </Link>
                    </div>
                    <div className="">
                        <Link to="/home" className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            Add Expenses
                        </Link>
                    </div>
                    <div className="">
                        <Link to="/statistics" className="ml-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Statistics
                        </Link>
                    </div>
                    {user ? (
                        <div className="py-2 px-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="py-2 px-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                            <Link to="/signup">Login</Link>
                        </div>
                    )}
                    <div className="">
                        <img
                            src={uploadedImage ? `https://kharcha-calculator-backend.onrender.com/${uploadedImage}` : 'https://avatar.iran.liara.run/public/8'}
                            alt="User Avatar"
                            className="rounded-full object-cover w-10 h-10 mr-8"
                            onClick={handleDropdownToggle}
                        />
                    </div>
                </div>
                
            </div>
        </nav>
    );
};

export default Navbar;
