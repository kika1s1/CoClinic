import React from 'react';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FeatureCard: React.FC<{ children: React.ReactNode, comingSoon?: boolean }> = ({ children, comingSoon = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="relative p-4 bg-white rounded shadow flex items-start"
      style={{ cursor: 'pointer', minHeight: '200px' }}
      role="button"
    >
      <Box ml={comingSoon ? 1 : 0} width="100%">
        {children}
      </Box>
    </motion.div>
  );
};

export default FeatureCard;
