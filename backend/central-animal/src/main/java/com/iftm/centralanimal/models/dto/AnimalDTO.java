package com.iftm.centralanimal.models.dto;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Coordinate;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AnimalDTO {

    private Integer id;
    private String name;
    private int type;
    private int age;
    private int sex;

    private String image;

    private String description;

    private InstitutionDTO institutionDTO;

    private Coordinate animalCoordinate = new Coordinate();

    private LocalDate inclusionDate;

    public AnimalDTO(Animal animal) {
        this.id = animal.getId();
        this.name = animal.getName();
        this.type = animal.getType();
        this.age = animal.getAge();
        this.image = animal.getImage();
        this.description = animal.getDescription();
        this.animalCoordinate = animal.getAnimalCoordinate();
        this.inclusionDate = animal.getInclusionDate();
    }
}
