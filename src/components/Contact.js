"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const Contact = ({ additionalInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
  })

  const [validationErrors, setValidationErrors] = useState({
    name: null,
    email: null,
    message: null,
  })

  const validateForm = () => {
    const errors = {
      name: null,
      email: null,
      message: null,
    }

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    setValidationErrors(errors)
    return !Object.values(errors).some((error) => error !== null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus({ submitted: false, submitting: true, error: null })

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setFormStatus({ submitted: true, submitting: false, error: null })

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" })
      setValidationErrors({ name: null, email: null, message: null })
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      id="contact"
    >
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
        >
          Get In Touch
        </motion.h2>

        {formStatus.submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center shadow-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2"
            >
              Message Sent Successfully!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-green-700 dark:text-green-300"
            >
              Thank you for reaching out. I'll get back to you soon.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all shadow-md"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  validationErrors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
              />
              {validationErrors.name && <p className="mt-1 text-red-500 text-xs">{validationErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  validationErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
              />
              {validationErrors.email && <p className="mt-1 text-red-500 text-xs">{validationErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 rounded-md border ${
                  validationErrors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
              />
              {validationErrors.message && <p className="mt-1 text-red-500 text-xs">{validationErrors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? "Sending..." : "Send Message"}
            </button>

            {additionalInfo && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Or email me directly at:{" "}
                <a href={`mailto:${additionalInfo}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  {additionalInfo}
                </a>
              </p>
            )}
          </motion.form>
        )}
      </div>
    </motion.section>
  )
}

export default Contact

