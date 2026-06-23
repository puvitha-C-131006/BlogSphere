import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    role: 'Writer',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    const success = await register(
      formData.fullName, 
      formData.email, 
      formData.password, 
      formData.username, 
      formData.phone, 
      formData.role
    );
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2 transition-colors">
          Sign up to post stories, interact with comments, and customize your feed.
        </h1>
        <div className="mt-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started</p>
          <p className="text-gray-500 dark:text-gray-400 transition-colors">Create a BlogSphere account today.</p>
        </div>
      </div>

      {(error || validationError) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error || validationError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Full Name" 
          id="fullName" 
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe" 
          required 
        />
        
        <Input 
          label="Username" 
          id="username" 
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe" 
          required 
        />
        
        <Input 
          label="Email" 
          id="email" 
          type="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com" 
          required 
        />
        
        <Input 
          label="Phone Number" 
          id="phone" 
          value={formData.phone}
          onChange={handleChange}
          placeholder="+15555555555" 
          required 
        />

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
            I want to join as a
          </label>
          <select 
            id="role" 
            value={formData.role}
            onChange={handleChange}
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          >
            <option value="Writer">Writer - Draft and publish original blogs</option>
            <option value="Reader">Reader - Read and comment on stories</option>
          </select>
        </div>

        <Input 
          label="Password" 
          id="password" 
          type="password" 
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••" 
          required 
        />
        
        <Input 
          label="Confirm Password" 
          id="confirmPassword" 
          type="password" 
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••" 
          required 
        />

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
