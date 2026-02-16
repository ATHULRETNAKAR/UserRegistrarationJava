package com.authapp.authbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import com.authapp.authbackend.model.User;
import com.authapp.authbackend.repository.UserRepository;
import com.authapp.authbackend.config.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        // 🔴 1. Basic validation
        if (user.getName() == null || user.getName().isEmpty() ||
                user.getEmail() == null || user.getEmail().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty() ||
                user.getPhone() == null || user.getPhone().isEmpty()) {

            return ResponseEntity.badRequest().body(Map.of("message", "All fields are required"));
        }

        // 🔴 2. Email already exists check
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }

        // 🟢 3. Save user
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {

        var userOpt = userRepository.findByEmail(loginData.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        HashMap<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/home")
    public String home(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> user.getName())
                .orElse("Welcome Guest");
    }

}
