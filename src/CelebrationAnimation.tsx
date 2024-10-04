import React from "react";
import { useSpring, animated } from "react-spring";

interface CelebrationAnimationProps {
  isVisible: boolean;
}

const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  isVisible,
}) => {
  const { opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { tension: 200, friction: 40 },
  });

  const generateFireworks = (count: number) => {
    const fireworksArray = [];
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 2 + 1;
      const size = Math.random() * 10 + 5;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

      fireworksArray.push(
        <div
          key={i}
          className="firework"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDuration: `${animationDuration}s`,
          }}
        />
      );
    }
    return fireworksArray;
  };

  return (
    <animated.div
      style={{
        opacity,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: isVisible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: "-1",
      }}
    >
      <div className="celebration-effect">{generateFireworks(20)}</div>
    </animated.div>
  );
};

export default CelebrationAnimation;
