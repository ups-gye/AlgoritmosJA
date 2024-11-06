package com.ups.algoritmosja.repository;

import com.ups.algoritmosja.model.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
}
