"use client"
import { motion } from "framer-motion"

const Footer = ({ socialLinks }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="py-6 bg-gray-800 text-white text-center"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <div className="flex justify-center mt-6 space-x-6">
          {socialLinks &&
            Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Add platform-specific icons here */}
                </svg>
              </a>
            ))}
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

