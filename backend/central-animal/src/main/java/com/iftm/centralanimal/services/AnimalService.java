package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.services.exceptions.AnimalNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    @Autowired
    private InstitutionRepository institutionRepository;

    public List<Animal> allAnimals() {
        return repository.findAll();
    }

    public Animal newAnimal(Animal entity) {
        Institution institution = institutionRepository.getById(entity.getIntitutionId());
        institution.getAnimals().add(entity);
        ImageUploader.setImage(entity);
        return repository.save(entity);
    }

    public Animal updateAnimalById(Integer id, Animal entity) {
        entity.setId(id);
        return repository.save(entity);
    }

    public Animal findByIdAnimal(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new AnimalNotFoundException(id));
    }

    public void deleteAnimalById(Integer id) {
        repository.deleteById(id);
    }
}

