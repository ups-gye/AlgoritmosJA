package com.ups.algoritmosja.repository;

import com.ups.algoritmosja.model.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
    Optional<Cuenta> findByCuentaClienteId(Long cuentaClienteId);
}