'use client';

import { motion } from 'framer-motion';

export default function Reveal({ children, origin = 'top', className = '' }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: origin === 'bottom' ? 50 : origin === 'top' ? -50 : 0,
      x: origin === 'left' ? -50 : origin === 'right' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}