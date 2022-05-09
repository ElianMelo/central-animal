package com.iftm.centralanimal.services;

import com.iftm.centralanimal.exceptionhandler.exceptions.AnimalNotFoundException;
import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

