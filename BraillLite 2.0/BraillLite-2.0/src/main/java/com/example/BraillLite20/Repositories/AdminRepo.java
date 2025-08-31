package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,Integer> {

    Optional<Admin> findByUsername(String username);
    Optional<Admin> findByEmail(String email);
}
