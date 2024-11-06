package com.ups.algoritmosja.repository;

import com.ups.algoritmosja.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsuarioName(String usuarioName);
}
