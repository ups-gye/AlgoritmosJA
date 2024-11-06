package com.ups.algoritmosja.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.ups.algoritmosja.service.BalanceService;

@Controller
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @MessageMapping("/getBalance")  // El cliente envía aquí el ID de la cuenta
    @SendTo("/topic/balance")       // La respuesta se envía al cliente en este canal
    public double getBalance(Long idCliente) {
        return balanceService.getBalanceById(idCliente); 
    }
}
