import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
      email: 'john@example.com'
    });
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-secondary dark:text-white mb-2 transition-colors">Welcome back</h2>
        <p className="text-gray-500 dark:text-gray-400 transition-colors">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Email" 
          id="email" 
          type="email" 
          placeholder="Enter your email" 
          required 
        />
        
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary dark:bg-gray-800"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-semibold text-primary hover:text-blue-700 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          Sign up for free
        </Link>
      </p>
    </div>
  );
};

export default Login;
