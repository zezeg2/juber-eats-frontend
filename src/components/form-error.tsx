import React from 'react';

interface IFormError {
  errorMessage: string | undefined | null;
}
export const FormError: React.FC<IFormError> = ({ errorMessage }) => {
  return errorMessage ? (
    <span className="text-sm text-red-600">{errorMessage}</span>
  ) : null;
};
