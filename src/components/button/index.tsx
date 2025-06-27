import React from 'react';

import './styles.css';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary';

  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  const buttonClass = `${variant}-variant`;

  return <button className={`${buttonClass} common-button`}>{children}</button>;
};

export default Button;
