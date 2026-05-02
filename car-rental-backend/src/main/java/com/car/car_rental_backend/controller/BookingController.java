package com.car.car_rental_backend.controller;

import com.car.car_rental_backend.model.Booking;
import com.car.car_rental_backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/createBooking")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking saved = bookingService.saveBooking(booking);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/getAllBookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/getBookingById")
    public Booking getBookingById(@RequestParam Long id) {
        return bookingService.getBookingById(id);
    }

    @PutMapping("/updateStatus/{id}/{status}")
    public boolean updateStatus(@PathVariable Long id, @PathVariable String status) {
        return bookingService.updateStatus(id, status);
    }
}
