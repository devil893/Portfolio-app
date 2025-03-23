"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import DataEntry from "./components/DataEntry"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorBoundary from "./components/ErrorBoundary"
import "./App.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState(() => {
    const savedData = localStorage.getItem("portfolioData")
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "John Doe",
          title: "Frontend Developer",
          bio: "Passionate web developer with expertise in React, JavaScript, and modern web technologies.",
          profilePic: "/placeholder.svg?height=400&width=400",
          skills: ["React", "JavaScript", "CSS", "HTML", "Node.js"],
          projects: [
            {
              id: 1,
              title: "Portfolio Website",
              description: "A personal portfolio website built with React and Framer Motion.",
              image: "/placeholder.svg?height=300&width=500",
              technologies: ["React", "Framer Motion", "CSS"],
              githubLink: "https://github.com",
              demoLink: "https://example.com",
            },
            {
              id: 2,
              title: "E-commerce App",
              description: "A full-featured e-commerce application with shopping cart and payment integration.",
              image: "/placeholder.svg?height=300&width=500",
              technologies: ["React", "Node.js", "MongoDB"],
              githubLink: "https://github.com",
              demoLink: "https://example.com",
            },
          ],
          contactEmail: "john.doe@example.com",
          socialLinks: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
          },
          backgroundImage: "/placeholder.svg?height=1080&width=1920",
        }
  })

  const location = useLocation()

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(portfolioData))
  }, [portfolioData])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle("dark")
  }

  // Update portfolio data
  const updatePortfolioData = (newData) => {
    setPortfolioData((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="content-wrapper">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <>
                    <Hero
                      name={portfolioData.name}
                      bio={portfolioData.title}
                      backgroundImage={portfolioData.backgroundImage}
                    />
                    <About
                      profilePic={portfolioData.profilePic}
                      bio={portfolioData.bio}
                      skills={portfolioData.skills}
                    />
                    <Projects projects={portfolioData.projects} />
                    <Contact additionalInfo={portfolioData.contactEmail} />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <About profilePic={portfolioData.profilePic} bio={portfolioData.bio} skills={portfolioData.skills} />
                }
              />
              <Route path="/projects" element={<Projects projects={portfolioData.projects} />} />
              <Route path="/contact" element={<Contact additionalInfo={portfolioData.contactEmail} />} />
              <Route
                path="/edit"
                element={<DataEntry portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} />}
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer socialLinks={portfolioData.socialLinks} />
      </div>
    </ErrorBoundary>
  )
}

export default App

