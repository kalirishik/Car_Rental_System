import './App.css'
import About from './component/About'
import Cars from './component/Cars'
import Footer from './component/Footer'
import Header from './component/Header'
import Home from './component/Home'
import { Routes, Route } from "react-router-dom"
import Login from './component/Login'
import Adminlogin from './component/Adminlogin'
import Register from './component/Register'
import ManageCars from './component/ManageCars'
import MyBookings from './component/MyBookings'
import BookCar from './component/BookCar'
import BookingRequests from './component/BookingRequests'
import BookingDetails from './component/BookingDetails'
function App() {
  return (
    <div className='App'>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/aboutPage" element={<About />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="/registerPage" element={<Register />} />
          <Route path="/adminPage" element={<Adminlogin />} />
          <Route path="/bookingRequests" element={<BookingRequests />} />
          <Route path="/manageCars" element={<ManageCars />} />
          <Route path="/myBookings" element={<MyBookings />} />
          <Route path="/book/:id" element={<BookCar />} />
          <Route path="/bookingDetails" element={<BookingDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
