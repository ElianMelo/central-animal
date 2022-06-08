package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    public List<Animal> findByInstitutionId(Integer id);

    public List<Animal> findByInstitutionIdNotNull();
}
