package com.veiculo.dto;

public class VeiculoDTO {
    private Long id;
    private String placa;
    private String cor;
    private Integer ano;
    private String descricao;
    private ModeloDTO modelo;

    public VeiculoDTO() {}

    public VeiculoDTO(Long id, String placa, String cor, Integer ano, String descricao, ModeloDTO modelo) {
        this.id = id;
        this.placa = placa;
        this.cor = cor;
        this.ano = ano;
        this.modelo = modelo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public ModeloDTO getModelo() {
        return modelo;
    }

    public void setModelo(ModeloDTO modelo) {
        this.modelo = modelo;
    }

    
}
