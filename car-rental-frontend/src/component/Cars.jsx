import { useEffect, useState } from "react";
import { getAllCars } from "../api/ApiService";

const Cars = () => {
  const [carData, setCarData] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    getAllCars().then((response) => {
      setCarData(response.data);
    })
  }, []);

  const filteredCars = carData.filter((car) =>
    car.available &&
    (
      car.name.toLowerCase().includes(searchData.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchData.toLowerCase())
    )
  );

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

                <p className="available">✅ Available</p>

                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-cars">
            🚫 No Cars Available
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
