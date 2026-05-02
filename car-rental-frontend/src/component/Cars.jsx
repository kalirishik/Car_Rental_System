import { useEffect, useState } from "react";
import { getAllCars } from "../api/ApiService";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [carData, setCarData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCars().then((response) => {
      setCarData(response.data);
    })
  }, []);

  const filteredCars = carData.filter((car) => {
    const search = searchData.toLowerCase();

    if (!search) return true;

    return (
      car.available &&
      (
        car.name.toLowerCase().includes(search) ||
        car.brand.toLowerCase().includes(search)
      )
    );
  });

  const admin = localStorage.getItem("admin");

  return (
    <div className="cars-container">
      <h2 className="cars-title">CARS 🚗</h2>
      <input
        type="text"
        placeholder="Search by name or brand..."
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        className="search-input"
      />
      <div className="car-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="car-card" key={car.id}>
              <img src={car.imageUrl} alt={car.name} />

              <div className="car-info">
                <h3>{car.name}</h3>
                <p>🏢 {car.brand}</p>
                <p>💰 ₹{car.pricePerDay}/day</p>
                <p>⛽ {car.fuelType}</p>
                <p>👥 {car.seats} Seats</p>

                <p className={car.available ? "available" : "not-available"}>
                  {car.available ? "✅ Available" : "❌ Not Available"}
                </p>
                {!admin &&
                  <button
                    className="book-btn"
                    disabled={!car.available}
                    onClick={() => navigate(`/book/${car.id}`, { state: car })}
                  >
                    {car.available ? "Book Now" : "Unavailable"}
                  </button>
                }
              </div>
            </div>
          ))
        ) : (
          <div className="no-cars">
            {searchData ? "🔍 No matching available cars" : "🚫 No Cars Available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
