package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.EndUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

import java.util.Optional;

public interface EndUserRepo extends JpaRepository<EndUser, Integer> {
    Optional<EndUser> findByEmail(String email);

    @Query("SELECT e FROM EndUser e WHERE lower(e.name)= lower(:keyword) ")
    List<EndUser> searchUser(@Param("keyword") String keyword);
}
