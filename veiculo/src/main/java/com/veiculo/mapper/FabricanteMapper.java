package com.veiculo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.veiculo.Entity.Fabricante;
import com.veiculo.dto.FabricanteDTO;


public final class FabricanteMapper {
    
    private FabricanteMapper(){}

    public static FabricanteDTO toDto(Fabricante entity){
        if(entity == null) return null;
        FabricanteDTO dto = new FabricanteDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setPaisOrigem(entity.getPaisOrigem());

        return dto;
    }

    public static Fabricante toEntity(FabricanteDTO dto){
        if(dto == null) return null;
        
        return new Fabricante(dto.getId(), dto.getNome(), dto.getPaisOrigem());
    }

    public static List<FabricanteDTO> toDtoList(List<Fabricante> list){
        return list == null ?
            List.of() :
            list.stream().map(FabricanteMapper::toDto).collect(Collectors.toList());
    }

    public static List<Fabricante> toEntityList(List<FabricanteDTO> list){
        return list == null ?
            List.of() :
            list.stream().map(FabricanteMapper::toEntity).collect(Collectors.toList());
    }

}
