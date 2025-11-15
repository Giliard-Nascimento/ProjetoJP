package com.veiculo.util;

import java.util.regex.Pattern;


public  final class ValidaVeiculo {
    
    private static final Pattern PADRAO_ANTIGO = Pattern.compile("^[A-Z]{3}[0-9]{4}$");
    private static final Pattern PADRAO_NOVO = Pattern.compile("^[A-Z]{3}[0-9][A-Z][0-9]{2}$");

    private ValidaVeiculo() {}

    /**
     * Valida se a placa esta em um dos padrões aceitos
     * Aceita letras minusculas, considerando-as maiusculas e ignora espaços no início e fim
     * @param placa texto da placa
     * @return true se a placa for no padrão, false caso contrário
     */

    public static boolean isPlacaValida (String placa){ // Valida a placa 
         if (placa == null) { // Rejeita se for nula
            return false; // Retorna falso pq é não tem placa
        }
        
    String normalizada = placa.trim().toUpperCase(); // Remove espaços e converte para maiusculas
        if (normalizada.length() == 7) { // So continua se tiver exatamente 7 caracteres
            return PADRAO_ANTIGO.matcher(normalizada).matches() || // Placa segue o modelo antigo
                PADRAO_NOVO.matcher(normalizada).matches(); // Placa segue o modelo novo
        }
        return false; // Tamanho diferente, não segue nenhuma padrão.
    }
}
