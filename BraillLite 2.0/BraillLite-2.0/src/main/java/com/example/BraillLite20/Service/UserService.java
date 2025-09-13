package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.ChangePassDTO;
import com.example.BraillLite20.DTOs.RequestDTO.UserDTO;
import com.example.BraillLite20.DTOs.RequestDTO.UserProfileDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Users;
import com.example.BraillLite20.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;

    }

    public ResponseDTO signUp(UserDTO userDTO) {
        Optional<Users> userEmail = userRepo.findByEmail(userDTO.getEmail());
        if (userEmail.isPresent()) {
            throw new IllegalStateException("Email is Already Registered");

        }

        Users user = userDTOToUserMapper(userDTO);
        userRepo.save(user);
        ResponseDTO dto = new ResponseDTO();
        dto.setMessage("User Registered Successfully");
        return dto;

    }

    public Users userDTOToUserMapper(UserDTO userDTO) {
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        Users user = new Users();
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return user;
    }

    public ResponseDTO signIn(UserDTO userDTO) {
        Optional<Users> userEmail = userRepo.findByEmail(userDTO.getEmail());
        if (userEmail.isEmpty()) {
            return new ResponseDTO("Invalid Email");
        }
        Users user = userEmail.get();
        if (!encoder.matches(userDTO.getPassword(), user.getPassword())) {
            return new ResponseDTO("Invalid Password");
        }
        return new ResponseDTO("Login Successful");
    }

    public UserProfileDTO getProfile(String email){
        Optional<Users> findEmail = userRepo.findByEmail(email);
        if(findEmail.isEmpty()){
            throw new IllegalArgumentException("User not Found");
        }
        UserProfileDTO dto = new UserProfileDTO();
        Users user = findEmail.get();

        user.setName(dto.getName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());

        return dto;
    }

    public ResponseEntity<?> updateProfile(UserProfileDTO profileDTO, String email){
        Optional<Users> prof = userRepo.findByEmail(email);
        if(prof.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found");
        }

        Users user = prof.get();

        if(profileDTO.getUsername()!=null){
            user.setUsername(profileDTO.getUsername());
        }
        if(profileDTO.getName()!=null){
            user.setName(profileDTO.getName());
        }
        if(profileDTO.getAddress()!=null){
            user.setAddress(profileDTO.getAddress());
        }
        if(profileDTO.getPhone()!=null){
            user.setPhone(profileDTO.getPhone());
        }

      userRepo.save(user);
        return ResponseEntity.ok("Profile Updates Successfully");
    }

    public ResponseEntity<?> changePass(ChangePassDTO passDTO, String email){
        Optional<Users> passEmail = userRepo.findByEmail(email);
        if(passEmail.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Found");

        }
        Users user = passEmail.get();
        if(!encoder.matches(passDTO.getOldPass(),passDTO.getNewPass())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
        }
        user.setAddress(encoder.encode(passDTO.getNewPass()));
        userRepo.save(user);
        return ResponseEntity.ok("Password Changed Successfully");

    }


}



