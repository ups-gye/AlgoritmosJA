package com.ups.algoritmosja.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cuenta", schema = "algoritmosjabank")
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cuentaId;

    private Long cuentaClienteId;
    private Double cuentaSaldo = 0.0; // Cambio a Double
    private LocalDateTime cuentaFechaCreacion = LocalDateTime.now();

    // Getters y Setters

    public Long getCuentaId() {
        return cuentaId;
    }

    public void setCuentaId(Long cuentaId) {
        this.cuentaId = cuentaId;
    }

    public Long getCuentaClienteId() {
        return cuentaClienteId;
    }

    public void setCuentaClienteId(Long cuentaClienteId) {
        this.cuentaClienteId = cuentaClienteId;
    }

    public Double getCuentaSaldo() {
        return cuentaSaldo;
    }

    public void setCuentaSaldo(Double cuentaSaldo) {
        this.cuentaSaldo = cuentaSaldo;
    }

    public LocalDateTime getCuentaFechaCreacion() {
        return cuentaFechaCreacion;
    }

    public void setCuentaFechaCreacion(LocalDateTime cuentaFechaCreacion) {
        this.cuentaFechaCreacion = cuentaFechaCreacion;
    }
}
