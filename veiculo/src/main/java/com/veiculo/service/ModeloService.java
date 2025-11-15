package com.veiculo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.Entity.Modelo;
import com.veiculo.dto.ModeloDTO;
import com.veiculo.mapper.ModeloMapper;
import com.veiculo.repository.ModeloRepository;



@Service
public class ModeloService {

    @Autowired
    private ModeloRepository repository;

    @Transactional
    public ModeloDTO criar (ModeloDTO dto){
        if(dto.getId() != null) {
            throw new IllegalArgumentException("ID deve ser nulo ao criar um novo modelo.");
        }
        if(repository.existsByNome(dto.getNome())) {
            throw new IllegalArgumentException("Modelo com o nome " + dto.getNome() + " já existe.");
        }
        Modelo salvo = repository.save(ModeloMapper.toEntity(dto));
        
        return ModeloMapper.toDto(salvo);
    }

    @Transactional (readOnly = true)
    public List<ModeloDTO> listar(){
        return ModeloMapper.toDtoList(repository.findAll());
    }

    @Transactional (readOnly = true)
    public ModeloDTO buscarPorId(Long id){
        return repository.findById(id)
                .map(ModeloMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Modelo com ID " + id + " não encontrado."));
    }

    //@Transactional (readOnly = true)
    public ModeloDTO atualizar (Long id, ModeloDTO dto){
        Modelo existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modelo com ID " + id + " não encontrado."));
        existente.setNome(dto.getNome());
        return ModeloMapper.toDto(repository.save(existente));
    }

    @Transactional
    public void deletar (Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException("Modelo com ID " + id + " não encontrado.");
        }
        
        if(repository.temVeiculoAssociado(id)){
            throw new RuntimeException("Não é possível deletar o modelo com ID " + id + " pois existem veículos associados a ele.");
        }
        
        repository.deleteById(id);
    }


}
