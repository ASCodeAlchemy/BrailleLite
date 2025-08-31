package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.NGODto;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Repositories.NGORepo;
import com.example.BraillLite20.Service.JWTServices;
import com.example.BraillLite20.Service.MyUserDetailService;
import com.example.BraillLite20.Service.NGOServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NGOController {


    private NGOServices ngoServices;
    private NGORepo  ngoRepo;
    private MyUserDetailService userDetailService;
    private JWTServices jWTServices;

    @Autowired
    public NGOController(NGOServices ngoServices, NGORepo ngoRepo, MyUserDetailService userDetailService, JWTServices jWTServices) {
        this.ngoServices = ngoServices;
        this.ngoRepo = ngoRepo;
        this.userDetailService = userDetailService;
        this.jWTServices = jWTServices;
    }

    @PostMapping("/ngo/register")
    public ResponseEntity<ResponseDTO> NGOSignUp(@RequestBody NGODto ngoDto){
        return new ResponseEntity<>(ngoServices.registerNgo(ngoDto), HttpStatus.CREATED);
    }


    @PostMapping("/ngo/login")
    public ResponseEntity<ResponseDTO> NGOlogin(@RequestBody NGODto ngoDto, HttpServletResponse response){
        ResponseDTO responseDTO = ngoServices.ngoLogin(ngoDto);
        if("Login Successful".equalsIgnoreCase(responseDTO.getMessage())){
            var userDetails = userDetailService.loadUserByUsername(ngoDto.getEmail());
            String jwt = jWTServices.generateToken(userDetails);
            Cookie cookie = new Cookie("JWT", jwt);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60*60*24);
            response.addCookie(cookie);
            responseDTO.setMessage("Login Successful");
        }
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);

    }
 }
