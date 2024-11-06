package com.ups.algoritmosja.model;

import javax.persistence.*;

@Entity
@Table(name = "Usuario", schema = "algoritmosjabank")
public class Usuario {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Long usuarioId;
    
    @Column(name = "usuario_cliente_id", nullable = false)
    private int usuarioClienteId;

    @Column(name = "usuario_name", nullable = false)
    private String usuarioName;

    @Column(name = "usuario_password", nullable = false)
    private String usuarioPassword;

    // Getters y Setters
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioName() {
        return usuarioName;
    }

    public void setUsuarioName(String usuarioName) {
        this.usuarioName = usuarioName;
    }

    public String getUsuarioPassword() {
        return usuarioPassword;
    }

    public void setUsuarioPassword(String usuarioPassword) {
        this.usuarioPassword = usuarioPassword;
    }

	public int getUsuarioClienteId() {
		return usuarioClienteId;
	}

	public void setUsuarioClienteId(int usuarioClienteId) {
		this.usuarioClienteId = usuarioClienteId;
	}
    
    
}
