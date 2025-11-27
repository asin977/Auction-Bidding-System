import React from 'react';

import './styles.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...rest
}) => {
  const buttonClass = `button-${variant} common-button ${className}`.trim();

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
