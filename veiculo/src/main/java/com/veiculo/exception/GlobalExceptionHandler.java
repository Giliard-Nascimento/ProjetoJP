package com.veiculo.exception;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    private ResponseEntity<Object> body(HttpStatus status, String message) {
        Map<String, Object> map = new HashMap<>();
        map.put("timestamp", Instant.now().toString());
        map.put("status", status.value());
        map.put("error", status.getReasonPhrase());
        map.put("message", (message == null || message.isBlank()) ? defaultMessage(status) : message);
        return ResponseEntity.status(status).body(map); 
    }

    private String defaultMessage(HttpStatus status){
        return switch (status){
            case NOT_FOUND -> "Recurso nao encontrado";
            case BAD_REQUEST -> "Requisicao invalida";
            case CONFLICT -> "Erro Interno";
           default -> "Erro Interno";
        };
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntime(RuntimeException ex){
        String msg = ex.getMessage();
        if(msg != null){
            String lower = msg.toLowerCase();
            if(lower.contains("nao encontrado")){
                return body(HttpStatus.NOT_FOUND, msg);
            }
            if(lower.contains("veículos associados")||
               lower.contains("não e possivel excluir")||
               lower.contains("existem veículos")){
                return body(HttpStatus.CONFLICT, msg);
            }
        }
        return body(HttpStatus.INTERNAL_SERVER_ERROR, msg);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException ex){
        String msg = ex.getMessage();
        String lower = msg == null ? "" : msg.toLowerCase();
        if(lower.contains("Ja Existe")){
            return body(HttpStatus.CONFLICT, msg);
        }
        return body(HttpStatus.BAD_REQUEST, msg);
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrity(DataIntegrityViolationException ex){
        return body(HttpStatus.CONFLICT, "Violacao de Integridade");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(MethodArgumentNotValidException ex){
        return body(HttpStatus.BAD_REQUEST, "Dados Invalidos");
    }

    @ExceptionHandler(PropertyReferenceException.class)
    public ResponseEntity<Object> handlePropertyReference(PropertyReferenceException ex){
        return body(HttpStatus.BAD_REQUEST, "Referencia de propriedade invalida: " + ex.getPropertyName());
    }



}
