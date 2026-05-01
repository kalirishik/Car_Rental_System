import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import image1 from "../image/login-image.png";
import { existsByEmailAndPassword } from "../api/ApiService";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const user = { email, password };

        existsByEmailAndPassword(user).then((response) => {
            if (response.data == true) {
                console.log(response);
                console.log(response.data);
                setShowPopup(true);
                setIsSuccess(true);
                localStorage.setItem("user", JSON.stringify({ email }));
                localStorage.setItem("role", "USER");
                setEmail('');
                setPassword('');
                setLoading(false);
                setTimeout(() => {
                    navigate("/cars");
                }, 1000);
            }
            else {
                setIsSuccess(false);
                setShowPopup(true);
                setLoading(false);
                setTimeout(() => {
                    setShowPopup(false);
                }, 1000);
            }
        }).catch(error => {
            console.log(error);
            setShowPopup(true);
            setIsSuccess(false);
            setLoading(false);
            setTimeout(() => {
                setShowPopup(false);
            }, 1500);
        });
    }
    return (
        <div className='Login'>
            {showPopup && (
                <div className={`popup ${isSuccess ? "success" : "fail"}`}>
                    {isSuccess ? "✅ Login Successful!" : "❌ Login Failed"}
                </div>
            )}
            <form className='login-form' onSubmit={(e) => handleLogin(e)}>
                <img src={image1} alt="login" className="auth-img1" />
                <h2 style={{ textAlign: "center", color: "#38bdf8" }}>Login </h2>
                <input type="email" name="email" placeholder='Enter Email' required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' disabled={loading}>
                    {loading ? "Logging in..." : "Submit"}
                </button>

                <p className="form-text">Don't have an account?</p>
                <Link to="/registerPage" className="link-btn">Create Account</Link>
            </form>
        </div>
    )
}

export default Login