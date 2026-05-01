package com.car.car_rental_backend.service;

import com.car.car_rental_backend.model.Car;
import com.car.car_rental_backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public boolean updateCar(Long id, Car car) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            Car newCar = optionalCar.get();
            newCar.setName(car.getName());
            newCar.setBrand(car.getBrand());
            newCar.setSeats(car.getSeats());
            newCar.setFuelType(car.getFuelType());
            newCar.setPricePerDay(car.getPricePerDay());
            newCar.setImageUrl(car.getImageUrl());
            newCar.setAvailable(car.isAvailable());
            carRepository.save(newCar);
            return true;
        }

        return false;
    }

    public boolean deleteCar(Long id) {
        if(carRepository.existsById(id)){
            carRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
