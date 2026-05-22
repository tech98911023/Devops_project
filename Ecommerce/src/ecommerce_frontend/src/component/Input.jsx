import React from 'react';

const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      {/* Label Design */}
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          {label}
        </label>
      )}

      <div className="relative group">
        {/* Optional Leading Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon size={18} />
          </div>
        )}

        {/* Input Field */}
        <input
          id={id}
          className={`
            w-full transition-all duration-200 outline-none
            bg-white border text-sm rounded-xl py-2.5
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
            }
            placeholder:text-gray-400
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs font-medium text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;