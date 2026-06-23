import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../store/useAuthStore';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address first to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert("Error sending reset email: " + error.message);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-secondary dark:text-white mb-2 transition-colors">Welcome back</h2>
        <p className="text-gray-500 dark:text-gray-400 transition-colors">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {authError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{authError}</div>}
        <Input 
          label="Email" 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          required 
        />
        
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            <button type="button" onClick={handleForgotPassword} className="font-semibold text-primary hover:text-blue-700 transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
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
