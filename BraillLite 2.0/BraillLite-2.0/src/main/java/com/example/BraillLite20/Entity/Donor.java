package com.example.BraillLite20.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "donors")
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "payment_status")
    private String payment_status;

    @Column(name = "razorpay_order_id")
    private String razorpayOrderID;

    // Constructors
    public Donor() {}

    public Donor(String fullName, String email, String phone, Double amount, String payment_status) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.amount = amount;
        this.payment_status = payment_status;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public String getRazorpayOrderID() {
        return razorpayOrderID;
    }

    public void setRazorpayOrderID(String razorpayOrderID) {
        this.razorpayOrderID = razorpayOrderID;
    }
}
