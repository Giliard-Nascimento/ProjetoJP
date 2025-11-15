package com.veiculo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.veiculo.Entity.Modelo;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    boolean existsByNome (String nome);

    long deleteByNome(String nome);

    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM Veiculo v WHERE v.modelo.id = :modeloId")
    boolean temVeiculoAssociado(@Param("modeloId")Long modeloId);

}


