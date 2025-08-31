package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.NGO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NGORepo extends JpaRepository<NGO,Integer> {

   Optional<NGO> findByEmail(String email);
}
