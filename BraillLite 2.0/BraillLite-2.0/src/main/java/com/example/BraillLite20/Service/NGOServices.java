package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.NGODto;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Admin;
import com.example.BraillLite20.Entity.NGO;
import com.example.BraillLite20.Repositories.NGORepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class NGOServices {

    @Autowired
    private NGORepo ngoRepo;

    public ResponseDTO registerNgo(NGODto ngoDto){
        Optional<NGO> NGOEmail = ngoRepo.findByEmail(ngoDto.getEmail());
        if(NGOEmail.isPresent()){
            throw new IllegalStateException("Email Already Registered");
        }

        NGO ngo = NgoDtoTONgoMapper(ngoDto);
        ngoRepo.save(ngo);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("NGO Registered Successfully");

        return responseDTO;
    }

    public NGO NgoDtoTONgoMapper(NGODto ngoDto){
        NGO ngo = new NGO();

        ngo.setPassword(ngoDto.getPassword());
        ngo.setEmail(ngoDto.getEmail());
        ngo.setAddress(ngoDto.getAddress());
        ngo.setOrganization_name(ngoDto.getOrganization_name());
        ngo.setContactPerson_name(ngoDto.getContactPerson_name());
        ngo.setContactPerson_Phone(ngo.getContactPerson_Phone());
        ngo.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return ngo;

    }

    public ResponseDTO ngoLogin(NGODto ngoDto){
        Optional<NGO> ngoEmail = ngoRepo.findByEmail(ngoDto.getEmail());
        if(ngoEmail.isEmpty()){
            return new ResponseDTO("Invalid Email");
        }

        NGO ngo = ngoEmail.get();
        if(!ngo.getPassword().equals(ngoDto.getPassword())){
            return new ResponseDTO("Invalid Password");
        }
        return new ResponseDTO("Login Successful");
    }
}
