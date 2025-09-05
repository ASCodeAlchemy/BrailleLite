package com.example.BraillLite20.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String destinationEmail;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFeedback(String from, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinationEmail);
        message.setSubject(subject);
        message.setText("From: " + from + "\n\n" + body);
        message.setReplyTo(from);

        mailSender.send(message);
    }
}
