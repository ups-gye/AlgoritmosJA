package com.ups.algoritmosja.model;

public class TransactionRequest {
    private Long cuentaOrigen;
    private Long cuentaDestino;
    private Double valor;

    // Getters y Setters
    public Long getCuentaOrigen() { return cuentaOrigen; }
    public void setCuentaOrigen(Long cuentaOrigen) { this.cuentaOrigen = cuentaOrigen; }
    public Long getCuentaDestino() { return cuentaDestino; }
    public void setCuentaDestino(Long cuentaDestino) { this.cuentaDestino = cuentaDestino; }
    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
}
