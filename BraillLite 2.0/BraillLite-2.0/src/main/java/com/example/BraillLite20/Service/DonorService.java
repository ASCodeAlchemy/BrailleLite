package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.DonorDTO;
import com.example.BraillLite20.Entity.Donor;
import com.example.BraillLite20.Repositories.DonorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonorService {

    @Autowired
    private DonorRepo donorRepo;

    public Donor saveDonor( DonorDTO donorDTO) {
        Donor donor = new Donor();
        donor.setFullName(donorDTO.getFullName());
        donor.setEmail(donorDTO.getEmail());
        donor.setPhone(donorDTO.getPhone());
        donor.setAmount(donorDTO.getAmount());
        donor.setPayment_status("PENDING");
        return donorRepo.save(donor);
    }
}
