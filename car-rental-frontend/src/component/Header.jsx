
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = localStorage.getItem("admin");

    const userName = user ? user.email.split("@")[0] : "";
    const adminName = admin ? "Admin Rishi" : "";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    // const isCarsActive =
    //     location.pathname === "/cars" ||
    //     location.pathname.startsWith("/book");
    return (
        <div className='Header'>
            <h1>RENTWHEELS</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Home
                        </NavLink>
                    </li>

                    {role === 'USER' && (
                        <>
                            <li>
                                <NavLink to="/cars" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    Cars
                                </NavLink>
                            </li>

                            {/* <NavLink
                                to="/cars"
                                className={isCarsActive ? "active-link" : ""}
                            >
                                Cars
                            </NavLink> */}
                            <li>
                                <NavLink to="/myBookings" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    My Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/aboutPage" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <div className="user-menu">
                                    <span className="user-name">👨🏻‍💼 {userName}</span>
                                    <button onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </button>
                                </div>
                            </li>

                        </>
                    )}
                    {role === 'ADMIN' && (
                        <>
                            <li>
                                <NavLink to="/bookingRequests" className={({ isActive }) => isActive ? "active-link" : ""}>Booking Requests</NavLink>
                            </li>

                            <li>
                                <NavLink to="/bookingDetails" className={({ isActive }) => isActive ? "active-link" : ""}>Booking Details</NavLink>
                            </li>

                            <li>
                                <NavLink to="/cars" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    Cars
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/manageCars" className={({ isActive }) => isActive ? "active-link" : ""}>Manage Cars</NavLink>
                            </li>

                            <li>
                                <NavLink to="/aboutPage" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    About
                                </NavLink>
                            </li>

                            <li>
                                <div className="user-menu">
                                    <span className="user-name">👨🏻‍💼 {adminName}</span>
                                    <button onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </button>
                                </div>
                            </li>

                        </>
                    )}
                    {!role && (
                        <>
                            <li>
                                <NavLink to="/cars" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    Cars
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/aboutPage" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/adminPage" className={({ isActive }) => isActive ? "active-link" : ""}>
                                    Admin Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/loginPage"
                                    className={() =>
                                        location.pathname === "/loginPage" ||
                                            location.pathname === "/registerPage"
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;