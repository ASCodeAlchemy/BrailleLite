package com.example.BraillLite20.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "programs")

public class Programs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prog_id;
    private String prog_name;
    private String description;
    private String activities;
}
