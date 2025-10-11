package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.*;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Programs;
import com.example.BraillLite20.Service.JWTServices;
import com.example.BraillLite20.Service.MyUserDetailService;
import com.example.BraillLite20.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000",allowCredentials = "true")
public class UserController {

private final UserService userService;
    private final MyUserDetailService myUserDetailService;
    private final JWTServices jwtServices;



    @Autowired
    public UserController(UserService userService, MyUserDetailService myUserDetailService, JWTServices jwtServices) {
        this.userService = userService;
        this.myUserDetailService = myUserDetailService;
        this.jwtServices = jwtServices;

    }

    @PostMapping("/users/register")
    public ResponseEntity<ResponseDTO> Register(@RequestBody UserDTO userDTO) {
        String pass = userDTO.getPassword();
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");

        }
        System.out.println(pass);
        return new ResponseEntity<>(userService.signUp(userDTO), HttpStatus.CREATED);
    }


    @PostMapping("/users/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody UserDTO userDto, HttpServletResponse response){
        ResponseDTO responseDto = userService.signIn(userDto);
        if ("Login Successful".equalsIgnoreCase(responseDto.getMessage())) {
            var userDetails = myUserDetailService.loadUserByUsername(userDto.getEmail());
            String jwt = jwtServices.generateToken(userDetails);
            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 24);
            response.addCookie(cookie);
            responseDto.setMessage("Login Successful");
        }
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDTO> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
       ResponseDTO responseDto = new ResponseDTO("Logout Successful");
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/myProfile")
    public UserProfileDTO getProfile(@AuthenticationPrincipal UserDetails userDetails){
        if (userDetails == null || userDetails.getUsername()==null){
            throw new IllegalArgumentException("Unauthorized");
        }
        return userService.getProfile(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileDTO profileDTO, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()== null){
            throw new IllegalArgumentException("Unauthorized");
        }
        return userService.updateProfile(profileDTO,userDetails.getUsername());
    }


    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/changePass")
    public ResponseEntity<?> changePass(@RequestBody ChangePassDTO passDTO, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()== null){
            throw new IllegalArgumentException("Unauthorized");
        }

        return userService.changePass(passDTO,userDetails.getUsername());
    }



    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/enroll/{programId}")
    public ResponseEntity<ResponseDTO> enroll(
            @PathVariable Long programId,
            @RequestBody ApplicationDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null || userDetails.getUsername() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO("Unauthorized - Please login first"));
        }

        return userService.enroll(dto, userDetails.getUsername(), programId);
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/programs")
    public List<Programs> getPrograms(@AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername() ==null){
            throw new IllegalArgumentException("Unauthorized");
        }

        return userService.getPrograms();
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/myApplications")
    public ResponseEntity<List<UserApplicationResponseDTO>> getUserApplications(
            Authentication authentication) {

        String userEmail = authentication.getName();

        List<UserApplicationResponseDTO> applications = userService.getApplicationsByEmail(userEmail);

        return ResponseEntity.ok(applications);
    }

}
