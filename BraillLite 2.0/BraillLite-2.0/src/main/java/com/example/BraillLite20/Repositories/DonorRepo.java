package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonorRepo extends JpaRepository<Donor, Integer> {

    @Query("SELECT SUM(amount) AS total_sum FROM Donor")
    Optional<Double> getTotal();

}
