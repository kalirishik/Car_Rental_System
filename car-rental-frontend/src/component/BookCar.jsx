// const handleBooking = (e) => {
//     e.preventDefault();

//     if (!user) {
//         alert("Please login first ❗");
//         navigate("/loginPage");
//         return;
//     }

//     if (!startDate || !endDate) {
//         alert("Select dates ❗");
//         return;
//     }

//     const today = new Date().setHours(0, 0, 0, 0);

//     if (new Date(startDate) < today) {
//         alert("Start date cannot be in the past ❌");
//         return;
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//         alert("End date must be after start date ❌");
//         return;
//     }

//     if (totalPrice <= 0) {
//         alert("Invalid booking ❗");
//         return;
//     }

//     const options = {
//         key: "rzp_test_SmXoILzvlQBIsq",
//         amount: totalPrice * 100,
//         currency: "INR",
//         name: "RentWheels",
//         description: "Demo Payment",

//         // ✅ If Razorpay SUCCESS
//         handler: function (response) {

//             console.log("Payment Success");

//             setIsSuccess(true);
//             setPopup(true);

//             saveBooking("SUCCESS", response.razorpay_payment_id);

//         }
//     };

//     const rzp = new window.Razorpay(options);

//     // 🔥 FORCE SUCCESS even if payment fails
//     rzp.on("payment.failed", function () {

//         console.log("Dummy Mode → Force Success");

//         setIsSuccess(true);
//         setPopup(true);

//         saveBooking("SUCCESS", "DUMMY_PAYMENT_ID");

//     });

//     rzp.open();
// };


// const saveBooking = (status, paymentId) => {

//     const booking = {
//         userEmail: user.email,
//         carId: car.id,
//         carName: car.name,
//         startDate,
//         endDate,
//         paymentId,
//         paymentStatus: status
//     };

//     setLoading(true);

//     createBooking(booking)
//         .then(() => {
//             setLoading(false);

//             setTimeout(() => {
//                 navigate("/cars"); // ✅ cars navbar active
//             }, 1200);
//         })
//         .catch(() => {
//             setIsSuccess(false);
//             setPopup(true);
//             setLoading(false);
//         });
// };


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
            const timer = setTimeout(() => setPopup(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [popup]);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setStartDate(today);
        setEndDate(today);
    }, []);

    if (!car) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    const totalDays =
        startDate && endDate
            ? Math.floor(
                (new Date(endDate).setHours(0, 0, 0, 0) -
                    new Date(startDate).setHours(0, 0, 0, 0)) /
                (1000 * 60 * 60 * 24)
            ) + 1
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

        if (!startDate || !endDate) {
            alert("Select both dates ❗");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            alert("End date must be same or after start date ❌");
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
                    {isSuccess ? "✅ Booking Requested Successfully!" : "❌ Booking Failed"}
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

                    <p className="total-price">
                        🧾 {totalDays} {totalDays === 1 ? "day" : "days"} × ₹{car.pricePerDay} = <b>₹{totalPrice}</b>
                    </p>
                    <br />

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