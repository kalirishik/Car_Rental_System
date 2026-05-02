package com.car.car_rental_backend.service;

import com.car.car_rental_backend.model.Booking;
import com.car.car_rental_backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    public Booking saveBooking(Booking booking) {

        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                booking.getCarId(),
                booking.getStartDate(),
                booking.getEndDate()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Car not available for selected dates");
        }

        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public boolean updateStatus(Long id, String status) {
        Optional<Booking> op = bookingRepository.findById(id);
        if (op.isPresent()) {
            Booking booking = op.get();
            booking.setStatus(status);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    public Booking getBookingById(Long id) {
        Booking findBooking = bookingRepository.findById(id).get();
        if(findBooking != null) {
            return findBooking;
        }
        return null;
    }
}
