import React from 'react';

import { ButtonProps } from '../../types/types';
import './styles.css';

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  const buttonClass = `button:${variant}`;

  return <button className={`${buttonClass} common-button`}>{children}</button>;
};

export default Button;
