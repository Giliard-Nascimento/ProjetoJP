package com.veiculo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.veiculo.Entity.Veiculo;
import com.veiculo.dto.VeiculoDTO;


public final class VeiculoMapper {
    
    private VeiculoMapper(){}

    public static VeiculoDTO toDto (Veiculo entity){
        if(entity == null) return null;
        VeiculoDTO dto = new VeiculoDTO();
        dto.setId(entity.getId());
        dto.setPlaca(entity.getPlaca());
        dto.setCor(entity.getCor());
        dto.setAno(entity.getAno());
        dto.setDescricao(entity.getDescricao());
        dto.setModelo(ModeloMapper.toDto(entity.getModelo()));
        
        return dto;
    }

    public static Veiculo toEntity (VeiculoDTO dto){
        if(dto == null) return null;

        return new Veiculo(dto.getId(), 
        dto.getPlaca(), 
        dto.getCor(), 
        dto.getAno(), 
        dto.getDescricao(), 
        ModeloMapper.toEntity(dto.getModelo()));  
    }

    public static List<VeiculoDTO> toDtoList (List<Veiculo> list){
        return list == null ?
            List.of() :
            list.stream().map(VeiculoMapper::toDto).collect(Collectors.toList());
    }

    public static List<Veiculo> toEntityList (List<VeiculoDTO> list){
        return list == null ?
            List.of() :
            list.stream().map(VeiculoMapper::toEntity).collect(Collectors.toList());
    }
}
