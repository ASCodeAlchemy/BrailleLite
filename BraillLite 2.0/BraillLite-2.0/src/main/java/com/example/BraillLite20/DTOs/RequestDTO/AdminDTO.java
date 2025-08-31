package com.example.BraillLite20.DTOs.RequestDTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {

    String username;
    String email;
    String password;
    String fullName;
}
