package com.iftm.centralanimal.controllers;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/animal")
public class AnimalController {

    @Autowired
    private AnimalService service;

    @GetMapping
    public List<Animal> animals() {
        return service.allAnimals();
    }

    @PostMapping
    public ResponseEntity<String> newAnimal(@Valid @RequestBody Animal entity) {
        service.newAnimal(entity);
        return ResponseEntity.ok("Animal cadastrado com sucesso.");
    }

    @PutMapping("/{id}")
    public Animal updateAnimal(@PathVariable Integer id, @RequestBody Animal entity) {
        return service.updateAnimalById(id, entity);
    }

    @GetMapping("/{id}")
    public Animal findByIdAnimal(@PathVariable Integer id) {
        return service.findByIdAnimal(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAnimalById(@PathVariable Integer id) {
        service.deleteAnimalById(id);
    }

}
