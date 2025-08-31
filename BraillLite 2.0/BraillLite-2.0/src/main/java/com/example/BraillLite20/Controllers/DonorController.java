package com.example.BraillLite20.Controllers;


import com.example.BraillLite20.DTOs.RequestDTO.DonorDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Donor;
import com.example.BraillLite20.Service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DonorController {

    private final DonorService donorService;

    @Autowired
    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @PostMapping("/donor/save")
    public ResponseEntity<Donor> donate(@RequestBody DonorDTO donorDTO){
        return new ResponseEntity<>(donorService.saveDonor(donorDTO), HttpStatus.OK);
    }

}
