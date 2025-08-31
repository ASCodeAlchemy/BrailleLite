package com.example.BraillLite20.DTOs.RequestDTO;

public class DonorDTO {
    private String fullName;
    private String email;
    private String phone;
    private Double amount;

    // Constructors
    public DonorDTO() {}

    public DonorDTO(String fullName, String email, String phone, Double amount) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.amount = amount;
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
