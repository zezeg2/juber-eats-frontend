import React from 'react';

interface IButtonProps {
  isValid: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  isValid,
  loading,
  actionText,
  //  mt-3 text-lg font-medium text-white py-4 bg-lime-600 hover:bg-lime-700 transition-colors;
}) => (
  <button
    className={`mt-3 py-4 text-lg font-medium text-white  transition-colors ${
      isValid
        ? 'bg-lime-600 hover:bg-lime-700'
        : 'pointer-events-none bg-gray-300 hover:bg-gray-300'
    }`}
    disabled={loading}
  >
    {actionText}
  </button>
);
