package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    List<Animal> findByInstitutionId(Integer id);

    @Query(value = "select c.* from coordinate as c inner join animal as a on (a.animal_coordinate_id = c.id) where a.id = :idAnimal", nativeQuery = true)
    Coordinate searchCoordnateByIdAnimal(@Param("idAnimal") Integer idAnimal);
}
