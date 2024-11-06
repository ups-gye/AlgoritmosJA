package com.ups.algoritmosja.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Movimiento", schema = "algoritmosjabank")
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movimientoId;

    private Long movimientoCuentaOrigen;
    private Long movimientoCuentaDestino;
    private Double movimientoValor;
    private LocalDateTime movimientoFecha = LocalDateTime.now();

    // Getters y Setters

    public Long getMovimientoId() {
        return movimientoId;
    }

    public void setMovimientoId(Long movimientoId) {
        this.movimientoId = movimientoId;
    }

    public Long getMovimientoCuentaOrigen() {
        return movimientoCuentaOrigen;
    }

    public void setMovimientoCuentaOrigen(Long movimientoCuentaOrigen) {
        this.movimientoCuentaOrigen = movimientoCuentaOrigen;
    }

    public Long getMovimientoCuentaDestino() {
        return movimientoCuentaDestino;
    }

    public void setMovimientoCuentaDestino(Long movimientoCuentaDestino) {
        this.movimientoCuentaDestino = movimientoCuentaDestino;
    }

    public Double getMovimientoValor() {
        return movimientoValor;
    }

    public void setMovimientoValor(Double movimientoValor) {  
        this.movimientoValor = movimientoValor;
    }

    public LocalDateTime getMovimientoFecha() {
        return movimientoFecha;
    }

    public void setMovimientoFecha(LocalDateTime movimientoFecha) {
        this.movimientoFecha = movimientoFecha;
    }
}
