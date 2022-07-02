package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.models.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Integer> {

}
