package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepo extends JpaRepository<Donor, Integer> {
}
