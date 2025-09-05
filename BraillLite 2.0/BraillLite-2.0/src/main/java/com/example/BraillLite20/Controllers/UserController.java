package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.UserDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Service.JWTServices;
import com.example.BraillLite20.Service.MyUserDetailService;
import com.example.BraillLite20.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000",allowCredentials = "true")
public class UserController {

private final UserService userService;
    private final MyUserDetailService myUserDetailService;
    private final JWTServices jwtServices;



    @Autowired
    public UserController( UserService userService,MyUserDetailService myUserDetailService,JWTServices jwtServices) {
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




    }



