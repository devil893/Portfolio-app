"use client"
import { motion } from "framer-motion"

const Hero = ({ name, bio, backgroundImage }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage || "/placeholder.svg?height=1080&width=1920"}
            alt=""
            className="w-full h-full object-cover transform scale-[1.02] transition-transform duration-10000 hover:scale-[1.05]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
        >
          {name || "Welcome"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto px-4 leading-relaxed"
        >
          {bio || "A passionate developer creating amazing web experiences"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:translate-y-[-3px] hover:shadow-xl"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="inline-block ml-4 px-8 py-3 bg-white/10 text-white font-medium rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:translate-y-[-3px]"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center"
      >
        <a
          href="#about"
          className="animate-bounce mb-8 p-3 bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-white/30"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}

export default Hero

