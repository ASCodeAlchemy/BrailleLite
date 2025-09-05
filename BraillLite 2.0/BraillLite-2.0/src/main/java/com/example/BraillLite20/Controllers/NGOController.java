package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.NGODto;
import com.example.BraillLite20.DTOs.RequestDTO.ProfileDTO;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.Donor;
import com.example.BraillLite20.Repositories.NGORepo;
import com.example.BraillLite20.Service.JWTServices;
import com.example.BraillLite20.Service.MyUserDetailService;
import com.example.BraillLite20.Service.NGOServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000",allowCredentials = "true")
public class NGOController {


    private final NGOServices ngoServices;
    private final MyUserDetailService userDetailService;
    private final JWTServices jWTServices;

    @Autowired
    public NGOController(NGOServices ngoServices, MyUserDetailService userDetailService, JWTServices jWTServices) {
        this.ngoServices = ngoServices;
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
            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60*60*24);
            response.addCookie(cookie);
            responseDTO.setMessage("Login Successful");
        }
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);

    }


    @PreAuthorize("hasRole('NGO')")
    @GetMapping("/ngo/myProfile")
    public  ProfileDTO getProfile(@AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            throw new IllegalArgumentException("Unauthorized");
        }

        return ngoServices.getProfile(userDetails.getUsername());

    }


        @PreAuthorize("hasRole('NGO')")
        @GetMapping("/ngo/donorDetails")
        public List<Donor> getDonor(){
            return ngoServices.getallDonors();
        }


    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/ngo/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return ngoServices.updateProfile(profileDTO,userDetails.getUsername());

    }




 }
