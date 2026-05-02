import axios from "axios";

const USER_API ="http://localhost:8080/users"

const CAR_API = "http://localhost:8080/cars"; 

const BOOK_CAR_API = "http://localhost:8080/bookings"; 

export const createUser=(user)=> axios.post(`${USER_API}/createUser`,user);

export const existsByEmailAndPassword=(user)=>axios.post(`${USER_API}/findUser`,user);

export const getAllCars = () => axios.get(`${CAR_API}/getAllCars`);

export const createCar = (car) => axios.post(`${CAR_API}/addCar`, car);

export const updateCar = (id, car) => axios.put(`${CAR_API}/updateCar/${id}`, car);

export const deleteCar = (id) => axios.delete(`${CAR_API}/deleteCar/${id}`);

export const createBooking=(booking) => axios.post(`${BOOK_CAR_API}/createBooking`,booking);

export const getAllBookings=() => axios.get(`${BOOK_CAR_API}/getAllBookings`);

export const updateBooking=(id,status) => axios.put(`${BOOK_CAR_API}/updateStatus/${id}/${status}`,status);