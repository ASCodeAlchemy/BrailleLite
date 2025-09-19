package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Applications;
import com.example.BraillLite20.Entity.Programs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepo extends JpaRepository<Applications, Integer> {
    Optional<Applications> findByEmailAndPrograms(String email, Programs programs);
}
