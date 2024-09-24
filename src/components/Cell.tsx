import { ReactNode, HTMLAttributes } from "react";

interface CellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  type: "green" | "red" | "inherit";
}

export default function Cell({
  className,
  children,
  type,
  ...props
}: CellProps) {
  return (
    <div
      {...props}
      className={`flex items-center justify-center min-w-12 h-12 bg-slate-100 p-1 transition-colors rounded-lg 
      ${type === "green" && "border-2 border-green-500"}
      ${
        type === "red" &&
        "border-2 border-red-500 cursor-pointer  bg-red-100 hover:bg-red-50"
      } ${className}`}
    >
      {children}
    </div>
  );
}
