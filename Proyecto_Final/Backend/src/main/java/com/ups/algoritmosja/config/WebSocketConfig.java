package com.ups.algoritmosja.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.ups.algoritmosja.websocket.BalanceWebSocketHandler;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final BalanceWebSocketHandler balanceWebSocketHandler;

    public WebSocketConfig(BalanceWebSocketHandler balanceWebSocketHandler) {
        this.balanceWebSocketHandler = balanceWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(balanceWebSocketHandler, "/ws/balance")
                .setAllowedOrigins("*");  // Permite todos los orígenes temporalmente para probar
    }
}
