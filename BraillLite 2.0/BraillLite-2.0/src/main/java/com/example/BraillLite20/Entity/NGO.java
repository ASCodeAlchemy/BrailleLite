package com.example.BraillLite20.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "ngo")
public class NGO implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ngoId;
    String organization_name;
    String email;
    String password;
    String address;
    String contactPerson_name;
    String contactPerson_Phone;
    Timestamp createdAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_NGO"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
