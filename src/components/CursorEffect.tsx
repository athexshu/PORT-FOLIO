import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        className="fixed pointer-events-none z-[99] hidden md:block"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <div
          className="w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(187 100% 50%) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Inner Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[99] hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 500,
          mass: 0.1,
        }}
      >
        <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
      </motion.div>
    </>
  );
};

export default CursorEffect;
