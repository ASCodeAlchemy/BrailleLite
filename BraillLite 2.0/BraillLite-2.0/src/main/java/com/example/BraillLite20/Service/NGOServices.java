package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.ChangePassDTO;
import com.example.BraillLite20.DTOs.RequestDTO.EndUserDTO;
import com.example.BraillLite20.DTOs.RequestDTO.NGODto;
import com.example.BraillLite20.DTOs.RequestDTO.ProfileDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Donor;
import com.example.BraillLite20.Entity.EndUser;
import com.example.BraillLite20.Entity.NGO;
import com.example.BraillLite20.Repositories.DonorRepo;
import com.example.BraillLite20.Repositories.EndUserRepo;
import com.example.BraillLite20.Repositories.NGORepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NGOServices {


    private final NGORepo ngoRepo;
    private final PasswordEncoder encoder;
    private final DonorRepo donorRepo;
    private final EndUserRepo endUserRepo;


    @Autowired
    public NGOServices(NGORepo ngoRepo,PasswordEncoder encoder,DonorRepo donorRepo,EndUserRepo endUserRepo) {
        this.ngoRepo = ngoRepo;
        this.encoder=encoder;
        this.donorRepo=donorRepo;
        this.endUserRepo=endUserRepo;
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


    public ProfileDTO getProfile(String email){
        Optional<NGO> findEmail = ngoRepo.findByEmail(email);
        if(findEmail.isEmpty()){
            throw  new IllegalArgumentException("Email not Found");
        }
        ProfileDTO proDto = new ProfileDTO();
        NGO ngos = findEmail.get();
        proDto.setOrganization_name(ngos.getOrganization_name());
        proDto.setAddress(ngos.getAddress());
        proDto.setEmail(ngos.getEmail());
        proDto.setContactPerson_name(ngos.getContactPerson_name());
        proDto.setContactPerson_Phone(ngos.getContactPerson_Phone());

        return proDto;
    }

    public List<Donor> getallDonors(){
        return donorRepo.findAll();
    }



    public ResponseEntity<?> updateProfile(ProfileDTO profileDTO, String email){
        Optional<NGO> findEmail = ngoRepo.findByEmail(email);

        if(findEmail.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EMAIL NOT FOUND");
        }

        NGO ngos = findEmail.get();

        if(profileDTO.getOrganization_name()!=null){
            ngos.setOrganization_name(profileDTO.getOrganization_name());
        }
        if(profileDTO.getAddress() != null){
            ngos.setAddress(profileDTO.getAddress());
        }
        if(profileDTO.getContactPerson_name() != null){
            ngos.setContactPerson_name(profileDTO.getContactPerson_name());
        }
        if(profileDTO.getContactPerson_Phone() != null){
            ngos.setContactPerson_Phone(profileDTO.getContactPerson_Phone());
        }

        ngoRepo.save(ngos);

        return ResponseEntity.ok("Profile Updated Successfully");
    }

    public ResponseEntity<?> changePass(ChangePassDTO passDTO,String email){
        Optional<NGO> passEmail = ngoRepo.findByEmail(email);
        if(passEmail.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NGO Not Found");

        }
        NGO ngos = passEmail.get();
        if(!encoder.matches(passDTO.getOldPass(),passDTO.getNewPass())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
        }
        ngos.setAddress(encoder.encode(passDTO.getNewPass()));
        ngoRepo.save(ngos);
        return ResponseEntity.ok("Password Changed Successfully");

    }

    public EndUser enrollUsers(EndUserDTO dto){
        Optional<EndUser> email = endUserRepo.findByEmail(dto.getEmail());
       if(email.isPresent()){
           throw new IllegalArgumentException("Email Already Exists");
       }
      EndUser user = new EndUser();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setDob(dto.getDob());
        user.setGender(dto.getGender());
        user.setDisability_no(dto.getDisability_no());
        user.setEmergencyContact(dto.getEmergencyContact());

        user.setRegisterDate(LocalDateTime.now());

        return endUserRepo.save(user);


    }

    public List<EndUser> getAllUsers(){
        return endUserRepo.findAll();
    }

}
