package com.ups.algoritmosja.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ups.algoritmosja.model.Cuenta;
import com.ups.algoritmosja.model.Movimiento;
import com.ups.algoritmosja.model.TransactionRequest;
import com.ups.algoritmosja.repository.CuentaRepository;
import com.ups.algoritmosja.repository.MovimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.Map;

@Service
public class TransactionService {
    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    public ResponseEntity<Map<String, Object>> realizarTransaccion(TransactionRequest request) {
        Cuenta cuentaOrigen = cuentaRepository.findById(request.getCuentaOrigen())
                .orElseThrow(() -> new RuntimeException("Cuenta origen no encontrada"));
        Cuenta cuentaDestino = cuentaRepository.findById(request.getCuentaDestino())
                .orElseThrow(() -> new RuntimeException("Cuenta destino no encontrada"));

        Double valorTransaccion = request.getValor();

        if (cuentaOrigen.getCuentaSaldo() >= valorTransaccion) {
            cuentaOrigen.setCuentaSaldo(cuentaOrigen.getCuentaSaldo() - valorTransaccion);
            cuentaDestino.setCuentaSaldo(cuentaDestino.getCuentaSaldo() + valorTransaccion);

            cuentaRepository.save(cuentaOrigen);
            cuentaRepository.save(cuentaDestino);

            Movimiento movimiento = new Movimiento();
            movimiento.setMovimientoCuentaOrigen(request.getCuentaOrigen());
            movimiento.setMovimientoCuentaDestino(request.getCuentaDestino());
            movimiento.setMovimientoValor(valorTransaccion);
            movimientoRepository.save(movimiento);

            // Crear el objeto de respuesta en JSON
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Transacción realizada exitosamente");
            response.put("saldoCuentaOrigen", cuentaOrigen.getCuentaSaldo());
            response.put("saldoCuentaDestino", cuentaDestino.getCuentaSaldo());
            response.put("transaccionId", movimiento. getMovimientoId()); // Si `Movimiento` tiene un ID generado

            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Saldo insuficiente");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}

