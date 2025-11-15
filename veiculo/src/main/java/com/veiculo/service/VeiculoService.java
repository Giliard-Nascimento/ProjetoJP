package com.veiculo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.Entity.Veiculo;
import com.veiculo.dto.VeiculoDTO;
import com.veiculo.mapper.VeiculoMapper;
import com.veiculo.repository.VeiculoRepository;

@Service
public class VeiculoService {
    
    @Autowired
    private VeiculoRepository repository;

    @Transactional
    public VeiculoDTO criar (VeiculoDTO dto){
        if(dto.getId() != null){
            throw new IllegalArgumentException("ID deve ser nulo ao criar um novo veículo.");
        }
        if(repository.existsByPlaca(dto.getPlaca())){
            throw new IllegalArgumentException("Veículo com a placa " + dto.getPlaca() + " já existe.");
        }
        Veiculo salvo = repository.save(VeiculoMapper.toEntity(dto));
        return VeiculoMapper.toDto(salvo);
    }

    @Transactional (readOnly = true)
    public List<VeiculoDTO> listar(){
        return VeiculoMapper.toDtoList(repository.findAll());
    }

    @Transactional (readOnly = true)
    public VeiculoDTO buscarPorId(Long id){
        return repository.findById(id)
                .map(VeiculoMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Veículo com ID " + id + " não encontrado."));
    }

    //@Transactional (readOnly = true)
    public VeiculoDTO atualizar (Long id, VeiculoDTO dto){
        Veiculo existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo com ID " + id + " não encontrado."));
        existente.setPlaca(dto.getPlaca());
        existente.setCor(dto.getCor());
        existente.setAno(dto.getAno());
        return VeiculoMapper.toDto(repository.save(existente));
    }

    @Transactional
    public void deletar (Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException("Veículo com ID " + id + " não encontrado.");
        }else {
            repository.deleteById(id);
        }
    }
}
