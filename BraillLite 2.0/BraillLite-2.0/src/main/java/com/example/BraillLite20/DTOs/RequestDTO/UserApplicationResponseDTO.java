package com.example.BraillLite20.DTOs.RequestDTO;

import com.example.BraillLite20.Entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserApplicationResponseDTO {
    private String programName;
    private ApplicationStatus status;
    private String skills;
}
