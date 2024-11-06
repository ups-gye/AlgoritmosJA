package com.ups.algoritmosja.controller;

import com.ups.algoritmosja.model.AuthRequest;
import com.ups.algoritmosja.service.AuthService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return authService.authenticate(request);
    }
}

