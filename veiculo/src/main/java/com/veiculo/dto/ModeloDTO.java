package com.veiculo.dto;

public class ModeloDTO {
    private Long id;
    private String nome;
    private FabricanteDTO fabricante;

    public ModeloDTO() {}

    public ModeloDTO(Long id, String nome, FabricanteDTO fabricante) {
        this.id = id;
        this.nome = nome;
        this.fabricante = fabricante;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public FabricanteDTO getFabricante() {
        return fabricante;
    }

    public void setFabricante(FabricanteDTO fabricante) {
        this.fabricante = fabricante;
    }
}
