 package com.ups.algoritmosja.controller;

import com.ups.algoritmosja.model.TransactionRequest;
import com.ups.algoritmosja.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/transaccion")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> realizarTransaccion(@RequestBody TransactionRequest request) {
        return transactionService.realizarTransaccion(request);
    }

}