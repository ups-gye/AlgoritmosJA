package com.ups.algoritmosja.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthRequest {
    @JsonProperty("usuario_name")
    private String usuarioName;

    @JsonProperty("usuario_password")
    private String usuarioPassword;

    // Getters y setters
    public String getUsuarioName() { return usuarioName; }
    public void setUsuarioName(String usuarioName) { this.usuarioName = usuarioName; }
    public String getUsuarioPassword() { return usuarioPassword; }
    public void setUsuarioPassword(String usuarioPassword) { this.usuarioPassword = usuarioPassword; }
}
