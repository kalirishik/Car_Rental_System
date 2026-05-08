import { useEffect, useState } from "react";
import { getAllBookings, updateBooking } from "../api/ApiService";

const BookingRequests = () => {

  const [bookings, setBookings] = useState([]);
  // const [statusFilter, setStatusFilter] = useState(""); // 🔥 filter state

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    getAllBookings().then(res => setBookings(res.data));
  };

  // ✅ Approve / Reject
  const handleStatus = (id, status) => {
    updateBooking(id, status)
      .then(() => loadBookings())
      .catch(err => console.log(err));
  };

  // 🔍 Apply filter
  // const filteredBookings = statusFilter
  //   ? bookings.filter(b => b.status === statusFilter)
  //   : bookings;

  const pendingBookings = bookings.filter(b => b.status === "PENDING");

  return (
    <div className="admin-booking-container">

      <h2>📋 Booking Requests</h2>

      {/* 🔍 FILTER DROPDOWN */}
      {/* <div className="filter-bar">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div> */}

      <table className="booking-table">
        <thead>
          <tr>
            <th>Car ID</th>
            <th>Car</th>
            <th>User</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* {filteredBookings.length > 0 ? (
            filteredBookings.map(b => ( */}
          {pendingBookings.length > 0 ? (
            pendingBookings.map(b => (
              <tr key={b.id}>
                <td>{b.carId}</td>
                <td>{b.carName}</td>
                <td>{b.userEmail}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                
                <td className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </td>

                <td>
                  {b.status === "PENDING" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleStatus(b.id, "APPROVED")}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => handleStatus(b.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">🚫 No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default BookingRequests;