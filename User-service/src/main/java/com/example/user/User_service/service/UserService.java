package com.example.user.User_service.service;

import com.example.user.User_service.entity.User;
import com.example.user.User_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Static admin credentials
    private static final String ADMIN_EMAIL = "admin@village.com";
    private static final String ADMIN_PASSWORD = "admin123"; // For demo only; hash in production

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password, String userType) {
        if ("admin".equals(userType)) {
            // Check static admin credentials
            if (ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password)) {
                User admin = new User();
                admin.setId(0L);
                admin.setFirstName("Admin");
                admin.setLastName("");
                admin.setEmail(ADMIN_EMAIL);
                admin.setPhone("");
                admin.setPassword("");
                return Optional.of(admin);
            } else {
                return Optional.empty();
            }
        } else {
            // Regular user login
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (passwordEncoder.matches(password, user.getPassword())) {
                    return Optional.of(user);
                }
            }
            return Optional.empty();
        }
    }
} 