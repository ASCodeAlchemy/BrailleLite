package com.example.BraillLite20.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "applications")
public class Applications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appl_id")
    private int applicationId;

    private String name;
    private String skills;
    private String email;

    @Column(name = "program")
    private String program;


    @ManyToOne
    @JoinColumn(name = "programs_prog_id")
    private Programs programs;

}


