"use client"

import { motion } from "framer-motion"

const LoadingSpinner = () => {
  // Animation variants for the spinner
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const circleVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <motion.div className="flex space-x-3" variants={containerVariants} initial="initial" animate="animate">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            variants={circleVariants}
            style={{
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default LoadingSpinner

