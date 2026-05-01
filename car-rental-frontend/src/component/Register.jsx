import { Link, useNavigate } from 'react-router-dom'
import image2 from "../image/register-image.png"
import { useState } from 'react'
import { createUser } from '../api/ApiService';
const Register = () => {
    const [username, setUsername] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        const user = { username, licenseNumber, email, password };

        createUser(user).then((reponse) => {
            console.log(user);
            setShowPopup(true);
            setIsSuccess(true);
            setUsername('');
            setLicenseNumber('');
            setEmail('');
            setPassword('');
            setLoading(false);
            setTimeout(() => {
                navigate("/loginPage");
            }, 1000);
        })
            .catch(error => {
                console.log(error);
                setShowPopup(true);
                setIsSuccess(false);
                setLoading(false);
                setTimeout(() => {
                    setShowPopup(false);
                }, 1000);
            });
    }
    return (
        <div className='Register'>
            {showPopup && (
                <div className={`popup ${isSuccess ? "success" : "fail"}`}>
                    {isSuccess ? "✅ Register Successful!" : "❌ Register Failed"}
                </div>
            )}
            <form className='register-form' onSubmit={(e) => handleRegister(e)}>
                <img src={image2} alt="register" className="auth-img2" />
                <h2 style={{ textAlign: "center", color: "#38bdf8" }}>Create Account</h2>
                <input type="text" name="username" placeholder='Enter Username' required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" name="licenseNumber" placeholder='Enter License Number' required value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                <input type="email" name="email" placeholder='Enter email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' disabled={loading}>
                    {loading ? "Registering..." : "Submit"}
                </button>
                <p className="form-text">Already have an account?</p>
                <Link to="/loginPage" className="link-btn">Login To Your Account</Link>
            </form>
        </div>
    )
}

export default Register