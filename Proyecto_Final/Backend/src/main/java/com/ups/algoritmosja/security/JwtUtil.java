package com.ups.algoritmosja.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    // Genera un token JWT para un usuario específico
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // token válido por 10 horas
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    // Extrae el nombre de usuario del token JWT
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extrae cualquier claim específico del token JWT
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    // Valida si el token ha expirado
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Valida el token verificando el nombre de usuario y que no haya expirado
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public Boolean validateTokenBalance(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true; // Token es válido
        } catch (Exception e) {
            return false; // Token no es válido
        }
    }

}
