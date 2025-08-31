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

    String organization_name;
    String email;
    String password;
    String address;
    String contactPerson_name;
    String contactPerson_Phone;
    Timestamp createdAt;
}
