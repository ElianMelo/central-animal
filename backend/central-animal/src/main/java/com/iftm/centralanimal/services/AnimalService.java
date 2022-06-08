package com.iftm.centralanimal.services;

import com.iftm.centralanimal.exceptionhandler.exceptions.AnimalNotFoundException;
import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    @Autowired
    private InstitutionRepository institutionRepository;

    public List<Animal> allAnimals() {
        return repository.findAll();
    }

    public List<Object> tenRandomAnimals() {
        List<Object> allAnimals = Arrays.asList(allAnimalsFromInstitutions().toArray());
        Collections.shuffle(allAnimals, new Random(System.nanoTime()));

        allAnimals = allAnimals.stream().limit(10).collect(Collectors.toList());
        return allAnimals;
    }

    public Animal newAnimal(Animal entity) {
        ImageUploader.setImage(entity, false, "");
        return repository.save(entity);
    }

    public List<Animal> animalsByIdInstitution(Integer id) {
        return repository.findByInstitutionId(id);
    }

    public Animal updateAnimalById(Integer id, Animal entity) {
        findByIdAnimal(id);
        entity.setId(id);
        if(entity.getImage() != null || entity.getImage() != "")  {
            ImageUploader.setImage(entity, true, findByIdAnimal(id).getImage());
        }
        return repository.save(entity);
    }

    public Animal findByIdAnimal(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new AnimalNotFoundException());
    }

    public void deleteAnimalById(Integer id) {
        findByIdAnimal(id);
        try {
            ImageUploader.DeleteImage(findByIdAnimal(id).getImage(), "animal");
        } catch (Exception e) {
            e.printStackTrace();
        }
        repository.deleteById(id);
    }

    private List<Animal> allAnimalsFromInstitutions() {
        return repository.findByInstitutionIdNotNull();
    }
}

