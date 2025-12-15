package com.lamlib.learning.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

public class SecurityConfig {
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.build();
    }
}
