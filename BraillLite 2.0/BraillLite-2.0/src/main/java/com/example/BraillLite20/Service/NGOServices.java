package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.NGODto;
import com.example.BraillLite20.DTOs.RequestDTO.ProfileDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Admin;
import com.example.BraillLite20.Entity.NGO;
import com.example.BraillLite20.Repositories.NGORepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class NGOServices {


    private final NGORepo ngoRepo;
    private final JWTServices jwtServices;
    private final PasswordEncoder encoder;

    @Autowired
    public NGOServices(NGORepo ngoRepo, JWTServices jwtServices,PasswordEncoder encoder) {
        this.ngoRepo = ngoRepo;
        this.jwtServices = jwtServices;
        this.encoder=encoder;
    }

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

        ngo.setPassword(encoder.encode(ngoDto.getPassword()));
        ngo.setEmail(ngoDto.getEmail());
        ngo.setAddress(ngoDto.getAddress());
        ngo.setOrganization_name(ngoDto.getOrganization_name());
        ngo.setContactPerson_name(ngoDto.getContactPerson_name());
        ngo.setContactPerson_Phone(ngoDto.getContactPerson_Phone());
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

    public ProfileDTO getProfile(String authHeader, String jwtCookie) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (jwtCookie != null) {
            token =  jwtCookie;
        }
        if(token==null){
            throw new IllegalArgumentException("Token Missing");
        }
        String email = jwtServices.extractUsername(token);
        if(email==null) {
            throw new IllegalArgumentException("Invalid Token");
        }

        Optional<NGO> ngos = ngoRepo.findByEmail(email);
        if(ngos.isEmpty()){
            throw new IllegalArgumentException("NGO Not found");
        }
        NGO ngo = ngos.get();
        ProfileDTO profileDTO = new ProfileDTO();

        profileDTO.setOrganization_name(ngo.getOrganization_name());
        profileDTO.setAddress(ngo.getAddress());
        profileDTO.setEmail(ngo.getEmail());
        profileDTO.setContactPerson_name(ngo.getContactPerson_name());
        profileDTO.setContactPerson_Phone(ngo.getContactPerson_Phone());

        return profileDTO;

    }
}
