package com.car.car_rental_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "brand")
    private String brand;

    @Column(name = "price_per_day")
    private double pricePerDay;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "seats")
    private int seats;

    @Column(name = "available")
    private boolean available;

    @Column(name = "image_url")
    private String imageUrl;
}
