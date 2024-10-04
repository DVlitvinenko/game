import React, { ReactNode, useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

interface AnimatedModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-500px)",
    config: {
      tension: 200,
      friction: 15,
      duration: 200,
    },
    onRest: () => {
      if (!isVisible) {
        setIsMounted(false);
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    }
  }, [isVisible]);

  return (
    <>
      {isMounted && (
        <animated.div
          onClick={(e) => e.target === e.currentTarget && onClose}
          style={props}
          className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen p-4 "
        >
          <div className="w-full sm:w-[700px] p-4 rounded-lg text-black bg-gray-200 space-y-4">
            {children}
          </div>
        </animated.div>
      )}
    </>
  );
};

export default AnimatedModal;
