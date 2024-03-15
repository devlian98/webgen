import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// Import the LoginPage component you will create
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Templates from "./components/Templates";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Route for the homepage */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Templates />
                <Footer />
              </>
            }
          />
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
