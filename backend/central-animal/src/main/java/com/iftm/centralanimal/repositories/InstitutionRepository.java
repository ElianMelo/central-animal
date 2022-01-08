package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Integer> {
}
