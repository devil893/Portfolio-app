"use client"
import { motion } from "framer-motion"

const About = ({ profilePic, skills, bio, additionalInfo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      id="about"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white relative"
        >
          About Me
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2"></span>
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {profilePic && (
            <motion.div
              variants={itemVariants}
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl ring-4 ring-indigo-600/20 dark:ring-indigo-400/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:ring-indigo-600/40 dark:hover:ring-indigo-400/40 transform group"
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          )}

          <div className="flex-1">
            <motion.p variants={itemVariants} className="text-lg mb-8 text-gray-700 dark:text-gray-200 leading-relaxed">
              {bio} {additionalInfo}
            </motion.p>

            <motion.h3
              variants={itemVariants}
              className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-center"
            >
              <span className="block w-6 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mx-auto mb-2 text center"></span>
              My Skills
            </motion.h3>

            <motion.div variants={containerVariants} className="flex flex-wrap gap-3">
              {skills &&
                skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="bg-indigo-600/10 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-400 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-white hover:translate-y-[-2px] hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </motion.span>
                ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

