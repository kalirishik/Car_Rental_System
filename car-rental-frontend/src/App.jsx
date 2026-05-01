import './App.css'
import About from './component/About'
import Cars from './component/Cars'
import Footer from './component/Footer'
import Header from './component/Header'
import Home from './component/Home'
import {Routes, Route} from "react-router-dom"
import Login from './component/Login'
import Adminlogin from './component/Adminlogin'
import Register from './component/Register'
import Booking from './component/booking'
import ManageCars from './component/ManageCars'
function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/aboutPage" element={<About/>}/>
        <Route path="/loginPage" element={<Login/>}/>
        <Route path="/registerPage" element={<Register/>}/>
        <Route path="/adminPage" element={<Adminlogin/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/manageCars" element={<ManageCars/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
