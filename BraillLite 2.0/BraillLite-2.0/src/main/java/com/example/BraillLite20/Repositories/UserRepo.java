package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users,Integer> {

    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
}
