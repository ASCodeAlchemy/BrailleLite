package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.Entity.Donor;
import com.example.BraillLite20.Repositories.DonorRepo;
import com.example.BraillLite20.Service.StripeService;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class StripeController {

    private final StripeService stripeService;

    private final DonorRepo donorRepo;

    @Autowired
    public StripeController(StripeService stripeService, DonorRepo donorRepo) {
        this.stripeService = stripeService;
        this.donorRepo = donorRepo;
    }

    @Value("${stripe.public_key:}")
    private String stripePublicKey;


    @PostMapping("/create-checkout-session/{donorId}")
    public Map<String, Object> createCheckoutSession(@PathVariable int donorId) throws StripeException {
        Donor donor = donorRepo.findById(donorId)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Session session = stripeService.createCheckoutSession(donor);

        donor.setRazorpayOrderID(session.getId());
        donorRepo.save(donor);

        Map<String, Object> response = new HashMap<>();
        response.put("id", session.getId());
        response.put("publicKey", stripePublicKey);
        response.put("url", session.getUrl());
        return response;
    }


    @GetMapping("/success")
    public ResponseEntity<?> success(@RequestParam("session_id") String sessionId) throws StripeException {
        Session session = Session.retrieve(sessionId);
        PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent());
        String status = paymentIntent.getStatus();

        if ("succeeded".equals(status)) {
            String donorId = session.getMetadata().get("donorId");
            donorRepo.findById(Integer.parseInt(donorId)).ifPresent(d -> {
                d.setPayment_status("SUCCESS");
                donorRepo.save(d);
            });

            return ResponseEntity.ok("Donation successful , sessionId: " + sessionId);
        } else {
            return ResponseEntity.ok("Payment not successful , status: " + status);
        }
    }


    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.ok("Donation cancelled ");
    }
}
