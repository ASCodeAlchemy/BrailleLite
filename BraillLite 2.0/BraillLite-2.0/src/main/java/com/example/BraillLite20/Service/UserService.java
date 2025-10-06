package com.example.BraillLite20.Service;

import com.example.BraillLite20.DTOs.RequestDTO.*;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Applications;
import com.example.BraillLite20.Entity.Programs;
import com.example.BraillLite20.Entity.Users;
import com.example.BraillLite20.Repositories.ApplicationRepo;
import com.example.BraillLite20.Repositories.ProgramRepo;
import com.example.BraillLite20.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final ApplicationRepo applicationRepo;
    private final ProgramRepo programRepo;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder encoder,ApplicationRepo applicationRepo,ProgramRepo programRepo) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.applicationRepo=applicationRepo;
        this.programRepo=programRepo;

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

        dto.setName(user.getName());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());

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
        if(!encoder.matches(passDTO.getOldPass(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
        }
        user.setPassword(encoder.encode(passDTO.getNewPass()));
        userRepo.save(user);
        return ResponseEntity.ok("Password Changed Successfully");

    }

    public ResponseEntity<ResponseDTO> enroll(ApplicationDTO dto, String userEmail, Long programId) {
        try {
            Optional<Users> userOptional = userRepo.findByEmail(userEmail);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseDTO("User not found"));
            }

            Optional<Programs> programOptional = programRepo.findById(programId.intValue());
            if (programOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseDTO("Program not found"));
            }

            Users user = userOptional.get();
            Programs program = programOptional.get();

            Optional<Applications> existingApplication = applicationRepo.findByEmailAndPrograms(user.getEmail(), program);
            if (existingApplication.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ResponseDTO("User is already enrolled in this program"));
            }

            Applications application = new Applications();
            application.setName(user.getName());
            application.setEmail(user.getEmail());
            application.setSkills(dto.getSkills());
            application.setPrograms(program);
            application.setProgram(program.getProg_name());

            applicationRepo.save(application);

            return ResponseEntity.ok(new ResponseDTO("Successfully enrolled in program: " + program.getProg_name()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("Error during enrollment: " + e.getMessage()));
        }
    }


    public List<Programs> getPrograms(){
        return programRepo.findAll();
    }

    public List<UserApplicationResponseDTO> getApplicationsByEmail(String email) {
        List<Applications> applications = applicationRepo.findByEmail(email);

        return applications.stream().map(app -> new UserApplicationResponseDTO(
                app.getProgram(),
                app.getStatus(),
                app.getSkills()
        )).collect(Collectors.toList());
    }




}
