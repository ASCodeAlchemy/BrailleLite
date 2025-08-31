package com.example.BraillLite20.DTOs.RequestDTO;


import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {

    String username;
    String email;
    String password;
    String name;
    String phone;
    String address;
    Timestamp createdAt;


}
