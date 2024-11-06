package com.ups.algoritmosja.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Cliente", schema = "algoritmosjabank")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clienteId;

    private String clienteNombre;
    private String clienteApellido;
    private String clienteTipoIdentificacion;
    private String clienteIdentificacion;
    private String clienteCorreoElectronico;
    private String clienteCelular;

    // Getters y Setters

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getClienteApellido() {
        return clienteApellido;
    }

    public void setClienteApellido(String clienteApellido) {
        this.clienteApellido = clienteApellido;
    }

    public String getClienteTipoIdentificacion() {
        return clienteTipoIdentificacion;
    }

    public void setClienteTipoIdentificacion(String clienteTipoIdentificacion) {
        this.clienteTipoIdentificacion = clienteTipoIdentificacion;
    }

    public String getClienteIdentificacion() {
        return clienteIdentificacion;
    }

    public void setClienteIdentificacion(String clienteIdentificacion) {
        this.clienteIdentificacion = clienteIdentificacion;
    }

    public String getClienteCorreoElectronico() {
        return clienteCorreoElectronico;
    }

    public void setClienteCorreoElectronico(String clienteCorreoElectronico) {
        this.clienteCorreoElectronico = clienteCorreoElectronico;
    }

    public String getClienteCelular() {
        return clienteCelular;
    }

    public void setClienteCelular(String clienteCelular) {
        this.clienteCelular = clienteCelular;
    }
}
