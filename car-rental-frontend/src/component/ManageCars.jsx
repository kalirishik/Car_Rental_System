import { useEffect, useState } from "react";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar
} from "../api/ApiService";

const ManageCars = () => {

  const [cars, setCars] = useState([]);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    fuelType: "",
    seats: "",
    available: true,
    imageUrl: ""
  });

  const [editId, setEditId] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);


  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = () => {
    getAllCars().then(res => setCars(res.data));
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };


  const hidePopup = () => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      updateCar(editId, form)
        .then((res) => {
          if (res.data) {
            setIsSuccess(true);
            resetForm();
            setEditId(null);
            loadCars();
          } else {
            setIsSuccess(false);
          }
          setShowPopup(true);
          hidePopup();
        })
        .catch(() => {
          setIsSuccess(false);
          setShowPopup(true);
          hidePopup();
        });

    } else {
      createCar(form)
        .then(() => {
          setIsSuccess(true);
          resetForm();
          loadCars();
          setShowPopup(true);
          hidePopup();
        })
        .catch(() => {
          setIsSuccess(false);
          setShowPopup(true);
          hidePopup();
        });
    }
  };


  const handleEdit = (car) => {
    setForm(car);
    setEditId(car.id);
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you want to Delete this car?")) {
      deleteCar(id)
        .then((res) => {
          if (res.data) {
            setIsSuccess(true);
            loadCars();
          } else {
            setIsSuccess(false);
          }
          setShowPopup(true);
          hidePopup();
        })
        .catch(() => {
          setIsSuccess(false);
          setShowPopup(true);
          hidePopup();
        });
    }
  };


  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      pricePerDay: "",
      fuelType: "",
      seats: "",
      available: true,
      imageUrl: ""
    });
  };
  const handleCar = () => {
    resetForm();
    setEditId(null);
  }

  return (
    <div className="manage-container">

      <div className="manage-header">
        <h2>🚗 Manage Cars</h2>
        <button onClick={handleCar} className="add-car">
          + Add Car
        </button>
      </div>

      {showPopup && (
        <div className={`popup2 ${isSuccess ? "success2" : "fail2"}`}>
          {isSuccess ? "✅ Operation Successful!" : "❌ Operation Failed"}
        </div>
      )}

      <form className="car-form" onSubmit={handleSubmit}>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Car Name" required />

        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" required />

        <input type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} placeholder="Price per day" required />

        <input name="fuelType" value={form.fuelType} onChange={handleChange} placeholder="Fuel Type" required />

        <input type="number" name="seats" value={form.seats} onChange={handleChange} placeholder="Seats" required />

        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" required />

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        {form.imageUrl && (
          <img src={form.imageUrl} alt="preview" className="preview-img" />
        )}

        <button type="submit">
          {editId ? "Update Car" : "Add Car"}
        </button>

      </form>

      <table className="car-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Fuel</th>
            <th>Seats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>₹{car.pricePerDay}</td>
              <td>{car.fuelType}</td>
              <td>{car.seats}</td>

              <td className={car.available ? "available" : "not-available"}>
                {car.available ? "Available" : "Not Available"}
              </td>

              <td className="action-cell">
                <button className="edit-btn" onClick={() => handleEdit(car)}>
                  Edit
                </button>

                <button className="delete-btn" onClick={() => handleDelete(car.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageCars;