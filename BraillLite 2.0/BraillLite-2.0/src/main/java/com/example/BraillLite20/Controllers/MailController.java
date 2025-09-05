package com.example.BraillLite20.Controllers;

import com.example.BraillLite20.DTOs.RequestDTO.MailDTO;
import com.example.BraillLite20.Service.MailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MailController {
    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/feedback")
    public ResponseEntity<String> sendFeedback(@Valid @RequestBody MailDTO request) {
        mailService.sendFeedback(request.getFrom(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Feedback sent successfully");
    }
}
