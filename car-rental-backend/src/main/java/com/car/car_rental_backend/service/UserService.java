package com.car.car_rental_backend.service;

import com.car.car_rental_backend.model.User;
import com.car.car_rental_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean findByEmailAndPassword(User user) {
        return userRepository.existsByEmailAndPassword(user.getEmail(), user.getPassword());
    }
}
