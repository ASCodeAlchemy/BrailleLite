package com.example.BraillLite20.Repositories;

import com.example.BraillLite20.Entity.Programs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepo extends JpaRepository<Programs,Integer> {
}
