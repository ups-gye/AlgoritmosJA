package com.ups.algoritmosja.service;

import com.ups.algoritmosja.model.AuthRequest;
import com.ups.algoritmosja.model.Usuario;
import com.ups.algoritmosja.repository.UsuarioRepository;
import com.ups.algoritmosja.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> authenticate(AuthRequest request) {
        Usuario usuario = usuarioRepository.findByUsuarioName(request.getUsuarioName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Compara la contraseña encriptada
        if (passwordEncoder.matches(request.getUsuarioPassword(), usuario.getUsuarioPassword())) {
            // Genera el token JWT
            String token = jwtUtil.generateToken(request.getUsuarioName());
            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("usuarioId", usuario.getUsuarioId());
            userDetails.put("clienteId", usuario.getUsuarioClienteId());  // Asegúrate de tener el campo clienteId en Usuario
            userDetails.put("usuarioName", usuario.getUsuarioName());
            userDetails.put("token", token);
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
    }
}
