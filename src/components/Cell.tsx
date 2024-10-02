import { ReactNode, HTMLAttributes } from "react";
import { useSpring, animated, config } from "react-spring";

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
  const commonClasses = `flex items-center justify-center min-w-12 h-12 p-1 rounded-lg shadow-lg ${className}`;

  const greenStyle = useSpring({
    from: { borderColor: "#50c878" },
    to: async (next) => {
      while (true) {
        await next({ borderColor: "#03c03c" });
        await next({ borderColor: "#3cb371" });
      }
    },
    config: config.molasses,
  });

  const redStyle = useSpring({
    from: { transform: "translate(0px, 0px)" },
    to: [
      { transform: "translate(1px, 1px) rotate(1deg)" },
      { transform: "translate(0px, 0px) rotate(0deg)" },
      { transform: "translate(-1px, -1px) rotate(-1deg)" },
      { transform: "translate(0px, 0px) rotate(0deg)" },
    ],
    config: { duration: 100 },
  });

  const renderCell = () => {
    switch (type) {
      case "green":
        return (
          <animated.div
            {...props}
            style={greenStyle}
            className={`${commonClasses} border-2  border-transparent bg-slate-100`}
          >
            {children}
          </animated.div>
        );
      case "red":
        return (
          <animated.div
            {...props}
            style={redStyle}
            className={`${commonClasses} border-2 border-red-500 bg-red-100 cursor-pointer hover:bg-red-50`}
          >
            {children}
          </animated.div>
        );
      case "inherit":
      default:
        return (
          <div {...props} className={`${commonClasses} bg-slate-100`}>
            {children}
          </div>
        );
    }
  };

  return renderCell();
}
