package com.campus.booking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&+\\-_=])[A-Za-z\\d@$!%*#?&+\\-_=]{8,}$",
             message = "Password must be at least 8 characters with letters, numbers and special characters (@$!%*#?&+-_=)")
    private String password;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    private String role = "STUDENT";
}
