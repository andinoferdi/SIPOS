import React, { FC, ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Form;
