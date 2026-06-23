import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0";
  
  const variants = {
    primary: "bg-primary text-white shadow-md hover:bg-blue-700 hover:shadow-blue-500/30",
    secondary: "bg-secondary text-white shadow-md hover:bg-slate-700 hover:shadow-slate-500/30",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    accent: "bg-accent text-white shadow-md hover:bg-amber-600 hover:shadow-amber-500/30",
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
