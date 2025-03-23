"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const DataEntry = ({ portfolioData, updatePortfolioData }) => {
  const [activeSection, setActiveSection] = useState("personal")
  const [formData, setFormData] = useState(portfolioData)
  const [newSkill, setNewSkill] = useState("")
  const [newProject, setNewProject] = useState({
    id: Date.now(),
    title: "",
    description: "",
    image: "",
    technologies: [],
    githubLink: "",
    demoLink: "",
  })
  const [newTech, setNewTech] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleProjectChange = (e) => {
    const { name, value } = e.target
    setNewProject({
      ...newProject,
      [name]: value,
    })
  }

  const handleAddTech = () => {
    if (newTech.trim() !== "" && !newProject.technologies.includes(newTech.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const handleRemoveTech = (techToRemove) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((tech) => tech !== techToRemove),
    })
  }

  const handleAddProject = () => {
    // Validate project
    const errors = {}
    if (!newProject.title.trim()) errors.title = "Title is required"
    if (!newProject.description.trim()) errors.description = "Description is required"

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setFormData({
      ...formData,
      projects: [...formData.projects, { ...newProject, id: Date.now() }],
    })

    // Reset form
    setNewProject({
      id: Date.now() + 1,
      title: "",
      description: "",
      image: "",
      technologies: [],
      githubLink: "",
      demoLink: "",
    })
    setValidationErrors({})
  }

  const handleRemoveProject = (projectId) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((project) => project.id !== projectId),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updatePortfolioData(formData)
    setSuccessMessage("Portfolio updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="py-10 px-4 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-white"
        >
          Edit Your Portfolio
        </motion.h1>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center shadow-md"
          >
            {successMessage}
          </motion.div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-10">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveSection("personal")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeSection === "personal"
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeSection === "projects"
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Projects
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {activeSection === "personal" && (
              <motion.div
                key="personal"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handlePersonalChange}
                    rows="4"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Picture URL
                  </label>
                  <input
                    type="text"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Social Media Links (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="socialLinks"
                    value={formData.socialLinks || ""}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>
              </motion.div>
            )}

            {activeSection === "projects" && (
              <motion.div
                key="projects"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">Current Projects</h3>

                  {formData.projects.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No projects added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {formData.projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 dark:text-white">{project.title}</h4>
                            <button
                              type="button"
                              onClick={() => handleRemoveProject(project.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Add New Project</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleProjectChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          validationErrors.title ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
                      />
                      {validationErrors.title && <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleProjectChange}
                        rows="3"
                        className={`w-full px-4 py-2 rounded-md border ${
                          validationErrors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
                      ></textarea>
                      {validationErrors.description && (
                        <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={newProject.image}
                        onChange={handleProjectChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub Link
                      </label>
                      <input
                        type="text"
                        name="githubLink"
                        value={newProject.githubLink}
                        onChange={handleProjectChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Demo Link
                      </label>
                      <input
                        type="text"
                        name="demoLink"
                        value={newProject.demoLink}
                        onChange={handleProjectChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Technologies
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newProject.technologies.map((tech, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm flex items-center"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(tech)}
                              className="ml-2 text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          placeholder="Add a technology"
                          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddTech}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DataEntry

