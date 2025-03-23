"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const Sidebar = ({ darkMode, setDarkMode }) => {

  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar") && !event.target.closest(".sidebar-toggle")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const navItems = [
    { path: "/portfolio", label: "Home", icon: "home" },
    { path: "/about", label: "About", icon: "user" },
    { path: "/projects", label: "Projects", icon: "code" },
    { path: "/contact", label: "Contact", icon: "mail" },
    { path: "/edit", label: "Edit Portfolio", icon: "edit" },
  ]

  const isActive = (path) => {
    if (path === "/portfolio" && location.pathname === "/portfolio") return true
    if (path !== "/portfolio" && location.pathname.includes(path)) return true
    return false
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setDarkMode(!darkMode);
        }}
        aria-label="Toggle sidebar"

      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-xl z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0 md:w-20"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
            <span
              className={`text-xl font-bold text-primary transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"}`}
            >
              Portfolio
            </span>
            <span
              className={`text-xl font-bold text-primary absolute md:static transition-opacity duration-300 ${isOpen ? "opacity-0 md:opacity-100" : "opacity-0 md:opacity-100"}`}
            >
              P
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="inline-block">
                      {item.icon === "home" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      )}
                      {item.icon === "user" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                      {item.icon === "code" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      )}
                      {item.icon === "mail" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {item.icon === "edit" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden md:inline-block md:opacity-0"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div
              className={`text-xs text-gray-500 dark:text-gray-400 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 md:opacity-0"}`}
            >
              &copy; {new Date().getFullYear()} Portfolio
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
