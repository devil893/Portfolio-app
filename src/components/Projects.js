"use client"
import { motion } from "framer-motion"
import ProjectCard from "./ProjectCard"

const Projects = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white relative"
        >
          My Projects
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2"></span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects &&
            projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  githubLink={project.githubLink}
                  demoLink={project.demoLink}
                />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

