import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="text-gray-200 transition-colors bg-blue-700 rounded-lg hover:bg-blue-600"
    >
      {children}
    </button>
  );
}
