package com.example.BraillLite20.DTOs.RequestDTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EndUserDTO {

    private String name;
    private String email;
    private LocalDate dob;
    private String gender;
    private double disability_no;
    private String emergencyContact;
    private LocalDateTime RegisterDate;
}
