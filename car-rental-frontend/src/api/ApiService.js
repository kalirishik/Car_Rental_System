import axios from "axios";

const USER_API ="http://localhost:8080/users"

const CAR_API = "http://localhost:8080/cars"; 

export const createUser=(user)=> axios.post(`${USER_API}/createUser`,user);

export const existsByEmailAndPassword=(user)=>axios.post(`${USER_API}/findUser`,user);

export const getAllCars = () => axios.get(`${CAR_API}/getAllCars`);

