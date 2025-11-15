package com.veiculo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.Entity.Fabricante;
import com.veiculo.dto.FabricanteDTO;
import com.veiculo.mapper.FabricanteMapper;
import com.veiculo.repository.FabricanteRepository;

@Service
public class FabricanteService {
    
    @Autowired
    private FabricanteRepository repository;

    @Transactional
    public FabricanteDTO criar (FabricanteDTO dto){
        if(dto.getId() != null){
            throw new IllegalArgumentException("ID deve ser nulo ao criar um novo fabricante.");
        }
        if(repository.existsByNome(dto.getNome())){
            throw new IllegalArgumentException("Fabricante com o nome " + dto.getNome() + " já existe.");
        }
        Fabricante salvo = repository.save(FabricanteMapper.toEntity(dto));
        return FabricanteMapper.toDto(salvo);
    }

    @Transactional (readOnly = true)
    public List<FabricanteDTO> listar(){
        return FabricanteMapper.toDtoList(repository.findAll());
    }

    @Transactional (readOnly = true)
    public FabricanteDTO buscarPorId(Long id){
        return repository.findById(id)
                .map(FabricanteMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Fabricante com ID " + id + " não encontrado."));
    }

   //@Transactional (readOnly = true)
    public FabricanteDTO atualizar (Long id, FabricanteDTO dto){
        Fabricante existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fabricante com ID " + id + " não encontrado."));
        existente.setNome(dto.getNome());
        existente.setPaisOrigem(dto.getPaisOrigem());
        return FabricanteMapper.toDto(repository.save(existente));
    }

    @Transactional 
    public void deletar (Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException("Fabricante com ID " + id + " não encontrado.");
        } else {
        repository.deleteById(id);
        }
    }

}
