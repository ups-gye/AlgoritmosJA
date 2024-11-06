package com.ups.algoritmosja.websocket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ups.algoritmosja.model.Cuenta;
import com.ups.algoritmosja.repository.CuentaRepository;
import com.ups.algoritmosja.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.CloseStatus;

import java.io.IOException;
import java.util.Optional;

@Component
public class BalanceWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        String query = session.getUri().getQuery();
        if (query != null && query.contains("token=")) {
            String token = query.split("token=")[1];

            // Validar el token usando JwtUtil
            boolean validToken = jwtUtil.validateTokenBalance(token);
            if (!validToken) {
                session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Token inválido"));
                return;
            }
        } else {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Token faltante"));
        }
        System.out.println("Conexión WebSocket establecida con token válido.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        JsonNode jsonNode = objectMapper.readTree(payload);

        Long cuentaClienteId = jsonNode.get("cuenta_cliente_id").asLong();
        Optional<Cuenta> cuenta = cuentaRepository.findByCuentaClienteId(cuentaClienteId);

        if (cuenta.isPresent()) {
            Double saldo = cuenta.get().getCuentaSaldo().doubleValue();
            session.sendMessage(new TextMessage("Saldo actual: " + saldo));
        } else {
            session.sendMessage(new TextMessage("Error: Cuenta no encontrada."));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Conexión WebSocket cerrada.");
    }
}

