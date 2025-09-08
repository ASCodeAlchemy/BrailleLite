package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.EndUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EndUserRepo extends JpaRepository<EndUser, Integer> {
    Optional<EndUser> findByEmail(String email);
}
