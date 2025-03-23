import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import DarkModeToggle from "./DarkModeToggle"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Menu animations
  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transition-colors duration-200"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["About", "Projects", "Contact", "Edit"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className={`text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  location.pathname === `/${link.toLowerCase()}` ? "text-indigo-600 dark:text-indigo-400 font-semibold" : ""
                }`}
              >
                {link}
              </Link>
            ))}
            <DarkModeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="outline-none p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden flex flex-col items-center bg-white dark:bg-gray-900 shadow-lg absolute top-16 left-0 right-0 p-4 space-y-4"
            >
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/projects"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/edit"
                className="px-4 py-2 bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-400 rounded-lg hover:bg-indigo-600/20 dark:hover:bg-indigo-400/30 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Edit
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar

