import React from 'react'

const About = () => {
  return (
    <div className="About">
      <div className="about-container">

        <h1>About RENTWHEELS 🚗</h1>

        <p>
          RENTWHEELS is a modern car rental platform designed to provide
          seamless and affordable transportation solutions. Our goal is to
          make car rentals simple, fast, and accessible for everyone.
        </p>

        <div className="about-section luxury">
          <h2>💎 Luxury Experience</h2>
          <img
            src="https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/954/2025-rolls-royce-phantom-dragon--china_100954503.jpg"
            alt="Rolls Royce"
            className="luxury-img"
          />
          <p>
            Experience the elegance of premium cars like Rolls-Royce,
            designed for comfort, style, and unforgettable journeys.
            At RENTWHEELS, we bring luxury closer to you.
          </p>
        </div>

        <div className="about-section">
          <h2>🌟 Our Mission</h2>
          <p>
            To deliver a reliable and user-friendly car rental experience
            with a wide range of vehicles, transparent pricing, and
            hassle-free booking.
          </p>
        </div>

        <div className="about-section">
          <h2>🚘 What We Offer</h2>
          <ul>
            <li>Wide range of cars (Economy to Luxury)</li>
            <li>Easy online booking system</li>
            <li>Secure login for users and admin</li>
            <li>Real-time availability of vehicles</li>
            <li>Affordable and transparent pricing</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>⚙️ Technologies Used</h2>
          <ul>
            <li>Frontend: React.js</li>
            <li>Backend: Spring Boot</li>
            <li>Database: MySQL</li>
            <li>API Integration for seamless communication</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>👨‍💻 Developed By</h2>
          <p>
            This project is developed as a full-stack application to demonstrate
            modern web development skills including frontend design, backend APIs,
            and database management.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About