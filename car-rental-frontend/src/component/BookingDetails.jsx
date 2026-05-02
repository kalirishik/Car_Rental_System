import { useEffect, useState } from "react";
import { getAllBookings } from "../api/ApiService";

const BookingDetails = () => {

  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // 🔍 Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllBookings().then(res => {
      setBookings(res.data);
      setFiltered(res.data);
    });
  }, []);

  // 🔍 Apply filters
  useEffect(() => {
    let data = bookings;

    // Filter by status
    if (statusFilter) {
      data = data.filter(b => b.status === statusFilter);
    }

    // Search by user or car
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(b =>
        b.userEmail.toLowerCase().includes(s) ||
        b.carName.toLowerCase().includes(s)
      );
    }

    setFiltered(data);
  }, [statusFilter, search, bookings]);

  return (
    <div className="admin-booking-container">

      <h2>📊 All Booking Details</h2>

      {/* 🔍 FILTERS */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search by user or car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

      </div>

      {/* 📋 TABLE */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Car ID</th>
            <th>Car</th>
            <th>User</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.carId}</td>
                <td>{b.carName}</td>
                <td>{b.userEmail}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>

                <td className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">🚫 No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default BookingDetails;