package com.example.BraillLite20.DTOs.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NGODto {
    private String organizationName;
    private String email;
    private String password;
    private String address;
    private String contactPersonName;
    private String contactPersonPhone;
    private Timestamp createdAt;

}
