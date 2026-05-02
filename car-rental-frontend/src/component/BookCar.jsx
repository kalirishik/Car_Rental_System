import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, getAllCars } from "../api/ApiService";

const BookCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [popup, setPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getAllCars().then(res => {
            const selectedCar = res.data.find(c => c.id === Number(id));
            setCar(selectedCar);
        })
            .catch(err => console.log("Error:", err));
    }, [id]);

    useEffect(() => {
        if (popup) {
            const timer = setTimeout(() => setPopup(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [popup]);

    if (!car) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    const totalDays =
        startDate && endDate
            ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
            : 0;

    const totalPrice = totalDays > 0 ? totalDays * car.pricePerDay : 0;

    const handleBooking = (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first ❗");
            navigate("/loginPage");
            return;
        }

        const today = new Date().setHours(0, 0, 0, 0);

        if (new Date(startDate) < today) {
            alert("Start date cannot be in the past ❌");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            alert("End date must be after start date ❌");
            return;
        }

        const booking = {
            userEmail: user.email,
            carId: car.id,
            carName: car.name,
            startDate,
            endDate
        };

        setLoading(true);

        createBooking(booking)
            .then(() => {
                setPopup(true);
                setIsSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    navigate("/cars");
                }, 1500);
            })
            .catch(() => {
                setPopup(true);
                setIsSuccess(false);
                setLoading(false);
            });
    };

    return (
        <div className="booking-container">

            {popup &&
                <div className={`popup ${isSuccess ? "success" : "fail"}`}>
                    {isSuccess ? "✅ Booking Requested!" : "❌ Booking Failed"}
                </div>
            }

            <div className="booking-card">
                <img src={car.imageUrl} alt={car.name} />

                <h2>{car.name}</h2>
                <p>₹{car.pricePerDay}/day</p>

                <form onSubmit={handleBooking}>
                    <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <input
                        type="date"
                        required
                        value={endDate}
                        min={startDate || new Date().toISOString().split("T")[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    {totalDays > 0 && (
                        <p className="total-price">
                            🧾 {totalDays} days × ₹{car.pricePerDay} = <b>₹{totalPrice}</b>
                        </p> 
                    )}
                    <br/>

                    <button type="submit" disabled={loading}>
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>

                    <Link to="/cars" className="back-button">
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default BookCar;