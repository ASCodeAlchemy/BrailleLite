package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.UserDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Users;
import com.example.BraillLite20.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepo userRepo,PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder=encoder;
    }

        public ResponseDTO signUp(UserDTO userDTO){
        Optional<Users> userEmail = userRepo.findByEmail(userDTO.getEmail());
        if(userEmail.isPresent()){
            throw new IllegalStateException("Email is Already Registered");

        }

        Users user =userDTOToUserMapper(userDTO);
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
        if(userEmail.isEmpty()){
            return new ResponseDTO("Invalid Email");
        }
        Users user = userEmail.get();
        if(!encoder.matches(userDTO.getPassword(),user.getPassword())){
            return new ResponseDTO("Invalid Password");
        }
        return new ResponseDTO("Login Successful");
    }


}
