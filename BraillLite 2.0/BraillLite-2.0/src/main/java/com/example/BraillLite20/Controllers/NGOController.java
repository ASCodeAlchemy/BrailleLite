package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.*;
import com.example.BraillLite20.DTOs.ResponseDTO.ResponseDTO;
import com.example.BraillLite20.Entity.*;
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
@RequestMapping("/api/ngo")
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

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> NGOSignUp(@RequestBody NGODto ngoDto){
        return new ResponseEntity<>(ngoServices.registerNgo(ngoDto), HttpStatus.CREATED);
    }


    @PostMapping("/login")
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
    @GetMapping("/myProfile")
    public  ProfileDTO getProfile(@AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            throw new IllegalArgumentException("Unauthorized");
        }

        return ngoServices.getProfile(userDetails.getUsername());

    }


        @PreAuthorize("hasRole('NGO')")
        @GetMapping("/donorDetails")
        public List<Donor> getDonor(){
            return ngoServices.getallDonors();
        }


    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return ngoServices.updateProfile(profileDTO,userDetails.getUsername());

    }

    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/changePass")
    public ResponseEntity<?> changePass(@RequestBody ChangePassDTO passDTO, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return ngoServices.changePass(passDTO,userDetails.getUsername());
    }

    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/enroll")
   public ResponseEntity<EndUser> enroll(@RequestBody EndUserDTO dto){
        EndUser saveUser = ngoServices.enrollUsers(dto);
        return new ResponseEntity<>(saveUser,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('NGO')")
    @GetMapping("/allUsers")
    public List<EndUser> getUsers(){
        return ngoServices.getAllUsers();
    }


    @PreAuthorize("hasRole('NGO')")
    @GetMapping("/search/{key}")
    public ResponseEntity<List<EndUser>> searchUser(@PathVariable("key") String keyword){
        List<EndUser> search = ngoServices.searchUser(keyword);
        return new ResponseEntity<>(search,HttpStatus.OK);
    }



    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/addPrograms")
    public ResponseEntity<?> addPrograms(@RequestBody ProgramDTO dto, @AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return ngoServices.addPrograms(dto,userDetails.getUsername());
    }


    @PreAuthorize("hasRole('NGO')")
    @GetMapping("/getPrograms")
    public List<Programs> getPrograms(){
        return ngoServices.getAllProgs();
    }

    @PreAuthorize("hasRole('NGO')")
    @GetMapping("/getApplications")
    public List<Applications> getApplications(@AuthenticationPrincipal UserDetails userDetails){
        if(userDetails==null || userDetails.getUsername()==null){
            throw new IllegalArgumentException("Unauthorized");
        }
        return ngoServices.getAllApplications();
    }

    @PreAuthorize("hasRole('NGO')")
    @PostMapping("/{id}/accept")
    public ResponseEntity<String> acceptApplication(@PathVariable int id) {
        ngoServices.updateStatus(id, ApplicationStatus.ACCEPTED);
        return ResponseEntity.ok("Application accepted");
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<String> rejectApplication(@PathVariable int id) {
        ngoServices.updateStatus(id, ApplicationStatus.REJECTED);
        return ResponseEntity.ok("Application rejected");
    }


    @GetMapping("/total")
    public ResponseEntity<Double> getSum(){
        return new ResponseEntity<>(ngoServices.getTotal(),HttpStatus.OK);
    }




 }
