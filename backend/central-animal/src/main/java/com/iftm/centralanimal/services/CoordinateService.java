package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Coordinate;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.CoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class CoordinateService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private AnimalService animalService;

    /**
     * Método que retorna uma lista de animais no raio de 10km.
     * @param latitudeRef latitude de referência.
     * @param longitudeRef longitude de referência.
     * @return Lista de animais no raio de 10km.
     */
    public List<Animal> animalsWithin5Km(Double latitudeRef, Double longitudeRef) {
        Double lati, longi, distance;
        LocalDate currentDate = LocalDate.now();
        List<Animal> allAnimals = animalRepository.findAll();
        List<Animal> animalsWithin5Km = new ArrayList<Animal>();

        for (Animal animal: allAnimals) {
            if(animal.getAnimalCoordinate() != null && animal.getAnimalCoordinate().getLatitude() != null && animal.getAnimalCoordinate().getLongitude() != null) {
                if(Objects.nonNull(animal.getInclusionDate()) && animal.getInclusionDate().plusWeeks(1L).isBefore(currentDate)) {
                    animalService.deleteAnimalById(animal.getId());
                } else {
                    lati = animal.getAnimalCoordinate().getLatitude();
                    longi = animal.getAnimalCoordinate().getLongitude();
                    distance = calcDistance(latitudeRef, lati, longitudeRef, longi, 0.0, 0.0);

                    if(distance <= 5) {
                        animalsWithin5Km.add(animal);
                    }
                }
            }
        }
        return animalsWithin5Km;
    }

    public Double calcDistance(Double lat1, Double lat2, Double lon1, Double lon2, Double el1, Double el2) {
        final int R = 6371; // Radio da Terra

        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lonDistance = Math.toRadians(lon2 - lon1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        Double distance = R * c; // Converte pra km

        Double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }

    public List<Coordinate> coordinates() {
        return coordinateRepository.findAll();
    }
}
