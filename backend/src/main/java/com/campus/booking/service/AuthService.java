package com.campus.booking.service;

import com.campus.booking.dto.AuthRequest;
import com.campus.booking.dto.AuthResponse;
import com.campus.booking.dto.RegisterRequest;
import com.campus.booking.entity.User;
import com.campus.booking.repository.UserRepository;
import com.campus.booking.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder, 
                      JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Prevent self-registration as ADMIN or STAFF
        // Only STUDENT role is allowed for public registration
        String requestedRole = request.getRole().toUpperCase();
        if ("ADMIN".equals(requestedRole) || "STAFF".equals(requestedRole)) {
            throw new RuntimeException("Cannot self-register as ADMIN or STAFF. Only STUDENT registration is allowed.");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(User.Role.STUDENT); // Force STUDENT role for public registration
        user.setStatus(User.UserStatus.ACTIVE);
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getName(), user.getRole().name());
    }
    
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("Account is inactive");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        // Store the new session token (this will invalidate previous sessions)
        user.setActiveSessionToken(token);
        userRepository.save(user);
        
        return new AuthResponse(token, user.getEmail(), user.getName(), user.getRole().name());
    }
}
