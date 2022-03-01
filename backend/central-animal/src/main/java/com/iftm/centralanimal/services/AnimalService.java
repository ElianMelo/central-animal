package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.services.exceptions.AnimalNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public List<Animal> allAnimals() {
        return repository.findAll();
    }

    public ResponseEntity<String> newAnimal(Animal entity) {
        String fileName = UUID.randomUUID().toString();
        try {
            String url = ImageUploader.uploadFile(entity.getAnimalImage(), fileName, "animal");
            entity.setAnimalImage(url);
            repository.save(entity);
            return ResponseEntity.ok("Animal cadastrado com sucesso.");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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

