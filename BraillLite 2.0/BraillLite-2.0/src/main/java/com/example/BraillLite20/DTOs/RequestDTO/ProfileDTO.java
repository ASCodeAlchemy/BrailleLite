package com.example.BraillLite20.DTOs.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {

    String organization_name;
    String email;
    String address;
    String contactPerson_name;
    String contactPerson_Phone;
}
