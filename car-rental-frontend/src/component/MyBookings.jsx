import { useEffect, useState } from "react";
import { getAllBookings } from "../api/ApiService";

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllBookings()
      .then((res) => {
        const userBookings = res.data.filter(
          (b) => b.userEmail === user?.email
        );
        setBookings(userBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>❗ Please login first</h2>;
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="mybookings-container">

      <h2>📅 My Bookings</h2>

      {bookings.length > 0 ? (
        <table className="booking-table">

          <thead>
            <tr>
              <th>Car Name</th>
              <th>Car ID</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.carName}</td>
                <td>{b.carId}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>

                <td className={`status ${b.status.toLowerCase()}`}>
                  {b.status === "PENDING" && "⏳ Pending"}
                  {b.status === "APPROVED" && "✅ Approved"}
                  {b.status === "REJECTED" && "❌ Rejected"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <div className="no-bookings">
          🚫 No Bookings Found
        </div>
      )}

    </div>
  );
};

export default MyBookings;