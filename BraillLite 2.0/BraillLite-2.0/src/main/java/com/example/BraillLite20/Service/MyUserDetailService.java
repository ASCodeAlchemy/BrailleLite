package com.example.BraillLite20.Service;

import com.example.BraillLite20.Repositories.NGORepo;
import com.example.BraillLite20.Repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private NGORepo ngoRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByEmail(username)
                .map(user -> (UserDetails) user)
                .orElseGet(() ->
                        ngoRepo.findByEmail(username)
                                .map(ngo -> (UserDetails) ngo)
                                .orElseThrow(() ->
                                        new UsernameNotFoundException("User not found with email: " + username))
                );
    }
}
