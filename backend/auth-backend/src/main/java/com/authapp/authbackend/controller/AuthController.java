package com.authapp.authbackend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import com.authapp.authbackend.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        System.out.println("User received: " + user.getEmail());

        return ResponseEntity.ok("User received successfully");
    }
}
