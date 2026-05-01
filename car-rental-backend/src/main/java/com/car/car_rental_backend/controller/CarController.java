package com.car.car_rental_backend.controller;

import com.car.car_rental_backend.model.Car;
import com.car.car_rental_backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping("/addCar")
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    @GetMapping("/getAllCars")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @PutMapping("/updateCar/{id}")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @RequestBody Car car) {
        boolean updated = carService.updateCar(id, car);

        if (updated) {
            return ResponseEntity.ok("Car Updated Successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car Not Found");
    }

    @DeleteMapping("/deleteCar/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        boolean deleted = carService.deleteCar(id);

        if (deleted) {
            return ResponseEntity.ok("Car Deleted Successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car Not Found");
    }
}
