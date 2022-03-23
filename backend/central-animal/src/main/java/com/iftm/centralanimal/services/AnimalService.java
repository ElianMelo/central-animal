package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.services.exceptions.AnimalNotFoundException;
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
        entity.setId(id);
        if(entity.getAnimalImage() != null || entity.getAnimalImage() != "")  {
            String imageName = ImageUploader.ExtractImageNameFromUrl(findByIdAnimal(id).getAnimalImage(), true);
            ImageUploader.setImage(entity, true, imageName);
        }
        return repository.save(entity);
    }

    public Animal findByIdAnimal(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new AnimalNotFoundException(id));
    }

    public void deleteAnimalById(Integer id) {
        try {
            ImageUploader.DeleteImage(findByIdAnimal(id).getAnimalImage(), "animal");
        } catch (Exception e) {
            e.printStackTrace();
        }
        repository.deleteById(id);
    }
}

