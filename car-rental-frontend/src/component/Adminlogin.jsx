import {Link, useNavigate} from 'react-router'
import image3 from "../image/admin-image.png";
import { useState } from 'react';

const Adminlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleAdminLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        if(email === "admin@gmail.com" && password == "1234"){
            setShowPopup(true);
                setIsSuccess(true);
                localStorage.setItem("admin", "admin");
                localStorage.setItem("role", "ADMIN");
                setEmail('');
                setPassword('');
                setLoading(false);
                setTimeout(() => {
                    navigate("/bookingRequests");
                }, 1000);
        }
        else{
            setIsSuccess(false);
                setShowPopup(true);
                setLoading(false);
                setTimeout(() => {
                    setShowPopup(false);
                }, 1500);
        }
    }
  return (
    <div className='Login'>
        {showPopup && (
                <div className={`popup ${isSuccess ? "success" : "fail"}`}>
                    {isSuccess ? "✅ Admin Login Successful!" : "❌ Admin Login Failed"}
                </div>
            )}
        <form className='login-form' onSubmit={(e)=>handleAdminLogin(e)} >
            <img src={image3} alt="Admin Login" className="auth-img3" />
            <h2 style={{textAlign:"center", color:"#38bdf8"}}>Admin Login </h2>
            <input type="email" name="admin_email_hidden" placeholder='Enter Email' required autoFocus value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="admin_password_hidden" placeholder='Enter Password' required value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit' disabled={loading}>
                    {loading ? "Logging in..." : "Submit"}
                </button>
        </form>
    </div>
  )
}

export default Adminlogin