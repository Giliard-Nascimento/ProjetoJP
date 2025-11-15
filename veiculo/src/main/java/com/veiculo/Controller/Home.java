package com.veiculo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
    
@GetMapping("/") // End Point - Endereço especifico de algo. Ex = Localhost:8080/home
    public String index(){
        return "Acessar Pagina Inicial -/-";
    }

    @GetMapping("/home")
    public String home(){
        return "Bem vindo a Central de Veiculos -HOME- ";
    }

    //localhost/soma/4/7
    @GetMapping("/soma/{num1}/{num2}")
    public String soma(@PathVariable int num1, @PathVariable int num2){
        return "Voce esta mapeando SOMA de " + num1 + " + " + num2 + " = " + ( num1 + num2);
    }


}
