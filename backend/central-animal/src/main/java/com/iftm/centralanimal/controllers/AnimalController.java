package com.iftm.centralanimal.controllers;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/ten-random-animals")
    public List<Object> tenRandomAnimals() {
        return service.tenRandomAnimals();
    }

    @PostMapping
    public Animal newAnimal(@Valid @RequestBody Animal entity) {
        return service.newAnimal(entity);
    }

    @PutMapping("/{id}")
    public Animal updateAnimal(@PathVariable Integer id, @RequestBody Animal entity) {
        return service.updateAnimalById(id, entity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> findByIdAnimal(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findByIdAnimal(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteAnimalById(@PathVariable Integer id) {
        service.deleteAnimalById(id);
    }

}
