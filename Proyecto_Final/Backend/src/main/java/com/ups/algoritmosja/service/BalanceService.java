package com.ups.algoritmosja.service;

import com.ups.algoritmosja.model.Cuenta;
import com.ups.algoritmosja.repository.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceService {

    @Autowired
    private CuentaRepository cuentaRepository;

    // Metodo para obtener el saldo de una cuenta por idCliente
    public Double getBalanceById(Long cuentaClienteId) {
        Optional<Cuenta> cuenta = cuentaRepository.findByCuentaClienteId(cuentaClienteId);
        return cuenta.map(Cuenta::getCuentaSaldo).orElse(null);
    }
}