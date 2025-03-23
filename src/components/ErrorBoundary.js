"use client"

import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fall-back UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-900">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're sorry, but there was an error loading this page. Please try refreshing or come back later.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Go Back
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left overflow-auto max-h-64">
                <p className="text-red-800 dark:text-red-200 font-medium mb-2">Error details:</p>
                <pre className="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Return children if there's no error
    return this.props.children
  }
}

export default ErrorBoundary

