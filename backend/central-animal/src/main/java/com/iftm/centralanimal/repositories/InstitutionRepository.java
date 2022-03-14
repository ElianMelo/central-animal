package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Integer> {

    public Optional<Institution> findByAdministratorEmail(String email);
}
