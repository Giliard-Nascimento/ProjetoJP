package com.veiculo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.veiculo.Entity.Modelo;
import com.veiculo.dto.ModeloDTO;


public final class ModeloMapper {

    private ModeloMapper(){}

    public static ModeloDTO toDto(Modelo entity){
        if(entity == null) return null;
        ModeloDTO dto = new ModeloDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setFabricante(FabricanteMapper.toDto(entity.getFabricante()));

        return dto;
    }

    public static Modelo toEntity(ModeloDTO dto){
        if(dto == null) return null;
        
        return new Modelo(dto.getId(), dto.getNome(), FabricanteMapper.toEntity(dto.getFabricante()));
    }

    public static List<ModeloDTO> toDtoList(List<Modelo> list){
        return list == null ?
            List.of() :
            list.stream().map(ModeloMapper::toDto).collect(Collectors.toList());
    }

    public static List<Modelo> toEntityList(List<ModeloDTO> list){
        return list == null ?
            List.of() :
            list.stream().map(ModeloMapper::toEntity).collect(Collectors.toList());
    }

}
