package com.ups.algoritmosja.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CustomCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // Permitir el origen de tu frontend
        config.addAllowedHeader("*"); // Permitir todas las cabeceras
        config.addAllowedMethod("*"); // Permitir todos los métodos (POST, GET, etc.)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Aplicar la configuración a todas las rutas
        return new CorsFilter(source);
    }
}