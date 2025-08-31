package com.example.BraillLite20.Controllers;


import com.example.BraillLite20.Service.BrailleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.oauth2.client.OAuth2ClientSecurityMarker;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class BrailleController {

private BrailleService brailleService;

    @Autowired
    public BrailleController(BrailleService brailleService) {
        this.brailleService = brailleService;
    }


    @PostMapping("/convert")
public ResponseEntity<String>convertToBraille(@RequestParam("file") MultipartFile file){
      String result = brailleService.processFileToBraille(file);
     return ResponseEntity.ok(result);
}
}
