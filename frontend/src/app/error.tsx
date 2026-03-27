'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Frontend Error Caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 max-w-md"
      >
        <h2 className="text-3xl font-serif text-white mb-4">Something went wrong</h2>
        <p className="text-gray-400 text-sm mb-8">
          We apologize for the inconvenience. Our engineering team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary w-full"
        >
          Try again
        </button>
      </motion.div>
    </div>
  );
}
